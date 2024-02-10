import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {
  @Output() tabSelected: EventEmitter<string> = new EventEmitter<string>();
  selectedTab: string = 'Chats';
  @Input() backgroundColor:string = "#f9f9f9"

  onTabSelected(title: string) {
    this.tabSelected.emit(title);
    this.selectedTab = title;
  }
}
