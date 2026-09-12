import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { Product, ProductInput } from "./product.model";
import { ProductService } from "./product.service";
import { HeroCarousal } from "./hero-slider.component";

type Page = "home" | "about" | "products" | "category" | "detail" | "order" | "admin";

interface ProductForm {
  name: string;
  slug: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
  tags: string;
  featured: boolean;
  available: boolean;
}

@Component({
  selector: "app-store-page",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink,HeroCarousal],
  templateUrl: "./store-page.component.html",
  styleUrl: "./store-page.component.css",
})
export class StorePageComponent implements OnInit {
  page: Page = "home";
  categorySlug = "";
  searchTerm = "";
  products: Product[] = [];
  selectedProduct: Product | null = null;
  loading = false;
  detailLoading = false;
  errorMessage = "";
  adminMessage = "";
  formError = "";
  saving = false;
  formOpen = false;
  editingId: number | null = null;
  quantity = 1;
  form: ProductForm = this.emptyForm();

  readonly orderNumber = "201129939015";
  readonly categories = [
    { name: "Cakes", slug: "cakes", note: "Made for the big moments", color: "sun" },
    { name: "Brownies", slug: "brownies", note: "Warm, rich, and fudgy", color: "coral" },
    { name: "Cookies", slug: "cookies", note: "Golden little comforts", color: "sage" },
    { name: "Dessert Boxes", slug: "dessert-boxes", note: "Ready to share or gift", color: "lavender" },
    { name: "Ice Coffee", slug: "Ice Coffee", note: "tasty and refreshing", color:"sun"},
  ];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly productService: ProductService,
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(() => this.syncRoute());
    this.route.paramMap.subscribe(() => this.syncRoute());
  }

  get pageTitle(): string {
    if (this.page === "category") return this.categoryName;
    if (this.page === "products") return "Pick your pleasure.";
    return "The full counter";
  }

  get categoryName(): string {
    const found = this.categories.find((category) => category.slug === this.categorySlug);
    return found?.name ?? this.categorySlug.replace("-", " ");
  }

  get categoryNote(): string {
    return this.categories.find((category) => category.slug === this.categorySlug)?.note ??
      "Small-batch desserts made fresh for you";
  }

  get featuredCount(): number {
    return this.products.filter((product) => product.featured).length;
  }

  get visibleProducts(): Product[] {
    const query = this.searchTerm.trim().toLowerCase();
    return this.products.filter((product) =>
      !query ||
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.tags.some((tag) => tag.toLowerCase().includes(query)),
    );
  }

  get featuredProducts(): Product[] {
    return this.products.filter((product) => product.featured && product.available).slice(0, 4);
  }

  get availableProducts(): Product[] {
    return this.products.filter((product) => product.available);
  }

  get categoryCards(): Array<{ name: string; slug: string; count: number; imageUrl: string }> {
    return this.categories.map((category) => {
      const items = this.availableProducts.filter((product) => product.category === category.slug);
      return {
        name: category.name,
        slug: category.slug,
        count: items.length,
        imageUrl: items[0]?.imageUrl ?? "/assets/brownies.jpg",
      };
    });
  }
  
  private syncRoute(): void {
    this.page = (this.route.snapshot.data["page"] as Page | undefined) ?? "home";
    this.categorySlug = this.route.snapshot.paramMap.get("category") ?? "";
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.errorMessage = "";
    this.adminMessage = "";

    if (this.page === "detail" && Number.isFinite(id) && id > 0) {
      this.loadProduct(id);
      return;
    }

    if (this.page === "home" || this.page === "products" || this.page === "category" || this.page === "admin") {
      this.loadProducts(this.page === "category" ? this.categorySlug : undefined, this.page === "admin");
    }
  }

  private loadProducts(category?: string, includeUnavailable = false): void {
    this.loading = true;
    this.productService.list(category, includeUnavailable).subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = "We could not load the counter right now.";
        this.loading = false;
      },
    });
  }

  private loadProduct(id: number): void {
    this.detailLoading = true;
    this.selectedProduct = null;
    this.productService.get(id).subscribe({
      next: (product) => {
        this.selectedProduct = product;
        this.detailLoading = false;
      },
      error: () => {
        this.errorMessage = "This dessert could not be found.";
        this.detailLoading = false;
      },
    });
  }

  selectCategory(slug: string): void {
    this.router.navigate(["/category", slug]);
  }

  openProduct(product: Product): void {
    this.router.navigate(["/products", product.id]);
  }

  orderUrl(product: Product, quantity = 1): string {
    const message = `Hello Sun Dessert, I would like to order ${quantity} x ${product.name}.`;
    return `https://wa.me/${this.orderNumber}?text=${encodeURIComponent(message)}`;
  }

  startOrder(product: Product): void {
    window.open(this.orderUrl(product, this.quantity), "_blank", "noopener,noreferrer");
  }

  increaseQuantity(): void {
    this.quantity = Math.min(20, this.quantity + 1);
  }

  decreaseQuantity(): void {
    this.quantity = Math.max(1, this.quantity - 1);
  }

  trackById(_index: number, product: Product): number {
    return product.id;
  }

  onImageError(event: Event): void {
    const image = event.target as HTMLImageElement;
    if (!image.src.endsWith("/assets/brownies.jpg")) image.src = "/assets/brownies.jpg";
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  openAddForm(): void {
    this.editingId = null;
    this.form = this.emptyForm();
    this.formError = "";
    this.formOpen = true;
  }

  openEditForm(product: Product): void {
    this.editingId = product.id;
    this.form = {
      name: product.name,
      slug: product.slug,
      category: product.category,
      price: product.price,
      description: product.description,
      imageUrl: product.imageUrl,
      tags: product.tags.join(", "),
      featured: product.featured,
      available: product.available,
    };
    this.formError = "";
    this.formOpen = true;
  }

  closeForm(): void {
    this.formOpen = false;
    this.formError = "";
  }

  saveProduct(): void {
    if (!this.form.name.trim() || !this.form.category.trim() || !this.form.description.trim() || !this.form.imageUrl.trim() || this.form.price < 0) {
      this.formError = "Please complete the name, category, price, description, and image.";
      return;
    }

    const input: ProductInput = {
      name: this.form.name.trim(),
      slug: (this.form.slug.trim() || this.slugify(this.form.name)).toLowerCase(),
      category: this.form.category.trim().toLowerCase(),
      price: Number(this.form.price),
      description: this.form.description.trim(),
      imageUrl: this.form.imageUrl.trim(),
      tags: this.form.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      featured: this.form.featured,
      available: this.form.available,
    };

    this.saving = true;
    const request = this.editingId === null
      ? this.productService.create(input)
      : this.productService.update(this.editingId, input);

    request.subscribe({
      next: () => {
        this.saving = false;
        this.formOpen = false;
        this.adminMessage = this.editingId === null ? "Product added to the counter." : "Product updated.";
        this.loadProducts(undefined, true);
      },
      error: () => {
        this.saving = false;
        this.formError = "We could not save this product. Please try again.";
      },
    });
  }

  removeProduct(product: Product): void {
    if (!window.confirm(`Remove ${product.name} from the counter?`)) return;
    this.productService.remove(product.id).subscribe({
      next: () => {
        this.adminMessage = `${product.name} was removed.`;
        this.loadProducts(undefined, true);
      },
      error: () => {
        this.adminMessage = "We could not remove that product.";
      },
    });
  }

  toggleAvailability(product: Product): void {
    this.productService.update(product.id, { available: !product.available }).subscribe(() => {
      this.adminMessage = product.available ? `${product.name} is hidden.` : `${product.name} is visible.`;
      this.loadProducts(undefined, true);
    });
  }

  toggleFeatured(product: Product): void {
    this.productService.update(product.id, { featured: !product.featured }).subscribe(() => {
      this.adminMessage = product.featured ? `${product.name} removed from featured.` : `${product.name} added to featured.`;
      this.loadProducts(undefined, true);
    });
  }

  private emptyForm(): ProductForm {
    return {
      name: "",
      slug: "",
      category: "brownies",
      price: 0,
      description: "",
      imageUrl: "/assets/classic%20brownie.png",
      tags: "",
      featured: false,
      available: true,
    };
  }

  private slugify(value: string): string {
    return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }
}