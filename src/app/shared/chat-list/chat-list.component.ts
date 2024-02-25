import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IDoctorsInterface, IUsersInterface } from '../Interfaces/IUsersInterface';
import { ChatMessage } from '../Services/fire-store-collections-service.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent {
@Input() friends:IUsersInterface[] | undefined;
@Output() chatEmitter = new EventEmitter<IUsersInterface>();
@Input() currentUserId!: string | null;
@Input() recommedations: IUsersInterface[] = [];
@Input() messages: ChatMessage[] = [];

startChatting(friend:IUsersInterface){
  this.chatEmitter.emit(friend);
}

getLastMessage(friendDocId: string): string {
  debugger
  // Filter messages based on the currentUserFriend
  const messages = this.filterMessages(this.messages, this.currentUserId as string, friendDocId);

  // Find the last message for the friend
  const lastMessage = messages.length  > 0  ? messages[messages.length - 1].text : '';

  return lastMessage;
}

filterMessages(messagesList: ChatMessage[], userId: string, sentToId: string): ChatMessage[] {
  // Filter messages based on user IDs and sentTo IDs
  const messages = messagesList.filter(message => 
    (message.user._id === userId && message.sentTo === sentToId) ||
    (message.user._id === sentToId && message.sentTo === userId)
  );

  console.warn("messages here ", messages); // Log filtered messages for debugging

  return messages;
}

}
