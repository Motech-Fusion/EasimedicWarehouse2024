import { Component, Input, OnInit } from "@angular/core";
import { IUsersInterface } from "../Interfaces/IUsersInterface";

@Component({
  selector: "app-appointment-list",
  templateUrl: "./appointment-list.component.html",
  styleUrls: ["./appointment-list.component.scss"],
})
export class AppointmentListComponent implements OnInit {
  @Input() appointments!: any[];
  @Input() currentUser!: IUsersInterface | null;
  currentDate: Date = new Date();
  ngOnInit(): void {
    // alert(JSON.stringify(this.appointments))
  }
}
