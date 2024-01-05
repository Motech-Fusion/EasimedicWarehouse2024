import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-appointment-dialog',
  templateUrl: './appointment-dialog.component.html',
  styleUrls: ['./appointment-dialog.component.scss']
})
export class AppointmentDialogComponent implements OnInit{
  @Output() closeModalEmitter = new EventEmitter<any>();
  @Output() bookAppointmentModalEmitter = new EventEmitter<any>();
PatientContentFormControl:  FormControl = new FormControl();
PatientPhoneContentFormControl:  FormControl = new FormControl();
PatientDescriptionContentFormControl:  FormControl = new FormControl();
PatientLastNameContentFormControl:  FormControl = new FormControl();
PatientIDContentFormControl:  FormControl = new FormControl();
PatientCategoryContentFormControl:  FormControl = new FormControl();
  @Input() category: string = '';
  @Input() Id: string = '';
  @Input() lastName: string = '';
  @Input() decscription: string = '';
  @Input() phone: string = '';
  @Input() name: string = '';
PatientAppointmentDateContentFormControl:FormControl = new FormControl();
  appointmentDate: string = '';


ngOnInit() {
  // Add value change listeners
  this.PatientContentFormControl.valueChanges.subscribe((value:string) => {
    console.log('PatientContentFormControl changed:', value);
    this.name = value
    // Do something with the changed value
  });

  this.PatientPhoneContentFormControl.valueChanges.subscribe((value:string) => {
    console.log('PatientPhoneContentFormControl changed:', value);
    this.phone = value
    // Do something with the changed value
  });

  this.PatientDescriptionContentFormControl.valueChanges.subscribe((value:string) => {
    console.log('PatientDescriptionContentFormControl changed:', value);
    // Do something with the changed value
    this.decscription = value
  });

  this.PatientLastNameContentFormControl.valueChanges.subscribe((value:string) => {
    console.log('PatientLastNameContentFormControl changed:', value);
    this.lastName = value
    // Do something with the changed value
  });

  this.PatientIDContentFormControl.valueChanges.subscribe((value:string) => {
    console.log('PatientIDContentFormControl changed:', value);
    this.Id = value
    // Do something with the changed value
  });

  this.PatientCategoryContentFormControl.valueChanges.subscribe((value:string) => {
    console.log('PatientCategoryContentFormControl changed:', value);
    this.category = value
    // Do something with the changed value
  });
  this.PatientAppointmentDateContentFormControl.valueChanges.subscribe((value:string) => {
    console.log('PatientCategoryContentFormControl changed:', value);
    this.appointmentDate = value
    // Do something with the changed value
  });
}

closeModal() {
  this.closeModalEmitter.emit()
  }

  bookAppointment() {
    const appointmentDetails = {
      name:this.name,
      lastName:this.lastName,
      category:this.category,
      decscription:this.decscription,
    }
   this.bookAppointmentModalEmitter.emit(appointmentDetails)
    }
}
