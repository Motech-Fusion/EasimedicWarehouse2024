import { Component, Input, OnInit } from "@angular/core";
import { IUsersInterface } from "../Interfaces/IUsersInterface";
import { FireStoreCollectionsServiceService, ITruckAppointment } from "../Services/fire-store-collections-service.service";

@Component({
  selector: "app-appointment-list",
  templateUrl: "./appointment-list.component.html",
  styleUrls: ["./appointment-list.component.scss"],
})
export class AppointmentListComponent implements OnInit {
  @Input() appointments!: any[];
  @Input() currentUser!: IUsersInterface | null;
  currentDate: Date = new Date();
  @Input() towTrucksAppointments: ITruckAppointment[] = [];

  constructor(
    private fireStoreCollectionsService: FireStoreCollectionsServiceService
  ) {}
  ngOnInit(): void {
    // this.getTruckAppointments()
  }


  declineAppointment(docId: string | undefined) {
    const docuId = docId as string;
    this.fireStoreCollectionsService
      .declineAppointment(docuId)
      .subscribe((x) => {});
  }

  declineTruckAppointment(docId: string | undefined) {
    const docuId = docId as string;
    this.fireStoreCollectionsService
      .declineTruckAppointment(docuId)
      .subscribe((x) => {});
  }

  ApproveAppointment(docId: string | undefined) {
    const docuId = docId as string;
    this.fireStoreCollectionsService
      .ApproveAppointment(docuId)
      .subscribe((x) => {});
  }

  ApproveTruckAppointment(docId: string | undefined) {
    const docuId = docId as string;
    this.fireStoreCollectionsService
      .ApproveAppointment(docuId)
      .subscribe((x) => {});
  }
}
