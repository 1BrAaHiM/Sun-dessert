import { CommonModule } from "@angular/common";
import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
  selector: 'hero-carousal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-slider.component.html',
  styleUrl: './hero-slider.component.css'
})
export class HeroCarousal implements OnInit, OnDestroy {

  currentSlide = 0;

  slides = [
    {
      title: 'Order Our Latest Handbook',
      description: 'Enjoy beloved recipes and create delicious desserts at home.',
      image: '/assets/4PiecesCookies.jpg'
    },

    {
      title: 'Visit Us',
      description: 'Discover our sweetest offers.',
      image: '/assets/bazzar.png'
    }
  ];


  // Automatic sliding timer
  private slideInterval!: ReturnType<typeof setInterval>;


  ngOnInit(): void {
    this.startAutoSlide();
  }


  ngOnDestroy(): void {
    clearInterval(this.slideInterval);
  }


  // Start automatic carousel
  startAutoSlide(): void {

    this.slideInterval = setInterval(() => {

      this.nextSlide(false);

    }, 10000);

  }


  // Reset the timer after manually changing slide
  resetAutoSlide(): void {

    clearInterval(this.slideInterval);

    this.startAutoSlide();

  }


  // Next slide
  nextSlide(manual: boolean = true): void {

    this.currentSlide =
      (this.currentSlide + 1) % this.slides.length;


    if (manual) {
      this.resetAutoSlide();
    }

  }


  // Previous slide
  prevSlide(): void {

    this.currentSlide =
      (this.currentSlide - 1 + this.slides.length)
      % this.slides.length;

    this.resetAutoSlide();

  }


  // Go directly to a slide
  goToSlide(index: number): void {

    this.currentSlide = index;

    this.resetAutoSlide();

  }

}