import { bootstrapApplication } from "@angular/platform-browser";
import { provideHttpClient } from "@angular/common/http";
import { provideRouter, withInMemoryScrolling } from "@angular/router";
import { AppComponent } from "./app/app.component";
import { appRoutes } from "./app/app.routes";

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(
      appRoutes,
      withInMemoryScrolling({ scrollPositionRestoration: "top" }),
    ),
  ],
}).catch((error: unknown) => {
  console.error("Unable to start Sun Dessert", error);
});