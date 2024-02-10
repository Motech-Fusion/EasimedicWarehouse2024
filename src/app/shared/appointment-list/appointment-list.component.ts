import { Component, Input, OnInit } from "@angular/core";
import { IUsersInterface } from "../Interfaces/IUsersInterface";
import { FireStoreCollectionsServiceService } from "../Services/fire-store-collections-service.service";

@Component({
  selector: "app-appointment-list",
  templateUrl: "./appointment-list.component.html",
  styleUrls: ["./appointment-list.component.scss"],
})
export class AppointmentListComponent implements OnInit {
  @Input() appointments!: any[];
  @Input() currentUser!: IUsersInterface | null;
  currentDate: Date = new Date();

  constructor(private fireStoreCollectionsService:FireStoreCollectionsServiceService){

  }
  ngOnInit(): void {
    // alert(JSON.stringify(this.appointments))
  }


    declineAppointment(docId: string|undefined) {
      const docuId = docId as string
    this.fireStoreCollectionsService.declineAppointment(docuId).subscribe(x=>{
    })
  }

  ApproveAppointment(docId: string|undefined) {
      const docuId = docId as string
    this.fireStoreCollectionsService.ApproveAppointment(docuId).subscribe(x=>{
    })
  }
}
