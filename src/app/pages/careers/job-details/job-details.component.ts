import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CareerService } from 'src/app/services/career.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css'],
})
export class JobDetailsComponent implements OnInit {
  roles: any[] = [];
  activeRole: any;
  all_openings: any[] = [];
  role_id!: string;

  constructor(
    private ar: ActivatedRoute,
    private router: Router,
    private careerService: CareerService
  ) {
    this.role_id = this.ar.snapshot.params['role_id'];
  }

  fetchAllOpenings() {
    this.careerService.fetchAllOpenings().subscribe(
      (value) => {
        this.all_openings = value;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
    this.careerService.fetchSingleOpenPosition(this.role_id).subscribe(
      (value) => {
        this.activeRole = value;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );

    this.roles.find((role) => {
      if (role.link == this.ar.snapshot.params['id']) {
        this.activeRole = role.role;
      }
    });
    this.fetchAllOpenings();
  }

  updateActiveRole(role: any) {
    this.activeRole = role;
  }

  apply() {
    this.router.navigate([`/careers/role/${this.activeRole._id}/apply`]);
  }
}
