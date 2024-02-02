import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-page-layout',
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.css'],
})
export class PageLayoutComponent implements OnInit {
  containerFluid: boolean = false;

  constructor(private ar: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {}
}
