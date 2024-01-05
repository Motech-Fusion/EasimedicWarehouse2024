import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-period-tracker',
  templateUrl: './period-tracker.component.html',
  styleUrls: ['./period-tracker.component.scss']
})
export class PeriodTrackerComponent implements OnInit{

  fertileFrom!: any;
  fertileUntil!: any;
  dueDate!: any;
  calcReturned: boolean = false;
  cycleSelected!: number;
  days: Array<number> = [
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
    39, 40,
  ];
  @ViewChild('datePicker') datePicker!: ElementRef;
  fullDate: string = '';
  myMoment!: moment.Moment;
  periodDate = new FormControl();
  setperiodDate!: any;
  isCalculating: boolean = false;
  userImage: any;
  username: any;
  loggedInUserUID!: string;
  userUID!: string;
  userAvailability: any;
  userEmail: any;
  defaultTransform: any;
  slider: any;
  selectControl = new FormControl('Select number of days');
  selectedNumberOfDays!: any;
  
  ngOnInit(): void {
    this.slider = document.getElementById('slider');
    this.defaultTransform = 0;
    this.periodDate.valueChanges.subscribe((value: any) => {
      this.setperiodDate = value;
      console.log(value);
      // alert(value);
    });
  }
  selectChange(event: Event) {
    console.log(this.selectControl);
    this.selectedNumberOfDays = this.selectControl;
  }

  updateDay(arg0: number) {
    throw new Error('Method not implemented.');
  }

  callAllFunctions() {
    this.isCalculating = true;
    this.startCalc();
    this.calculateFertileBegin();
    this.calculateFertileEnds();
    this.calculateDueDate();
  }

  calculateDueDate() {
    let fullDate = this.setperiodDate;
    this.cycleSelected = this.selectedNumberOfDays;
    if (this.cycleSelected === 28) {
      this.dueDate = moment(fullDate, 'YYYYMMDD')
        .add(280, 'days')
        .format('MMMM Do YYYY');
    } else {
      this.dueDate = moment(fullDate, 'YYYYMMDD')
        .add(this.cycleSelected - 28 + 280, 'days')
        .format('MMMM Do YYYY');
    }
  }

  // calculateFertileBegin() {
  //   throw new Error('Method not implemented.');
  // }

  calculateFertileBegin() {
    // this.calcDate();
    let fullDate = this.setperiodDate;
    if (this.cycleSelected === 28) {
      this.fertileFrom = moment(fullDate, 'YYYYMMDD')
        .add(12, 'days')
        .format('MMMM Do YYYY');
    } else {
      this.fertileFrom = moment(fullDate, 'YYYYMMDD')
        .add(this.cycleSelected - 28 + 12, 'days')
        .format('MMMM Do YYYY');
    }
  }

  calculateFertileEnds() {
    //this.calcDate(); is called from calculateFertileBegin
    let fullDate = this.setperiodDate;
    if (this.cycleSelected === 28) {
      this.fertileUntil = moment(fullDate, 'YYYYMMDD')
        .add(16, 'days')
        .format('MMMM Do YYYY');
    } else {
      this.fertileUntil = moment(fullDate, 'YYYYMMDD')
        .add(this.cycleSelected - 28 + 16, 'days')
        .format('MMMM Do YYYY');
    }
  }

  startCalc() {
    this.calcReturned = true;
  }
  resetCalc() {
    this.isCalculating = false;
    this.calcReturned = false;
  }
}
