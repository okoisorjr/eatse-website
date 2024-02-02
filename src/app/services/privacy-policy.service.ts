import { Injectable } from '@angular/core';

export interface Policy{
  index?: string
  title?: string;
  content?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PrivacyPolicyService {

  policies: Policy[] = [];

  constructor() { }

  async fetchPolicies(): Promise<Policy[]> {
    this.policies = [];
    /* const policiesRef = collection(this.fs, 'policies');
    const q = query(policiesRef, orderBy('index'));
    let policiesDoc = await getDocsFromServer(q);
    policiesDoc.forEach((doc) => {
      this.policies.push(doc.data());
    }) */
    
    return this.policies;
  }
}
