import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  responsiveOptions: any[] = [];
  images: any[] = [
    { img: 'assets/eatse/img_0.png', index: 0 },
    { img: 'assets/eatse/img_1.png', index: 1 },
    { img: 'assets/eatse/img_2.png', index: 2 },
    { img: 'assets/eatse/img_3.png', index: 3 },
    { img: 'assets/eatse/img_4.png', index: 4 },
  ];
  benefits: any[] = [];
  roles: any[] = [];

  constructor() {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 4,
        numScroll: 4,
      },
      {
        breakpoint: '910px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  ngOnInit(): void {
    this.benefits = [
      {
        img: 'assets/eatse/equality.png',
        title: 'Fair and equitable salary',
        desc: `Competitive renumeration. Our payment system is optimized 
        for fairness and grows over time.`,
      },
      {
        img: 'assets/eatse/worklife_balance.png',
        title: 'Create your work-life balance.',
        desc: `Choose the when and where to work. Create a perfect work life balance for yourself.`,
      },
      {
        img: 'assets/eatse/pension_scheme.png',
        title: 'Pension scheme',
        desc: ` Our professionals are guaranteed a good pension scheme. Retirement is relaxation with Eatse.`,
      },
      {
        img: 'assets/eatse/health_benefits.png',
        title: 'Health benefits',
        desc: `Our professionals are entitled to free medical consultation.`,
      },
      {
        img: 'assets/eatse/food_bank.png',
        title: 'Foodbank',
        desc: `Eatse guarantees our professionals a foodbank. Foodstuffs are made available at affordable cost.`,
      },
      {
        img: 'assets/eatse/referral_bonuses.png',
        title: 'Referral Bonuses',
        desc: `Eatse has a referral scheme. Earn juicy bonuses when you refer clients to us.`,
      },
    ];
    this.roles = [
      { role: 'Easer', link: 'easer' },
      { role: 'Business Developer', link: 'business-developer' },
      { role: 'Frontend Developer', link: 'frontend-developer' },
      { role: 'Backend Developer', link: 'backend-developer' },
      { role: 'Product Designer', link: 'product-designer' },
    ];
  }
}
