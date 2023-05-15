import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GlobalResourceService } from 'src/app/global-resource/global-resource.service';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.css'],
})
export class MobileMenuComponent implements OnInit {

  @Input() menuState!: boolean;
  @Output() updateMenuState = new EventEmitter();

  mobileMenu!: boolean;

  constructor(private globalService: GlobalResourceService) {}

  ngOnInit(): void {
    this.mobileMenu = this.globalService.getMobileMenuState();
  }

  hideMenu() {
    this.globalService.setMobileMenuState(false);
  }
}
