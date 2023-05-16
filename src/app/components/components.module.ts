import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopNavComponent } from './top-nav/top-nav.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeroComponent } from './hero/hero.component';
import { BookingProcessComponent } from './booking-process/booking-process.component';
import { EatseServicesComponent } from './eatse-services/eatse-services.component';
import { FeaturesComponent } from './features/features.component';
import { FooterComponent } from './footer/footer.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';

import { ComponentsRoutingModule } from './components-routing.module';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';
import { BannerComponent } from './banner/banner.component';
import { PageConstructionComponent } from './page-construction/page-construction.component';
import { ServiceBookingComponent } from './service-booking/service-booking.component';
import { OneTimeComponent } from './one-time/one-time.component';

@NgModule({
  declarations: [
    TopNavComponent,
    HeroComponent,
    BookingProcessComponent,
    EatseServicesComponent,
    FeaturesComponent,
    FooterComponent,
    TestimonialsComponent,
    MobileMenuComponent,
    BannerComponent,
    PageConstructionComponent,
    ServiceBookingComponent,
    OneTimeComponent,
  ],
  imports: [CommonModule, ComponentsRoutingModule, NgbModule],
  exports: [
    TopNavComponent,
    HeroComponent,
    BookingProcessComponent,
    EatseServicesComponent,
    FeaturesComponent,
    TestimonialsComponent,
    BannerComponent,
    PageConstructionComponent,
    FooterComponent,
    ServiceBookingComponent,
    OneTimeComponent
  ],
})
export class ComponentsModule {}
