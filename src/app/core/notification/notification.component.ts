import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IUsersInterface } from 'src/app/shared/Interfaces/IUsersInterface';
import { FireStoreCollectionsServiceService, IAppointment, ITruckAppointment } from 'src/app/shared/Services/fire-store-collections-service.service';
import { UserState } from 'src/app/shared/State/user.reducer';
import { selectDocId } from 'src/app/shared/State/user.selectors';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  recommedations: IUsersInterface[] | undefined;
  ModalData!: IUsersInterface;
  openModalFlag!: boolean;
  currentUserId!: string | null;
  notification:number = 0
  currentUser!: IUsersInterface;
  userAppointments: IAppointment[] = [];
  towTrucksAppointments: ITruckAppointment[] = [];
  
  constructor(
    private fireStoreCollectionsService: FireStoreCollectionsServiceService,
    private router: Router,
    private store:Store<UserState>
  ) {}
  ngOnInit(): void {
    this.fireStoreCollectionsService.getAllUsers().subscribe((users) => {
      console.log('users here', users);
      this.currentUser = users.filter((x) => x.docId == this.currentUserId)[0];
      return (this.recommedations = users.filter(userValue => userValue.username && userValue.name));
    });
    
    this.store.select(selectDocId).subscribe((id) => {
      this.currentUserId = id;
      console.log('Current user id:', this.currentUserId);
    });

    this.scrollToTop();
    this. fetchAppointments();
    this. getTruckAppointments();
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  openModal($event: IUsersInterface) {
    this.openModalFlag = true;
    this.ModalData = $event
     }

     fetchAppointments() {
      this.fireStoreCollectionsService.getAllAppointments().subscribe(appointments=>{
        let filteredAppointment = [];
        if(this.currentUser?.easiMedicFor == 'Service Provider'){
          filteredAppointment = appointments.filter(app => app.doctor == this.currentUserId);
        }else{
          filteredAppointment = appointments.filter(app => app.patient == this.currentUserId);
        }
        this.userAppointments = filteredAppointment;
      })
    }

    getTruckAppointments() {
      this.fireStoreCollectionsService.getAllTruckAppointments().subscribe(appointments=>{
        let filteredAppointment = [];
        if(this.currentUser?.easiMedicFor == 'Service Provider' && this.currentUser?.providerType !== "TowTrucks"){
          filteredAppointment = appointments.filter(app => app.customerId == this.currentUserId);
        } else if(this.currentUser?.easiMedicFor == 'Service Provider' && this.currentUser?.providerType == "TowTrucks"){
          filteredAppointment = appointments.filter(app => app.TruckerId == this.currentUserId);
        }else{
          filteredAppointment = appointments.filter(app => app.customerId == this.currentUserId);
        }
        this.towTrucksAppointments = filteredAppointment;
        console.log(filteredAppointment,"id user here "+ this.currentUserId);
      })
    }
    
    cancelAppointment(docId: string|undefined) {
      const docuId = docId as string
    this.fireStoreCollectionsService.declineAppointment(docuId).subscribe(x=>{
    })
    }

    cancelTruckAppointment(docId: string|undefined) {
      const docuId = docId as string
    this.fireStoreCollectionsService.declineTruckAppointment(docuId).subscribe(x=>{
    })
    }
}
