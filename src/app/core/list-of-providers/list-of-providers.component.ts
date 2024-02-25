import { Component, ElementRef, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { CustomFile } from "src/app/authentication/choose-image/choose-image.component";
import { IMedicalPosts, IPosts } from "src/app/shared/Interfaces/IPosts";
import {
  IDoctorsInterface,
  IUsersInterface,
} from "src/app/shared/Interfaces/IUsersInterface";
import { AlertService } from "src/app/shared/Services/alert.service";
import { FireStoreCollectionsServiceService } from "src/app/shared/Services/fire-store-collections-service.service";
import { UserState } from "src/app/shared/State/user.reducer";
import {
  selectCurrentUser,
  selectDocId,
} from "src/app/shared/State/user.selectors";

@Component({
  selector: "app-list-of-providers",
  templateUrl: "./list-of-providers.component.html",
  styleUrls: ["./list-of-providers.component.scss"],
})
export class ListOfProvidersComponent {
  @ViewChild("imageInput") imageInput!: ElementRef;
  // recommedations: IUsersInterface[] | undefined;
  ModalData!: IUsersInterface;
  openModalFlag!: boolean;
  currentUserId!: string | null;
  AllPosts!: IMedicalPosts[];
  PostContentFormControl: FormControl = new FormControl();
  PostContent: string = "";
  postText: string = "";
  selectedImages: any[] = [];
  OriginalDoctors: IDoctorsInterface[] = [];
  doctors: IDoctorsInterface[] = [];
  imagesConvertedToFirebaseUrl: any;
  currentUser!: IUsersInterface | null;
  filterByTrend: string = "";
  title: string = "";
  description: string = "";

  constructor(
    private fireStoreCollectionsService: FireStoreCollectionsServiceService,
    private router: Router,
    private store: Store<UserState>,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.router.routerState.root.queryParams.subscribe((params: any) => {
      if (params) {
        this.title = params.title;
        this.description = params.description;
      }
    });

    this.store.select(selectDocId).subscribe((id) => {
      this.currentUserId = id;
      // console.log('Current user id:', this.currentUserId);
    });

    this.store.select(selectCurrentUser).subscribe((user) => {
      this.currentUser = user;
    });

    this.fireStoreCollectionsService.getAllDoctors().subscribe((users) => {
      console.log("doctors here 1", users);

      this.OriginalDoctors = users.filter((u) => u.fullname !== undefined);
      this.doctors = users.filter((u) => u.fullname !== undefined && u.qualification.toLocaleLowerCase() === this.title.toLocaleLowerCase());
      const validDoctors = users.filter((u) => u.fullname !== undefined);
      return validDoctors;
    });
    // console.log('all posts:', this.AllPosts);
  }

  callUser(arg0: any) {
    throw new Error("Method not implemented.");
  }
  
  navigateToChat(doctor: IDoctorsInterface) {
    this.router.navigate(["/", "messaging"], {
      queryParams: {
        friendData: JSON.stringify(doctor),
      },
    });
  }
}
