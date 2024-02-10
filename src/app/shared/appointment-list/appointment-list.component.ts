import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent implements OnInit {
  @Input() appointments!:any[];

  ngOnInit(): void {
    // alert(JSON.stringify(this.appointments))
  }
}
