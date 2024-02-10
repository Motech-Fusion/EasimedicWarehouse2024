import { Routes, RouterModule, Router } from '@angular/router';
import { Component, OnInit,Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  spinner: boolean = false;
  isBrowser: boolean;
  isServer: boolean;
  constructor(private route: Router, @Inject(PLATFORM_ID) private platformId: any)
  {
    // console.log(platformId)
    this.isBrowser = isPlatformBrowser(platformId);
    this.isServer = isPlatformServer(platformId);
  }

  ngOnInit(): void
  {
    console.log(this.isBrowser)
    this.spinner = true;
    setTimeout(() => {
      this.spinner = false;
      // Swal.fire('Yikes!', 'Something went wrong!', 'error')
    }, 3000);
  }

  proceed(): void {
    this.route.navigate(['authentication/login']);
  }

  liveDemo(): void {
    this.route.navigate(['authentication/tutorial']);
  }
}
