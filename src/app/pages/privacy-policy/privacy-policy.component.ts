import { Component, OnInit } from '@angular/core';
import { PrivacyPolicyService } from 'src/app/services/privacy-policy.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {

  policies: any;

  constructor(private policyService: PrivacyPolicyService) { }

  ngOnInit(): void {
    this.policyService.fetchPolicies().then((value) => {
      this.policies = value;
      console.log(this.policies);
    })
    .catch((error) => {
      console.log(error);
    })
  }

}
