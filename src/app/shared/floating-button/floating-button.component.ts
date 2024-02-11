import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-floating-button',
  templateUrl: './floating-button.component.html',
  styleUrls: ['./floating-button.component.scss'],
})
export class FloatingButtonComponent {
  isMenuOpen = false;
  @Input() showProviderOptionButtons = false;
  @Output() AddPostEmitter = new EventEmitter<unknown>();
  @Output() AddMedicalProductEmitter = new EventEmitter<unknown>();

  openMenu() {
    this.isMenuOpen = true;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  AddPost(){
    this.AddPostEmitter.emit()
  }

  addMedicalProduct(){
    this.AddMedicalProductEmitter.emit()
  }
}
