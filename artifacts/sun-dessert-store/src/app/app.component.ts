import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  menuOpen = false;
  readonly currentYear = new Date().getFullYear();
  categories = [
    { name: "Cakes", slug: "cakes", note: "Made for the big moments" },
    { name: "Brownies", slug: "brownies", note: "Warm, rich, and fudgy" },
    { name: "Cookies", slug: "cookies", note: "Golden little comforts" },
    { name: "Dessert Boxes", slug: "dessert-boxes", note: "Ready to share or gift" },
    { name: "Ice Coffee", slug: "Ice Coffee", note: "tasty and refreshing"},
  ];

  readonly generalWhatsApp = "https://wa.me/201044279407";

  closeMenu(): void {
    this.menuOpen = false;
  }
}