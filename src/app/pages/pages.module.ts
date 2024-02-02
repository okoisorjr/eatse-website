import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import {
  NgbModule,
  NgbModalModule,
  NgbPopoverModule,
  NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap';
import { BookingsModule } from './bookings/bookings.module';

import { PagesRoutingModule } from './pages-routing.module';
import { ContactComponent } from './contact/contact.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { GoalsComponent } from './goals/goals.component';
import { FaqComponent } from './faq/faq.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    ContactComponent,
    PrivacyPolicyComponent,
    GoalsComponent,
    FaqComponent,
    TermsOfServiceComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ComponentsModule,
    FormsModule,
    AccordionModule,
    NgbModalModule,
    NgbModule,
    NgbPopoverModule,
    BookingsModule,
    NgbDropdownModule,
  ],
})
export class PagesModule {}
