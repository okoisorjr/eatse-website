import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';
import { RouterModule } from '@angular/router';

import { PageLayoutComponent } from './page-layout/page-layout.component';

@NgModule({
  declarations: [PageLayoutComponent],
  imports: [CommonModule, RouterModule, ComponentsModule],
})
export class LayoutModule {}
