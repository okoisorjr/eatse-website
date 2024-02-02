import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css'],
})
export class JobDetailsComponent implements OnInit {
  roles: any[] = [];
  activeRole!: string;

  constructor(private ar: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.roles = [
      { role: 'Easer', link: 'easer' },
      { role: 'Business Developer', link: 'business-developer' },
      { role: 'Frontend Developer', link: 'frontend-developer' },
      { role: 'Backend Developer', link: 'backend-developer' },
      { role: 'Product Designer', link: 'product-designer' },
    ];

    this.roles.find((role) => {
      if (role.link == this.ar.snapshot.params['id']) {
        this.activeRole = role.role;
      }
    });
  }

  updateActiveRole(role: string) {
    this.activeRole = role;
  }

  apply() {
    this.router.navigate([`/careers/role/${this.activeRole}/apply`]);
  }
}
