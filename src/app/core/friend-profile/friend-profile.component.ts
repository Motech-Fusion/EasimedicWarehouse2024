import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CustomFile } from 'src/app/authentication/choose-image/choose-image.component';
import { IMedicalPosts, IPosts } from 'src/app/shared/Interfaces/IPosts';
import { IDoctorsInterface, IUsersInterface } from 'src/app/shared/Interfaces/IUsersInterface';
import { AlertService } from 'src/app/shared/Services/alert.service';
import { FireStoreCollectionsServiceService, IAppointment } from 'src/app/shared/Services/fire-store-collections-service.service';
import { UserState } from 'src/app/shared/State/user.reducer';
import {
  selectCurrentUser,
  selectDocId,
} from 'src/app/shared/State/user.selectors';

export interface IComment {
  username: string;
  userImage: string;
  postedAt: string;
  comment: string;
}
@Component({
  selector: 'app-friend-profile',
  templateUrl: './friend-profile.component.html',
  styleUrls: ['./friend-profile.component.scss']
})
export class FriendProfileComponent implements OnInit{
//   this.currentUserId = id;
//   // console.log('Current user id:', this.currentUserId);
// });

  @ViewChild('imageInput') imageInput!: ElementRef;
  currentUser!: IDoctorsInterface;
  currentUserId!: string | null;
  editUser:boolean = false;
  selectedImages: any[] = [];
  selectedImage!: string;
  User!: IUsersInterface;
  selectedImageString: string = '';
  UserNameFormControl = new FormControl();
  UserBioFormControl = new FormControl();
  userName: string = '';
  userBio: string = '';
  myPosts:IMedicalPosts[] = []
  selectedTabIndex: number = 0;
  showGallerViewerFlag:boolean = false;
  userprofilePicture: string = '';
  recommedations: IUsersInterface[] = [];
  UserFriends: IUsersInterface[] = [];
showAppointmentDialog: boolean = false;
  constructor( private fireStoreCollectionsService: FireStoreCollectionsServiceService,
    private store: Store<UserState>,private router: Router, private alertService: AlertService){
  }
  ngOnInit(): void {

    this.router.routerState.root.queryParams.subscribe((params: any) => {
      console.log('here we gooooooo',JSON.parse(params.usersList))
      if (params) {
        this.currentUser = JSON.parse(params.friendData)
        this.recommedations = JSON.parse(params.usersList)
      }})
    // this.store.select(selectCurrentUser).subscribe((user) => {
    //   this.currentUser = user;
    //   console.log('Current user:', this.currentUser);
    // });

    this.store.select(selectDocId).subscribe((id) => {
      this.currentUserId = id;
      console.log("Current user id:", this.currentUserId);
    });

    // this.fireStoreCollectionsService.getAllUsers().subscribe((users) => {
    //   // console.log('users here', users);
    //   this.currentUser = users.filter(x=> x.docId == this.currentUserId)[0];
    //   return (users.filter(x=> x.docId == this.currentUserId));
    // });

    // this.store.select(selectDocId).subscribe((id) => {
    //   this.currentUserId = id;
    //   // console.log('Current user id:', this.currentUserId);
    // });

    this.UserNameFormControl.valueChanges.subscribe((val:string)=>{
      this.userName = val
    })
    this.UserBioFormControl.valueChanges.subscribe((val:string)=>{
      this.userBio = val
    })

    this.fireStoreCollectionsService.getAllPoststags().subscribe((posts) => {
      // Sort the posts by dateAdded in descending order (most recent first)
      console.warn("All my posts here",posts,this.currentUser?.docId)
      this.myPosts = posts
        .filter((v) => v.user == this.currentUser?.docId)
        .sort((a, b) => {
          const dateA = new Date(a.datePosted).getTime();
          const dateB = new Date(b.datePosted).getTime();
          return dateB - dateA;
        });
    });

    this.UserFriends = this.fetchCurrentUserFriends('');
  //  alert(this.recommedations)
  }

  fetchCurrentUserFriends(searchTerm: string = ''): IUsersInterface[] {

    const friendDocIds = this.currentUser!.friends;
    let filteredUsers = this.recommedations!.filter((user) =>
      friendDocIds.includes(user.docId)
    );

    // Apply additional filtering based on the search term
    if (searchTerm.trim() !== '') {
      const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.username.toLowerCase().includes(lowerCaseSearchTerm) ||
          user.name.toLowerCase().includes(lowerCaseSearchTerm)
      );
    } else {
      filteredUsers = this.recommedations!.filter((user) =>
        friendDocIds.includes(user.docId)
      );
    }

    return filteredUsers;
  }

  EditUser(){
    this.editUser = true;
  }
  close(){
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
          const base64String = (e.target?.result as string).split(',')[1];

          // Add the base64 string to the CustomFile object
          file.url = base64String;
          this.selectedImage = base64String;

          // Upload the base64 string to Firebase Storage
          var firebaseUrl = this.fireStoreCollectionsService
            .uploadPicture(base64String)
            .then((firebaseUrl) => {
              console.warn('download url here : ', firebaseUrl);
              this.selectedImageString  = firebaseUrl
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
      .updateduserprofile(this.currentUser?.phone as string, firebaseUrl)
      .subscribe((x) => {});
  }

  saveUserDetails(){
    console.warn("this is it"+this.selectedImageString,this.currentUser?.phone)
    this.uploadUserImage(this.selectedImageString);
    this.editUser = false;
  }

  selectTab(index: number): void {
    this.selectedTabIndex = index;
  }

  AddFriend(friend:IUsersInterface | null){

  }

  addNewFriend(userId: string | undefined, userNumber: string | undefined) {
    this.fireStoreCollectionsService
      .addFriend(this.currentUser?.docId as string, userNumber as string)
      .subscribe((val) => {
        // alert(val);
      });
    this.fireStoreCollectionsService
      .addFriend(userId as string, userNumber as string)
      .subscribe((val) => {
        // alert(val);
      });
    this.alertService.success(
      'Friend requested successully sent to ' + userNumber
    );
  }

  showGallerViewer(image:any){
   this.showGallerViewerFlag = true;
   this.userprofilePicture = this.currentUser?.image as string;

  }

  userProfileNavigation(friend: IUsersInterface) {
    this.router.navigate(['friend-profile'], {
      queryParams: {
        friendData: JSON.stringify(friend),
      },
    });
  }


  showImages(images: string | undefined) {

    this.router.navigate(['/', 'image-viewer'], {
      queryParams: {
        images: JSON.stringify([images]),
      },
    });
   
  }

  messagingNavigation(doctor: IDoctorsInterface | any) {
    this.router.navigate(['/', 'messaging'], {
      queryParams: {
        friendData: JSON.stringify(doctor),
      },
    });
  }

  bookAppointmentDialog() {
    this.showAppointmentDialog = true
    }

    closeAppointmentModal() {
      this.showAppointmentDialog = false
      }

      bookAppointment(data: any) {
       const appointmentData = <IAppointment>{
        category: data.category,
        description: data.decscription,
        bookingMade: "",
        doctor: this.currentUser.docId,
        patient: this.currentUserId,
        patientName: this.currentUser?.name ? this.currentUser?.name : this.currentUser?.fullname,
        patientImage: this.currentUser?.image ? this.currentUser?.image : null,
        status:"Pending",
        location:"Pretoria"
       }
       this.fireStoreCollectionsService.uploadAppointment(appointmentData).subscribe(x=>{
        this.showAppointmentDialog = false;
       })
        }
}
