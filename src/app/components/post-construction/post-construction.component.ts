import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post-construction',
  templateUrl: './post-construction.component.html',
  styleUrls: ['./post-construction.component.css']
})
export class PostConstructionComponent implements OnInit {
  @Input() service!: string;

  currentUser!: boolean;
  step: number = 1;
  frequency: string = 'one-time';

  constructor() { }

  ngOnInit(): void {
  }
}
