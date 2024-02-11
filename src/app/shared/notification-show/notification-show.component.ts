import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification-show',
  templateUrl: './notification-show.component.html',
  styleUrls: ['./notification-show.component.scss']
})
export class NotificationShowComponent {
@Input() message: any;
@Input() buttonText: any;
@Input() successNotification = false;
@Input() errorNotification = false;

}
