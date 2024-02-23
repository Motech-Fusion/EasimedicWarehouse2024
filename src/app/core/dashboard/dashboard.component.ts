import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { FormControl } from '@angular/forms';
import { NavigationExtras, Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { BehaviorSubject, Observable, catchError, filter, map, switchMap, tap } from 'rxjs';
import { CustomFile } from 'src/app/authentication/choose-image/choose-image.component';
import { IHashTags } from 'src/app/shared/Interfaces/IHashTags';
import { IMedicalPosts, IPosts } from 'src/app/shared/Interfaces/IPosts';
import { IDoctorsInterface, IUsersInterface } from 'src/app/shared/Interfaces/IUsersInterface';
import { AlertService } from 'src/app/shared/Services/alert.service';
import {
  ChatMessage,
  FireStoreCollectionsServiceService,
  IAppointment,
  IMedicalProduct,
  ITowTrucks,
  ITruckAppointment,
  UserStories,
} from 'src/app/shared/Services/fire-store-collections-service.service';
import { UserState } from 'src/app/shared/State/user.reducer';
import {
  selectCurrentUser,
  selectDocId,
} from 'src/app/shared/State/user.selectors';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { headerAds } from 'src/app/shared/promoted-tabs/promoted-tabs.component';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  recommedations: IUsersInterface[] = [];
  hashtags: IHashTags[] | undefined;
  readonly DOCTORS = "Doctors";
  readonly SANGOMA = "Sangoma";
  readonly POSTS = "Medical Posts";
  readonly TOWTRUCK = "Tow Trucks";
  readonly NEWS = "News";
  readonly PERIODTRACKER = "Period tracker";
  readonly EMERGENCY = "Emergency";
  readonly SECURITY = "Security";
  readonly MESSAGES = "Messages";
  selectedTabTitle: string = this.MESSAGES;
  ModalData!: IUsersInterface;
  openModalFlag!: boolean;
  AllPosts: IMedicalPosts[] = [];
  AllPromos: IPosts[] = [];
  originalAllPosts: IMedicalPosts[] = [];
  originalAllPromos: IPosts[] = [];
  friends!: IUsersInterface[] | undefined;
  ListOfStories!: UserStories[];
  NewsArticles: any[] = [];
  OriginalNewsArticles: any[] = [];
  showRecommendations: boolean = false;
  showBookTowTruckModal: boolean = false;
  hide: boolean = false;
  InterestedIn: any;
  availability: any;
  bio: any;
  blocked: any;
  created: any;
  dob: any;
  image: any;
  language: any;
  location: any;
  name: any;
  notificationToken: any;
  password: any;
  phone: any;
  requests: any;
  suspended: any;
  username: any;
  currentUserObject!: IUsersInterface;
  currentUser!: IUsersInterface | null;
  currentUserId!: string | null;
  searchPlaceholder: string = "Search users...";
  OriginalUserFriends: IUsersInterface[] = [];
  UserFriends: IUsersInterface[] = [];
  currentUserProfileDetails$: any;
  friendRequestUserId!: string;
  friendRequestUserNumber!: string;
  currentUserFriendRequests: string[] = [];
  CurrentUserStories: UserStories[] = [];
  hideAds: boolean = false;
  showAds: boolean = false;
  showProductModal: boolean = false;
  adsHeaders: headerAds[] = [
    { name: "Global Health News", svg: "" },
    { name: "Global Weather News", svg: "" },
  ];
  doctors: IDoctorsInterface[] = [];
  OriginalDoctors: IDoctorsInterface[] = [];
  sangomas: IDoctorsInterface[] = [];
  news: any[] = [];
  towTrucks: ITowTrucks[] = [];
  messagesUserList: IUsersInterface[] | undefined = [];
  doctorsList!: IDoctorsInterface[];
  MedicalProductNameFormControl: FormControl = new FormControl();
  MedicalProductPriceFormControl: FormControl = new FormControl();
  MedicalProductDescriptionFormControl: FormControl = new FormControl();
  medicalProductName!: string;
  medicalProductDescription!: string;
  medicalProductPrice!: number;
  userAppointments: IAppointment[] = [];
  @ViewChild("imageInput") imageInput!: ElementRef;
  selectedImage: string = "";
  selectedImageString: string = "";
  selectedImages: any[] = [];
  security!: IDoctorsInterface[];
  emergency!: IDoctorsInterface[];
  showAppointmentNotification: boolean = false;
  towTrucksAppointments: ITruckAppointment[] = [];
  towTruckbooking!: ITowTrucks;
  showExpandable1: boolean = false;
  showExpandable2: boolean = false;

  constructor(
    private fireStoreCollectionsService: FireStoreCollectionsServiceService,
    private router: Router,
    private store: Store<UserState>,
    private alertService: AlertService,
    private afMessaging: AngularFireMessaging
  ) {}
  ngOnInit(): void {
    this.getNews();
    this.fireStoreCollectionsService.getAllUsers().subscribe((users) => {
      // console.log('users here', users);
      return (this.recommedations = users);
    });
    this.fireStoreCollectionsService.getAllUsers().subscribe((users) => {
      // console.log('users here', users);
      this.currentUser = users.filter((x) => x.docId == this.currentUserId)[0];
      // this.messagesUserList = this.fetchCurrentUserFriends('');
      // console.info('jeyt', this.messagesUserList);
      this.getFriendLastMessage();
      this.currentUserFriendRequests = this.currentUser.requests.filter(
        (x) => x !== this.currentUser?.docId
      );
      return users.filter((x) => x.docId == this.currentUserId);
    });
    this.fireStoreCollectionsService.getAllDoctors().subscribe((users) => {
      console.log("doctors here 1", users);

      this.OriginalDoctors = users.filter((u) => u.fullname !== undefined);
      this.doctors = users.filter((u) => u.fullname !== undefined);
      const validDoctors = users.filter((u) => u.fullname !== undefined);
      if (this.currentUser?.easiMedicFor == "Service Provider") {
        this.fetcUsersMessageUserList(
          this.recommedations as IDoctorsInterface[]
        );
      } else {
        this.fetcUsersMessageUserList(this.doctors);
      }
      return validDoctors;
    });
    this.fireStoreCollectionsService.getAllSangomas().subscribe((users) => {
      // console.log('users here', users);
      return (this.sangomas = users);
    });
    this.fireStoreCollectionsService.getAllSecurity().subscribe((users) => {
      // console.log('users here', users);
      return (this.security = users);
    });

    this.fireStoreCollectionsService.getAllEmergency().subscribe((users) => {
      // console.log('users here', users);
      return (this.emergency = users);
    });

    this.store.select(selectDocId).subscribe((id) => {
      this.currentUserId = id;
      this.fetchAppointments();
      this.getTruckAppointments();
      this.requestPermissionAndToken();
      console.log("Current user id:", this.currentUserId);
    });

    // this.currentUserProfileDetails$ = this.fireStoreCollectionsService.getAllUsers().subscribe((users) => {
    //   // console.log('users here', users);
    //   return (users.filter(x=> x.docId == this.currentUserId));
    // });
    this.fireStoreCollectionsService
      .getAllTrendingHashtags()
      .subscribe((hashtags) => {
        console.warn("hastags right heereee", hashtags);
        this.hashtags = hashtags;
      });

    this.getAllPosts();

    this.fireStoreCollectionsService
      .getTowTrucks()
      .subscribe((x: ITowTrucks[]) => {
        const towTrucks = x.filter(
          (truck) =>
            truck.name !== undefined ||
            truck.name !== "" ||
            truck.type !== undefined ||
            truck.type !== ""
        );
        this.towTrucks = towTrucks;
      });

    this.fireStoreCollectionsService.getAllPromostags().subscribe((posts) => {
      // Sort the posts by dateAdded in descending order (most recent first)
      console.warn("All posts here", posts);
      this.originalAllPromos = posts
        .filter((v) => v.post !== "" && v.username !== "" && v.title != "")
        .sort((a, b) => {
          const dateA = new Date(a.datePosted).getTime();
          const dateB = new Date(b.datePosted).getTime();
          return dateB - dateA;
        });
      this.AllPromos = this.originalAllPromos;
    });

    fetch(
      "https://newsapi.org/v2/top-headlines?country=za&apiKey=32054b2282e440a2bf45da9fcacb2040"
    )
      .then((response) => response.json())
      .then((json) => {
        this.OriginalNewsArticles = json.articles;
        this.NewsArticles = this.OriginalNewsArticles;
      })
      .catch((error) => {
        // console.error(error);
      });

    this.fireStoreCollectionsService.getAllUsers().subscribe((users) => {
      // console.log('users here', users);
      return (this.friends = users);
    });
    // this.fetchCurrentUserFriends();
    this.UserFriends = this.fetchCurrentUserFriends("");
  }

  fetchAppointments() {
    this.fireStoreCollectionsService
      .getAllAppointments()
      .subscribe((appointments) => {
        let filteredAppointment = [];
        if (this.currentUser?.easiMedicFor == "Service Provider") {
          filteredAppointment = appointments.filter(
            (app) => app.doctor == this.currentUserId
          );
        } else {
          filteredAppointment = appointments.filter(
            (app) => app.patient == this.currentUserId
          );
        }
        this.userAppointments = filteredAppointment;
      });
  }
  getTruckAppointments() {
    this.fireStoreCollectionsService
      .getAllTruckAppointments()
      .subscribe((appointments) => {
        let filteredAppointment = [];
        if (
          this.currentUser?.easiMedicFor == "Service Provider" &&
          this.currentUser?.providerType !== "TowTrucks"
        ) {
          filteredAppointment = appointments.filter(
            (app) => app.customerId == this.currentUserId
          );
        } else if (
          this.currentUser?.easiMedicFor == "Service Provider" &&
          this.currentUser?.providerType == "TowTrucks"
        ) {
          filteredAppointment = appointments.filter(
            (app) => app.TruckerId == this.currentUserId
          );
        } else {
          filteredAppointment = appointments.filter(
            (app) => app.customerId == this.currentUserId
          );
        }
        this.towTrucksAppointments = filteredAppointment;
        console.log(filteredAppointment, "id user here " + this.currentUserId);
      });
  }

  fetcUsersMessageUserList(users: IDoctorsInterface[]) {
    const friendDocIds = this.currentUser?.friends;
    console.log("in my list of friends", friendDocIds, users);
    let filteredUsers = users!.filter((x) => friendDocIds?.includes(x.docId));
    console.log("in  list of friends found", filteredUsers);
    this.messagesUserList = filteredUsers;
  }

  private getAllPosts() {
    this.fireStoreCollectionsService.getAllPoststags().subscribe((posts) => {
      // Sort the posts by dateAdded in descending order (most recent first)
      console.warn("All posts here", posts);
      this.originalAllPosts = posts
        .filter((v) => v.post !== "" && v.username !== "" && v.title != "")
        .sort((a, b) => {
          const dateA = new Date(a.datePosted).getTime();
          const dateB = new Date(b.datePosted).getTime();
          return dateB - dateA;
        });
      this.AllPosts = this.originalAllPosts;
    });
  }

  async getNews(): Promise<void> {
    // this.spinnerNews = true;
    this.fireStoreCollectionsService
      .get(
        "https://newsapi.org/v2/top-headlines?country=za&category=health&apiKey=32054b2282e440a2bf45da9fcacb2040",
        {}
      )
      .subscribe((res: any) => {
        console.warn(res["articles"]);
        if (res) {
          this.news = res["articles"];
          setTimeout(() => {
            // this.spinnerNews = false;
          }, 200);
        }
      });
  }

  fetchAllStories() {
    this.fireStoreCollectionsService.getAllStories().subscribe(
      (stories: UserStories[]) => {
        // Update your component property with the fetched stories
        console.warn("this is all the stories", stories);
        this.ListOfStories = stories.filter(
          (x) => x.user != this.currentUserId
        );
        this.CurrentUserStories = stories.filter(
          (x) => x.user == this.currentUserId
        );
      },
      (error) => {
        // Handle errors here, e.g., display an error message to the user or log the error
        console.error("Error fetching stories:", error);
      }
    );

    // this.fireStoreCollectionsService.getTrendingHashtags().subscribe((v)=>{
    //   console.warn(v);
    //   this.hashtags = v
    // })
  }

  getFriendLastMessage() {
    // debugger
    const friendDocIds = this.currentUser!.friends;
    let filteredUsers = this.recommedations!.filter((user) =>
      friendDocIds.includes(user.docId)
    );
    this.UserFriends = filteredUsers;
    // debugger
    if (this.UserFriends!.length) {
      this.UserFriends?.forEach((currentUserFriend) => {
        console.log("hey there");
        this.getMessages(currentUserFriend);
      });
    }
  }

  getMessages(currentUserFriend: IUsersInterface) {
    this.fireStoreCollectionsService
      .getAllMessages()
      .pipe(
        map((data: ChatMessage[]) => {
          console.log(currentUserFriend);
          // Update your local variable or state
          // this.AllMessages = data;
          // Filter and return the messages
          return this.filterMessages(
            data,
            this.currentUserId as string,
            currentUserFriend.docId as string
          );
        })
      )
      .subscribe((messages) => {
        console.log("hey there", messages);

        // Update UserFriends based on messages
        this.UserFriends = this.UserFriends!.map((friend) => {
          const friendMessages = messages.filter((msg) => {
            console.log(
              "friend and msg ids : ",
              friend.docId + " msg id : " + msg.replyTo
            );
            return msg.user._id === friend.docId;
          });
          const lastMessage =
            friendMessages.length > 0
              ? friendMessages[friendMessages.length - 1].text
              : "";
          return {
            ...friend,
            messages: lastMessage,
          };
        });

        console.log("friend data here", this.UserFriends);
      });
  }

  filterMessages(
    messagesList: ChatMessage[],
    userId: string,
    sentToId: string
  ): ChatMessage[] {
    console.warn(
      "messages here ",
      messagesList.filter(
        (message) =>
          message.user._id === this.currentUserId && message.sentTo === sentToId
      )
    );
    return messagesList.filter(
      (message) =>
        (message.user._id === this.currentUserId &&
          message.sentTo === sentToId) ||
        (message.user._id === sentToId && message.sentTo === this.currentUserId)
    );
  }

  fetchCurrentUserFriendsDefault(): IUsersInterface[] {
    const friendDocIds = this.currentUser!.friends;
    // console.warn(friendDocIds)
    const filteredUsers = this.recommedations!.filter((user) =>
      friendDocIds.includes(user.docId)
    );

    // console.log("friends",filteredUsers);
    return filteredUsers;
  }

  fetchCurrentUserFriends(searchTerm: string = ""): IUsersInterface[] {
    const friendDocIds = this.currentUser!.friends;
    console.log("in my list of friends", friendDocIds, this.doctorsList);
    let filteredUsers = this.doctorsList!.filter((user) => {
      console.log("in  list of friends", user.docId);
      friendDocIds.includes(user.docId);
    });
    console.log("in  list of friends found", filteredUsers);

    // Apply additional filtering based on the search term
    if (searchTerm.trim() !== "") {
      const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.username.toLowerCase().includes(lowerCaseSearchTerm) ||
          user.name.toLowerCase().includes(lowerCaseSearchTerm)
      );
    } else {
      filteredUsers = this.doctorsList!.filter((user) =>
        friendDocIds.includes(user.docId)
      );
    }

    console.log("doctors here ", this.doctorsList);
    return filteredUsers;
  }

  fetchUsersByTextSearch(
    searchTerm: string = ""
  ): IUsersInterface[] | undefined {
    const friendDocIds = this.currentUser!.friends;
    let filteredUsers = this.messagesUserList;
    // Apply additional filtering based on the search term
    if (searchTerm.trim() !== "") {
      const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
      filteredUsers = filteredUsers?.filter((user) =>
        user.fullname.toLowerCase().includes(lowerCaseSearchTerm)
      );
    } else {
      filteredUsers = this.OriginalDoctors;
    }

    return filteredUsers;
  }
  fetchDoctorsByTextSearch(searchTerm: string = ""): IDoctorsInterface[] {
    const friendDocIds = this.currentUser!.friends;
    let filteredUsers = this.doctors;
    // Apply additional filtering based on the search term
    if (searchTerm.trim() !== "") {
      const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
      filteredUsers = filteredUsers.filter((user) =>
        user.fullname.toLowerCase().includes(lowerCaseSearchTerm)
      );
    } else {
      filteredUsers = this.OriginalDoctors;
    }

    return filteredUsers;
  }

  onTabSelected(selectedTabTitle: string) {
    // Handle the selected tab's title in the parent component
    console.log("Selected Tab:", selectedTabTitle);
    this.selectedTabTitle = selectedTabTitle;
    switch (selectedTabTitle) {
      case this.MESSAGES:
        this.searchPlaceholder = "Search messages...";
        break;
      case this.DOCTORS:
        this.searchPlaceholder = "Search doctors...";
        break;
      case this.SANGOMA:
        this.searchPlaceholder = "Search sangomas...";
        break;
      case this.POSTS:
        this.searchPlaceholder = "Search posts...";
        break;
      case this.NEWS:
        this.searchPlaceholder = "Search news...";
        break;

      default:
        break;
    }
    // You can perform any further actions with the selected title here.
  }

  openModal($event: IUsersInterface) {
    this.openModalFlag = true;
    this.ModalData = $event;
  }

  closeModal($event: boolean) {
    if ($event == true) {
      this.openModalFlag = false;
    }
  }

  browseFriends() {
    this.router.navigate(["/", "browse-friends"]);
  }

  browseMyMedicalProducts(provider: boolean) {
    this.router.navigate(["/", "browse-friends"], {
      queryParams: {
        showProviderMeds: provider,
      },
    });
  }

  navigateTotrending() {
    this.router.navigate(["/", "trending"]);
  }

  navigateToFriendRequests() {
    this.router.navigate(["/", "friend-requests"]);
  }

  AddPost() {
    this.router.navigate(["/", "add-post"]);
  }
  addStoryNavigation() {
    this.router.navigate(["/", "add-story"]);
  }
  messagingNavigation(friend: IUsersInterface) {
    this.router.navigate(["/", "messaging"], {
      queryParams: {
        friendData: JSON.stringify(friend),
      },
    });
  }

  toggleVisibility(visibility: string) {
    if (visibility == "show") {
      this.showRecommendations = true;
      this.hide = true;
    } else {
      this.showRecommendations = false;
      this.hide = false;
    }
  }

  toggleVisibilityExpandable1() {
      this.showExpandable1 = !this.showExpandable1;
  }
  toggleVisibilityExpandable2() {
      this.showExpandable2 = !this.showExpandable2;
  }

  toggleAdsVisibility(visibility: string) {
    if (visibility == "show") {
      this.showAds = true;
      this.hideAds = true;
    } else {
      this.showAds = false;
      this.hideAds = false;
    }
  }

  search(val: string) {
    const searchText = val.toLowerCase();

    switch (this.selectedTabTitle) {
      case this.MESSAGES:
        // Filter currentUser!.friends based on search text
        this.messagesUserList = this.fetchUsersByTextSearch(searchText);
        break;
      case this.DOCTORS:
        // Filter currentUser!.friends based on search text
        this.doctors = this.fetchDoctorsByTextSearch(searchText);
        break;
      case this.SANGOMA:
        // Filter currentUser!.friends based on search text
        this.UserFriends = this.fetchCurrentUserFriends(searchText);
        break;
      case this.POSTS:
        // Filter AllPosts based on search text
        const trimmedSearchText = searchText.toLowerCase().trim();

        // If the search term is empty, restore the original list
        if (!trimmedSearchText) {
          this.AllPosts = this.originalAllPosts;
          return;
        }

        // Filter posts based on the search term
        const filteredPosts = this.originalAllPosts?.filter((post) => {
          const trimmedTitle = post.title.toLowerCase().trim();

          // Only filter when there is a non-empty search query
          return (
            trimmedSearchText.length > 0 &&
            (trimmedTitle.includes(trimmedSearchText) ||
              trimmedTitle == trimmedSearchText)
          );
        });

        this.AllPosts = filteredPosts;
        break;
      case this.NEWS:
        // Filter NewsArticles based on search text
        const SearchText = searchText.toLowerCase().trim();

        // If the search term is empty, restore the original list
        if (!SearchText) {
          this.NewsArticles = this.OriginalNewsArticles;
          return;
        }

        // Filter posts based on the search term
        const filteredNews = this.originalAllPosts?.filter((article) => {
          const trimmedNewsTitle = article.title.toLowerCase().trim();

          // Only filter when there is a non-empty search query
          return (
            SearchText.length > 0 &&
            (trimmedNewsTitle.includes(SearchText) ||
              trimmedNewsTitle == SearchText)
          );
        });

        this.NewsArticles = filteredNews;
        break;
      default:
        break;
    }
  }

  addNewFriend(userNumber: string) {
    this.fireStoreCollectionsService
      .addFriend(this.currentUserId as string, userNumber)
      .subscribe((val) => {
        alert(val);
      });
  }

  MessageUser(friend: IUsersInterface) {
    this.router.navigate(["/", "messaging"], {
      queryParams: {
        friendData: JSON.stringify(friend),
      },
    });
  }

  MoreUserDetails(user: IUsersInterface) {}

  addNewFriendRequest(userId: string, userNumber: string) {
    this.friendRequestUserId = userId;
    this.friendRequestUserNumber = userNumber;
    this.fireStoreCollectionsService
      .addFriend(this.currentUserId as string, userNumber)
      .subscribe((val) => {
        // alert(val);
      });
    this.fireStoreCollectionsService
      .addFriend(userId, userNumber)
      .subscribe((val) => {
        // alert(val);
      });
  }

  confirmFriendRequest() {
    this.addNewFriendRequest(
      this.friendRequestUserId,
      this.friendRequestUserNumber
    );
    this.alertService.success(
      "Friend requested successully sent to " + this.friendRequestUserNumber
    );
  }

  ViewStories(data: UserStories) {
    console.log(data);
    this.router.navigate(["/", "view-stories"], {
      queryParams: {
        storiesData: JSON.stringify(data),
      },
    });
  }

  userProfileNavigation(friend: IUsersInterface) {
    this.router.navigate(["friend-profile"], {
      queryParams: {
        friendData: JSON.stringify(friend),
        usersList: JSON.stringify(this.recommedations),
      },
    });
  }

  navigateToPromoteItem() {
    this.router.navigate(["promote-item"]);
  }

  requestPermissionAndToken(): void {
    this.afMessaging.requestPermission
      .pipe(
        switchMap(() => this.afMessaging.getToken),
        tap((token) => {
          // Handle the obtained token (e.g., send it to your server)
          console.log("FCM Token:", token);
          this.userNotificationTokenUpdate(token);
        }),
        catchError((error) => {
          console.error("Error requesting permission or token:", error);
          return [];
        })
      )
      .subscribe();
  }

  userNotificationTokenUpdate(token: string | null) {
    this.fireStoreCollectionsService.updateCurrentUserNotificationToken(
      token,
      this.currentUserId as string
    );
  }

  sendPushNotifications(user: IUsersInterface, title: string, body: string) {
    this.fireStoreCollectionsService.sendPushNotification(user, title, body);
  }

  ViewPosts(post: IMedicalPosts) {
    const navigationExtras: NavigationExtras = {
      state: {
        data: post,
      },
    };

    console.log(post);
    this.fireStoreCollectionsService
      .addUserIdToViewedByRealTime(post.docId, this.currentUserId as string)
      .subscribe({
        next: () => {
          console.log("Transaction successful");
        },
        error: (err) => {
          console.error("Error during transaction:", err);
        },
      });

    this.router.navigate(["post-details"], {
      queryParams: {
        title: post.title,
        comments: post.comments,
        datePosted: post.datePosted,
        likedBy: post.likedBy,
        likes: post.likes,
        originalPost: post.originalPost,
        post: post.post,
        postImage: post.postImage,
        image: post.image,
        postVideo: post.postVideo,
        user: post.user,
        userImage: post.userImage,
        username: post.username,
        viewedBy: post.viewedBy,
        docId: post.docId,
      },
    });
  }

  navigateToChat(doctor: IDoctorsInterface) {
    this.router.navigate(["/", "messaging"], {
      queryParams: {
        friendData: JSON.stringify(doctor),
      },
    });
  }

  AddMedicalProduct() {
    //here we will open a popup directly
    this.showProductModal = true;
    this.fetchMedicalProductDetails();
  }

  fetchMedicalProductDetails() {
    this.MedicalProductNameFormControl.valueChanges.subscribe((x) => {
      this.medicalProductName = x;
    });
    this.MedicalProductPriceFormControl.valueChanges.subscribe((x) => {
      this.medicalProductPrice = x;
    });
    this.MedicalProductDescriptionFormControl.valueChanges.subscribe((x) => {
      this.medicalProductDescription = x;
    });
  }

  hideModal() {
    this.showProductModal = false;
  }

  uploadMedicalProduct() {
    const medicalProductDetails: IMedicalProduct = {
      name: this.medicalProductName,
      category: "this.medicalProductCategory",
      description: this.medicalProductDescription,
      doctor: this.currentUser?.docId as string,
      image: this.selectedImageString,
      price: this.medicalProductPrice,
      doctorName: this.currentUser?.name
        ? this.currentUser?.name
        : this.currentUser?.fullname,
    };
    this.fireStoreCollectionsService
      .uploadMedicalProduct(medicalProductDetails)
      .subscribe((x) => {
        console.log(x);
        this.hideModal();
      });
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

  showTruckAppointMessage() {
    this.alertService.success("Appointment has successfully been booked ");
  }

  callUser(phone: string) {
    window.open("tel:" + phone);
  }

  bookTruckAppointmentShow(item: ITowTrucks) {
    this.showBookTowTruckModal = true;
    this.towTruckbooking = item;
}

  confirmBookTruckAppointmentShow() {
    console.log("let us see"+this.towTruckbooking.docId)  
      this.showAppointmentNotification = false;
      const appointment = <ITruckAppointment>{
        Truckerimage: this.towTruckbooking.image,
        customerImage:this.currentUser?.image,
        customerName:this.currentUser?.fullname ? this.currentUser?.fullname : this.currentUser?.name,
        customerPhone:this.currentUser?.phone,
        TruckName:this.towTruckbooking.name + ' ' + this.towTruckbooking.surname,
        TruckPhone:this.towTruckbooking.phone ? this.towTruckbooking.phone : this.towTruckbooking.cellnumber,
        TruckerId:this.towTruckbooking.docId,
        customerId:this.currentUser?.docId,
        status:"Pending",
        created:moment().format('DD-MM-YYYY HH:mm:ss')
        }
     this.fireStoreCollectionsService.uploadTruckAppointment(appointment).subscribe(x=>{
       setTimeout(() => {
         this.showAppointmentNotification = false;
         this.showBookTowTruckModal = false;
         this.alertService.success("Your TowTruck Appointment has successfully been booked ");
      }, 2000);
     })
}

dismiss(){
  this.showBookTowTruckModal = false;
}
}
