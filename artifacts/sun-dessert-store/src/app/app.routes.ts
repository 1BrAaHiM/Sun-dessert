import { Routes } from "@angular/router";
import { StorePageComponent } from "./store-page.component";

export const appRoutes: Routes = [
  { path: "", component: StorePageComponent, data: { page: "home" } },
  { path: "about", component: StorePageComponent, data: { page: "about" } },
  { path: "products", component: StorePageComponent, data: { page: "products" } },
  { path: "products/:id", component: StorePageComponent, data: { page: "detail" } },
  { path: "category/:category", component: StorePageComponent, data: { page: "category" } },
  { path: "order", component: StorePageComponent, data: { page: "order" } },
  { path: "admin", component: StorePageComponent, data: { page: "admin" } },
  { path: "**", redirectTo: "" },
];