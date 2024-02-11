import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-screen',
  templateUrl: './payment-screen.component.html',
  styleUrls: ['./payment-screen.component.scss']
})
export class PaymentScreenComponent{
price: string ="";
uid: number = 120;

constructor(private sanitizer: DomSanitizer) {}

getSafeUrl(): SafeResourceUrl {
  const url = `https://us-central1-e-health-3eda1.cloudfunctions.net/getCheckoutId?uid=${this.uid}&amount=${this.price}&total=${this.price}`;
  return this.sanitizer.bypassSecurityTrustResourceUrl(url);
}
}
