import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-type-of-user',
  templateUrl: './choose-type-of-user.component.html',
  styleUrls: ['./choose-type-of-user.component.scss']
})
export class ChooseTypeOfUserComponent {
  constructor(private router:Router){

  }
  selectUserFormControl: FormControl = new FormControl();
  selectedOption: string | null = null;
  options = [
    { id: 'General user', label: 'General user' },
    { id: 'Service Provider', label: 'Service Provider' },
  ];

  onOptionChange(optionId: string): void {
    this.selectedOption = optionId;
    console.log(optionId)
  }

  navigateTo(pathName: string): void {
    // localStorage.setItem('user-type', JSON.stringify(this.selectedOption));

    this.router.navigate([`authentication/${pathName}`], {
      queryParams: {
        userType: this.selectedOption,
      },
    });
  }
}
