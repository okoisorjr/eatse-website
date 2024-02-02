import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { PageConstructionComponent } from '../components/page-construction/page-construction.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { GoalsComponent } from './goals/goals.component';
import { FaqComponent } from './faq/faq.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'booking',
    loadChildren: () =>
      import('./bookings/bookings.module').then((m) => m.BookingsModule),
    /* canActivate: [AuthGuard] */
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./about/about.module').then((m) => m.AboutModule),
  },
  {
    path: 'careers',
    loadChildren: () =>
      import('./careers/careers.module').then((m) => m.CareersModule),
  },
  {
    path: 'blogs',
    loadChildren: () =>
      import('./blogs/blogs.module').then((m) => m.BlogsModule),
  },
  {
    path: 'services',
    loadChildren: () =>
      import('./eatse-services/eatse-services.module').then(
        (m) => m.EatseServicesModule
      ),
    /* canActivate: [AuthGuard] */
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'faq',
    component: FaqComponent,
  },
  {
    path: 'our-policy',
    component: PrivacyPolicyComponent,
  },
  {
    path: 'page-construction',
    component: PageConstructionComponent,
  },
  {
    path: 'goals',
    component: GoalsComponent,
  },
  {
    path: 'terms-and-conditions',
    component: TermsOfServiceComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
