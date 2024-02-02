import { Injectable } from '@angular/core';

export interface Terms{
  position?: number;
  title?: string;
  content?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TermsAndConditionsService {

  terms: Terms[] = [];

  constructor() { }

  async fetchTermsOfService(): Promise<Terms[]>{
    this.terms = [];
    /* const termsOfServiceRef = collection(this.fs, 'termsAndConditions');
    const q = query(termsOfServiceRef, orderBy('position'));
    let serviceTerms = await getDocsFromServer(q);
    serviceTerms.forEach((doc) => {
      this.terms.push(doc.data());
    }) */
    return this.terms;
  }
}
