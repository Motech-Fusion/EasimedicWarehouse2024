import { Component, ElementRef, ViewChild } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, switchMap, tap } from 'rxjs';
import { IUsersInterface } from 'src/app/shared/Interfaces/IUsersInterface';
import { AlertService } from 'src/app/shared/Services/alert.service';
import { FireStoreCollectionsServiceService } from 'src/app/shared/Services/fire-store-collections-service.service';
import { setCurrentUser } from 'src/app/shared/State/user.actions';
import { UserState } from 'src/app/shared/State/user.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  spinner: boolean = false;
  PhoneContentFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^\d{9}$/) // Adjust the pattern based on your phone number format
  ]);
  PasswordContentFormControl: FormControl = new FormControl();
  phoneNumber: string = '';
  selectedCountryCode: string = '27';
  isDropdownOpen: boolean = false;
  countryCodes: string[] = ['1', '44', '81', '27', '33']; // Add your desired country codes

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectCountryCode(code: string) {
    this.selectedCountryCode = code;
    this.isDropdownOpen = false;
  }
  constructor(
    // private msalService: MsalService,
    public router: Router,
    private fireStoreCollectionsService: FireStoreCollectionsServiceService,
    private store: Store<UserState>,private alertService: AlertService, private afMessaging:AngularFireMessaging
  ) {}


  ngOnInit(): void {
  // this.requestPermissionAndToken()
    this.PhoneContentFormControl.valueChanges.subscribe((val) => {
      this.phoneNumber = val as string;
    });

    this.PasswordContentFormControl.valueChanges.subscribe((val) => {
      this.password = val;
    });
  }

  navigateTo(pathName: string): void {
    this.router.navigate([`authentication/${pathName}`]);
  }

  signIn(event: Event): void {
    event.preventDefault();
    this.spinner = true;

    this.fireStoreCollectionsService
      .signInWithPhoneNumber("+27"+this.phoneNumber, this.password)
      .then((res) => {
        this.spinner = false;
        //dummy password U2FsdGVkX19JKjbWuwvP+m4lV4RRmEy4XZ8prl3Gows=
        var user = res as IUsersInterface;
        this.store.dispatch(setCurrentUser({ user: user}));
        localStorage.setItem('user', JSON.stringify(user));
        if(user.image == ""){
          this.router.navigate(['/authentication','choose-image'], {
            queryParams: {
              InterestedIn: user.InterestedIn,
              availability: user.availability,
              bio: user.bio,
              blocked: user.blocked,
              created: user.created,
              dob: user.dob,
              friends: user.friends,
              image: user.image,
              language: user.language,
              location: user.location,
              name: user.name,
              notificationToken: user.notificationToken,
              password: user.password,
              phone: user.phone,
              requests: user.requests,
              suspended: user.suspended,
              username: user.username,
            },
          });
        }else{
          this.router.navigate(['home'], {
            queryParams: {
              InterestedIn: user.InterestedIn,
              availability: user.availability,
              bio: user.bio,
              blocked: user.blocked,
              created: user.created,
              dob: user.dob,
              friends: user.friends,
              image: user.image,
              language: user.language,
              location: user.location,
              name: user.name,
              notificationToken: user.notificationToken,
              password: user.password,
              phone: user.phone,
              requests: user.requests,
              suspended: user.suspended,
              username: user.username,
            },
          });
        }
      })
      .catch((error) => {
        this.spinner = false;
        this.alertService.error('Invalid username or password, please enter valid info');
        // Swal.fire({
        //   title: 'Something went wrong.',
        //   text: `Unable to sign in with this account: ${error.message}`,
        //   icon: 'warning',
        //   confirmButtonText: 'Ok',
        // }).then((result) => {
        //   if (result.isConfirmed) {
        //     console.log('Clicked Yes, File deleted!');
        //   } else if (result.isDismissed) {
        //     console.log('Clicked No, File is safe!');
        //   }
        // });
      });

    setTimeout(() => {
      this.spinner = false;
      // Swal.fire('Yikes!', 'Something went wrong!', 'error')
    }, 6000);
  }

  // requestPermissionAndToken(): void {
  //   this.afMessaging.requestPermission
  //     .pipe(
  //       switchMap(() => this.afMessaging.getToken),
  //       tap((token) => {
  //         // Handle the obtained token (e.g., send it to your server)
  //         console.log('FCM Token:', token);
  //       }),
  //       catchError((error) => {
  //         console.error('Error requesting permission or token:', error);
  //         return [];
  //       })
  //     )
  //     .subscribe();
  // }
}
