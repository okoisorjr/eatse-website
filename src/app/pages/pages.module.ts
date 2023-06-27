import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';

import { PagesRoutingModule } from './pages-routing.module';
import { ContactComponent } from './contact/contact.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { GoalsComponent } from './goals/goals.component';
import { FaqComponent } from './faq/faq.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';


@NgModule({
  declarations: [
    ContactComponent,
    PrivacyPolicyComponent,
    GoalsComponent,
    FaqComponent,
    TermsOfServiceComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ComponentsModule,
    FormsModule,
    AccordionModule
  ]
})
export class PagesModule { }
