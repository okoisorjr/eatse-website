import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { PageConstructionComponent } from '../components/page-construction/page-construction.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

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
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./about/about.module').then((m) => m.AboutModule),
  },
  {
    path: 'services',
    loadChildren: () =>
      import('./eatse-services/eatse-services.module').then(
        (m) => m.EatseServicesModule
      ),
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'our-policy',
    component: PrivacyPolicyComponent,
  },
  {
    path: 'page-construction',
    component: PageConstructionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
