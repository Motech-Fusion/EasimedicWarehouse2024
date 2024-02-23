import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { AngularFireMessaging } from "@angular/fire/compat/messaging";
import { FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { catchError, switchMap, tap } from "rxjs";
import { IUsersInterface } from "src/app/shared/Interfaces/IUsersInterface";
import { AlertService } from "src/app/shared/Services/alert.service";
import { FireStoreCollectionsServiceService } from "src/app/shared/Services/fire-store-collections-service.service";
import { setCurrentUser } from "src/app/shared/State/user.actions";
import { UserState } from "src/app/shared/State/user.reducer";
import { ChangeDetectorRef } from "@angular/core";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit,AfterViewInit{
  email: string = "";
  password: string = "";
  showPassword: boolean = false;
  spinner: boolean = false;
  PhoneContentFormControl = new FormControl("", [
    Validators.required,
    Validators.pattern(/^\d{9}$/), // Adjust the pattern based on your phone number format
  ]);
  PasswordContentFormControl: FormControl = new FormControl();
  phoneNumber: string = "";
  selectedCountryCode: string = "27";
  isDropdownOpen: boolean = false;
  countryCodes: string[] = ["1", "44", "81", "27", "33"]; // Add your desired country codes
  showNotification = false;
  showResetNotification = false;
  showForgotPasswordModal = false;
  PhoneForgotPasswordFormControl: FormControl = new FormControl();
  EmailForgotPasswordFormControl: FormControl = new FormControl();
  useEmailLogin: boolean = false;

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
    private store: Store<UserState>,
    private alertService: AlertService,
    private afMessaging: AngularFireMessaging,
    private cdr: ChangeDetectorRef
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

  ngAfterViewInit() {
    const phoneInput = document.getElementById('phone') as HTMLInputElement;
    phoneInput.addEventListener('input', () => {
      const phoneNumber = phoneInput.value;
      
      window.parent.postMessage(JSON.stringify({ type: 'phoneNumber', value: phoneNumber }));
      console.log("yea")
    });
  }

  navigateTo(pathName: string): void {
    this.router.navigate([`authentication/${pathName}`]);
  }

  signIn(event: Event): void {
    event.preventDefault();
    this.spinner = true;

    if(!this.useEmailLogin){
    this.fireStoreCollectionsService
      .signInWithPhoneNumber("+27" + this.phoneNumber, this.password)
      .then((res) => {
        this.spinner = false;
        //dummy password U2FsdGVkX19JKjbWuwvP+m4lV4RRmEy4XZ8prl3Gows=
        var user = res as IUsersInterface;
        this.store.dispatch(setCurrentUser({ user: user }));
        localStorage.setItem("user", JSON.stringify(user));
        if (user.image == "") {
          this.router.navigate(["/authentication", "choose-image"], {
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
        } else {
          this.router.navigate(["home"], {
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
        this.showNotification = true;
        setTimeout(() => {
          this.showNotification = false;
        }, 2000);
      });
    }else{
      this.fireStoreCollectionsService
      .signInWithEmail(this.phoneNumber, this.password)
      .then((res) => {
        this.spinner = false;
        //dummy password U2FsdGVkX19JKjbWuwvP+m4lV4RRmEy4XZ8prl3Gows=
        var user = res as IUsersInterface;
        this.store.dispatch(setCurrentUser({ user: user }));
        localStorage.setItem("user", JSON.stringify(user));
        if (user.image == "") {
          this.router.navigate(["/authentication", "choose-image"], {
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
        } else {
          this.router.navigate(["home"], {
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
        this.showNotification = true;
        setTimeout(() => {
          this.showNotification = false;
        }, 2000);
      });
    }


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

  SubmitForgotPassword() {
    this.showResetNotification = true;
    this.hideModal();
    setTimeout(() => {
      this.showResetNotification = false;
    }, 5000);
  }

  showResetPasswordModal() {
    this.showForgotPasswordModal = true;
  }
  hideModal() {
    this.showForgotPasswordModal = false;
  }

  toggleEmailLogin(event:any) {
    // alert(JSON.stringify(event))
    this.useEmailLogin = true;
    this.cdr.detectChanges();
  }

  untoggleEmailLogin(event:any) {
    // alert(JSON.stringify(event))
    this.useEmailLogin = false;
    this.cdr.detectChanges();
  }

toggleShowPassword(checked: boolean) {
  this.showPassword = checked;
}
}
