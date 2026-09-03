import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError, map, of, tap } from "rxjs";
import { FALLBACK_PRODUCTS, Product, ProductInput } from "./product.model";

interface WindowWithSunConfig extends Window {
  __SUN_DESSERT_API_URL__?: string;
}

@Injectable({ providedIn: "root" })
export class ProductService {
  private readonly apiBaseUrl =
    (window as WindowWithSunConfig).__SUN_DESSERT_API_URL__ ?? "/api";
  private readonly storageKey = "sun-dessert-products";
  private readonly productsSubject = new BehaviorSubject<Product[]>(
    this.readLocalProducts(),
  );

  readonly products$ = this.productsSubject.asObservable();

  constructor(private readonly http: HttpClient) {
    this.refresh().subscribe();
  }

  list(category?: string, includeUnavailable = false): Observable<Product[]> {
    let params = new HttpParams();
    if (category && category !== "all") {
      params = params.set("category", category);
    }

    const localProducts = this.filterLocal(category, includeUnavailable);
    return this.http
      .get<Product[]>(`${this.apiBaseUrl}/products`, { params })
      .pipe(
        tap((products) => this.storeProducts(products)),
        catchError(() => of(localProducts)),
      );
  }

  refresh(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiBaseUrl}/products`).pipe(
      tap((products) => this.storeProducts(products)),
      catchError(() => of(this.productsSubject.value)),
    );
  }

  get(id: number): Observable<Product | null> {
    const localProduct =
      this.productsSubject.value.find((product) => product.id === id) ?? null;
    return this.http
      .get<Product>(`${this.apiBaseUrl}/products/${id}`)
      .pipe(catchError(() => of(localProduct)));
  }

  create(input: ProductInput): Observable<Product> {
    return this.http.post<Product>(`${this.apiBaseUrl}/products`, input).pipe(
      tap((product) => this.storeProducts([...this.productsSubject.value, product])),
      catchError(() => of(this.createLocally(input))),
    );
  }

  update(id: number, input: Partial<ProductInput>): Observable<Product> {
    return this.http
      .patch<Product>(`${this.apiBaseUrl}/products/${id}`, input)
      .pipe(
        tap((product) =>
          this.storeProducts(
            this.productsSubject.value.map((item) =>
              item.id === id ? product : item,
            ),
          ),
        ),
        catchError(() => of(this.updateLocally(id, input))),
      );
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/products/${id}`).pipe(
      tap(() =>
        this.storeProducts(
          this.productsSubject.value.filter((product) => product.id !== id),
        ),
      ),
      catchError(() => {
        this.storeProducts(
          this.productsSubject.value.filter((product) => product.id !== id),
        );
        return of(void 0);
      }),
    );
  }

  private filterLocal(category?: string, includeUnavailable = false): Product[] {
    return this.productsSubject.value.filter(
      (product) =>
        (includeUnavailable || product.available) &&
        (!category || category === "all" || product.category === category),
    );
  }

  private readLocalProducts(): Product[] {
    try {
      const saved = localStorage.getItem(this.storageKey);
      return saved ? (JSON.parse(saved) as Product[]) : FALLBACK_PRODUCTS;
    } catch {
      return FALLBACK_PRODUCTS;
    }
  }

  private storeProducts(products: Product[]): void {
    this.productsSubject.next(products);
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(products));
    } catch {
      // The API remains the source of truth when browser storage is unavailable.
    }
  }

  private createLocally(input: ProductInput): Product {
    const product: Product = {
      ...input,
      id: Math.max(0, ...this.productsSubject.value.map((item) => item.id)) + 1,
      createdAt: new Date().toISOString(),
      tags: input.tags ?? [],
      featured: input.featured ?? false,
      available: input.available ?? true,
    };
    this.storeProducts([...this.productsSubject.value, product]);
    return product;
  }

  private updateLocally(id: number, input: Partial<ProductInput>): Product {
    const current = this.productsSubject.value.find((product) => product.id === id);
    const updated = { ...current, ...input } as Product;
    this.storeProducts(
      this.productsSubject.value.map((product) =>
        product.id === id ? updated : product,
      ),
    );
    return updated;
  }
}