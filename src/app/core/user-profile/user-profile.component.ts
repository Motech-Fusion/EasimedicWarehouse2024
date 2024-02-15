import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { CustomFile } from "src/app/authentication/choose-image/choose-image.component";
import { IMedicalPosts, IPosts } from "src/app/shared/Interfaces/IPosts";
import { IUsersInterface } from "src/app/shared/Interfaces/IUsersInterface";
import { FireStoreCollectionsServiceService } from "src/app/shared/Services/fire-store-collections-service.service";
import { UserState } from "src/app/shared/State/user.reducer";
import {
  selectCurrentUser,
  selectDocId,
} from "src/app/shared/State/user.selectors";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit {
  @ViewChild("imageInput") imageInput!: ElementRef;
  currentUser!: IUsersInterface | null;
  currentUserId!: string | null;
  editUser: boolean = false;
  selectedImages: any[] = [];
  selectedImage!: string;
  User!: IUsersInterface;
  selectedImageString: string = "";
  UserNameFormControl = new FormControl();
  UserBioFormControl = new FormControl();
  userName: string = "";
  userBio: string = "";
  myPosts: IMedicalPosts[] = [];
  selectedTabIndex: number = 0;
  showPaymentContainer = false;
  userSelectedPlan: string = '';
  daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  workHours:any = {};

  constructor(
    private fireStoreCollectionsService: FireStoreCollectionsServiceService,
    private store: Store<UserState>,
    private router: Router,
  ) {
    this.daysOfWeek.forEach(day => {
      this.workHours[day] = { start: '', end: '' };
    });
  }

  
  ngOnInit(): void {
    // this.store.select(selectCurrentUser).subscribe((user) => {
    //   this.currentUser = user;
    //   console.log('Current user:', this.currentUser);
    // });

    this.fireStoreCollectionsService.getAllUsers().subscribe((users) => {
      // console.log('users here', users);
      this.currentUser = users.filter((x) => x.docId == this.currentUserId)[0];
      this.UserNameFormControl.setValue(this.currentUser?.name);
      this.UserBioFormControl.setValue(this.currentUser?.bio);
      return users.filter((x) => x.docId == this.currentUserId);
    });

    this.store.select(selectDocId).subscribe((id) => {
      this.currentUserId = id;
      console.log("Current user id:", this.currentUserId);
    });

    this.UserNameFormControl.valueChanges.subscribe((val: string) => {
      this.userName = val;
    });

    this.UserBioFormControl.valueChanges.subscribe((val: string) => {
      this.userBio = val;
    });

    this.fireStoreCollectionsService.getAllPoststags().subscribe((posts) => {
      // Sort the posts by dateAdded in descending order (most recent first)
      console.log("All my posts here", posts, this.currentUserId);
      this.myPosts = posts
        .filter(
          (v) =>
            v.user == this.currentUserId 
        )
        .sort((a, b) => {
          const dateA = new Date(a.datePosted).getTime();
          const dateB = new Date(b.datePosted).getTime();
          return dateB - dateA;
        });
    });
  }

  EditUser() {
    this.editUser = true;
  }
  close() {
    this.editUser = false;
  }

  triggerImageInput(): void {
    // Access the native element using this.imageInput.nativeElement
    this.imageInput.nativeElement.click();
  }

  onImageSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      const selectedImages: FileList = inputElement.files;
      // You can now handle the selected images, for example, upload them to a server

      // Read the contents of each image and create a data URL
      const fileArray: CustomFile[] = Array.from(selectedImages);
      fileArray.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          // Add the data URL to the CustomFile object
          const base64String = (e.target?.result as string).split(",")[1];

          // Add the base64 string to the CustomFile object
          file.url = base64String;
          this.selectedImage = base64String;

          // Upload the base64 string to Firebase Storage
          var firebaseUrl = this.fireStoreCollectionsService
            .uploadPicture(base64String)
            .then((firebaseUrl) => {
              console.warn("download url here : ", firebaseUrl);
              this.selectedImageString = firebaseUrl;
              // this.uploadUserImage(firebaseUrl);
            })
            .catch((error) => {
              console.error(error);
            });
          console.warn(firebaseUrl);
        };
        reader.readAsDataURL(file);
      });

      // Set the updated array to selectedImages
      this.selectedImages = fileArray;
    }
  }
  uploadUserImage(firebaseUrl: string) {
    this.fireStoreCollectionsService
      .updateduserprofile(this.currentUser?.phone as string, firebaseUrl,this.userName,this.userBio)
      .subscribe((x) => {});
    this.fireStoreCollectionsService
      .updatedDoctorprofile(this.currentUser?.phone as string, firebaseUrl,this.userName,this.userBio)
      .subscribe((x) => {});
    
  }

  saveUserDetails() {
    console.warn(
      "this is it" + this.selectedImageString,
      this.currentUser?.phone
    );
    this.uploadUserImage(this.selectedImageString);
    this.editUser = false;
  }

  selectTab(index: number): void {
    this.selectedTabIndex = index;
  }

  SubscriptionSettings() {
   this.showPaymentContainer = !this.showPaymentContainer;
  }

  selectPlan(data: any) {
   this.userSelectedPlan = data.planType
    }

    checkout() {
      this.router.navigate(["/", "checkout"]);
    }

    getKeys(object: {}) {
      return Object.keys(object);
    }
}
