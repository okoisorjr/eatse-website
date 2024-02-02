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
import { FlutterwaveModule } from 'flutterwave-angular-v3';
import { NgSelectModule } from '@ng-select/ng-select';

import { ComponentsRoutingModule } from './components-routing.module';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';
import { BannerComponent } from './banner/banner.component';
import { PageConstructionComponent } from './page-construction/page-construction.component';
import { ServiceBookingComponent } from './service-booking/service-booking.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { FormsModule } from '@angular/forms';
import { WeeklyPickerComponent } from './weekly-picker/weekly-picker.component';
import { HousekeepingComponent } from './booking/housekeeping/housekeeping.component';
import { DeepCleaningComponent } from './booking/deep-cleaning/deep-cleaning.component';
import { ErrandComponent } from './booking/errand/errand.component';
import { LaundryComponent } from './booking/laundry/laundry.component';
import { FumigationComponent } from './booking/fumigation/fumigation.component';
import { OfficeCleaningComponent } from './booking/office-cleaning/office-cleaning.component';
import { PostConstructionComponent } from './booking/post-construction/post-construction.component';
import { MoveInOutComponent } from './booking/move-in-out/move-in-out.component';
import { EatseCaresComponent } from './eatse-cares/eatse-cares.component';
import { BuildingTypeComponent } from './building-type/building-type.component';

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
    DatePickerComponent,
    WeeklyPickerComponent,
    HousekeepingComponent,
    DeepCleaningComponent,
    ErrandComponent,
    LaundryComponent,
    FumigationComponent,
    OfficeCleaningComponent,
    PostConstructionComponent,
    MoveInOutComponent,
    EatseCaresComponent,
    BuildingTypeComponent
  ],
  imports: [CommonModule, ComponentsRoutingModule, NgbModule, FormsModule, FlutterwaveModule, NgSelectModule],
  exports: [
    TopNavComponent,
    HeroComponent,
    BookingProcessComponent,
    EatseServicesComponent,
    EatseCaresComponent,
    FeaturesComponent,
    TestimonialsComponent,
    BannerComponent,
    PageConstructionComponent,
    FooterComponent,
    ServiceBookingComponent,
    HousekeepingComponent,
    DeepCleaningComponent,
    LaundryComponent,
    ErrandComponent,
    FumigationComponent,
    PostConstructionComponent,
    OfficeCleaningComponent,
    MoveInOutComponent
  ],
})
export class ComponentsModule {}
