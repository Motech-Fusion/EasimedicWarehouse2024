import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IUsersInterface } from 'src/app/shared/Interfaces/IUsersInterface';
import { AlertService } from 'src/app/shared/Services/alert.service';
import { FireStoreCollectionsServiceService, IMedicalProduct } from 'src/app/shared/Services/fire-store-collections-service.service';
import { UserState } from 'src/app/shared/State/user.reducer';
import { selectDocId } from 'src/app/shared/State/user.selectors';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.scss'],
})
export class AddFriendComponent {
  recommedations: IMedicalProduct[] = [];
  originalRecommendations: IMedicalProduct[] = [];
  ModalData!: IMedicalProduct;
  openModalFlag!: boolean;
  currentUserId!: string | null;
showProductModal: boolean = false;
  productPrice!: number;
  productDescription!: string;
  productName!: string;
;

  constructor(
    private fireStoreCollectionsService: FireStoreCollectionsServiceService,
    private router: Router,
    private store: Store<UserState>,
    private alertService: AlertService
  ) {}
  ngOnInit(): void {
    this.store.select(selectDocId).subscribe((id) => {
      this.currentUserId = id;
      console.log('Current user id:', this.currentUserId);
    });
    this.fireStoreCollectionsService.getMedicalProducts().subscribe((users) => {
      console.log('users here', users);
      this.recommedations = users
      this.originalRecommendations = users.filter(
        (userValue) => userValue.price
      )
      return (this.recommedations = this.originalRecommendations);
    });

  }

  openModal($event: IMedicalProduct) {
    this.openModalFlag = true;
    this.ModalData = $event;
  }

  addNewFriend(userId: string, userNumber: string) {
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
    this.alertService.success(
      'Friend requested successully sent to ' + userNumber
    );
  }

  searchFriends(value: string) {
    const searchTerm = value.toLowerCase();
  
    // If the search term is empty, restore the original list
    if (!searchTerm) {
      this.recommedations = this.originalRecommendations;
      return;
    }
  
    // Filter recommendations based on the search term
    const filteredRecommendations = this.originalRecommendations?.filter((recommendation) => {
      return (
        recommendation.name.toLowerCase().includes(searchTerm) ||
        recommendation.name.toLowerCase().includes(searchTerm)
      );
    });
  
    this.recommedations = filteredRecommendations;
  }

  userProfileNavigation(item: IMedicalProduct) {
    // this.router.navigate(['friend-profile'], {
      this.showProductModal = true;
      this.productName = item.name;
      this.productDescription = item.description;
      this.productPrice = item.price;
    //   queryParams: {
    //     friendData: JSON.stringify(friend),
    //     usersList:JSON.stringify(this.recommedations)
    //   },
    // });
  }

  hidePhoneNumber(phone: string): string {
    if (phone.length !== 12) {
      // If the phone number is not in the expected format, return it as is
      return phone;
    }

    // Replace characters from the 5th to the 10th position with '*'
    const obscuredPhoneNumber =
      phone.substring(0, 4) + '******' + phone.substring(10);

    return obscuredPhoneNumber;
  }

  hideModal(){
    this.showProductModal = false;
  }
}
