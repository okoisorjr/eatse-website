import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApplicationPageComponent } from './application-page/application-page.component';
import { JobDetailsComponent } from './job-details/job-details.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'role/:role_id', component: JobDetailsComponent },
  { path: 'role/:role_id/apply', component: ApplicationPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CareersRoutingModule {}
