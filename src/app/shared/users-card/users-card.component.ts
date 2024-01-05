import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPosts } from '../Interfaces/IPosts';
import { IDoctorsInterface, IUsersInterface } from '../Interfaces/IUsersInterface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-card',
  templateUrl: './users-card.component.html',
  styleUrls: ['./users-card.component.scss']
})
export class UsersCardComponent implements OnInit{
  @Input() userItem!:IDoctorsInterface;
  @Input() doctorsList!:IDoctorsInterface[];
  @Output() ViewHustle = new EventEmitter<IUsersInterface>();
  @Output() chatEmitter = new EventEmitter<IDoctorsInterface>();
  
constructor(private router:Router){
  
}
  ngOnInit(): void {
    console.log("here we are",this.userItem)
  }
  
  chatWithDoctor(doc: IDoctorsInterface) {
  this.chatEmitter.emit(doc)
  }
  getParagraphs(text: string, charLimit: number): string[] {
    const paragraphs: string[] = [];
    let currentParagraph = '';
  
    text.split(' ').forEach((word) => {
      if ((currentParagraph + ' ' + word).length <= charLimit) {
        // Add the word to the current paragraph
        currentParagraph += (currentParagraph.length > 0 ? ' ' : '') + word;
      } else {
        // Start a new paragraph
        paragraphs.push(currentParagraph);
        currentParagraph = word;
      }
    });
  
    // Add the last paragraph
    if (currentParagraph.length > 0) {
      paragraphs.push(currentParagraph);
    }
  
    return paragraphs;
  }
  
  isHashtag(word: string): boolean {
    return word.startsWith('#') && !word.includes('#', 1); // Check if the word starts with '#' and doesn't contain another '#' after the first character
  }
  
  isURL(word: string): boolean {
    return word.startsWith('http://') || word.startsWith('https://');
  }
  
  openUrl(url:string){
    window.open(url)
      }
  
  ViewDetails(PostDetails: IDoctorsInterface) {
    console.log(PostDetails)
    this.ViewHustle.emit(PostDetails);
  }
  
  
  getRandsFromParagraphs(text: string, charLimit: number): string[] {
    // Check if the entire text matches the South African currency format
    if (this.isSouthAfricanCurrency(text)) {
      return [text];
    }
  
    const paragraphs: string[] = [];
    let currentParagraph = '';
  
    text.split(' ').forEach((word) => {
      if ((currentParagraph + ' ' + word).length <= charLimit) {
        // Check if the word is a South African currency format
        if (this.isSouthAfricanCurrency(word)) {
          // Add the currency word as the only paragraph
          paragraphs.push(word);
          currentParagraph = '';
        } else {
          // Add the word to the current paragraph
          currentParagraph += (currentParagraph.length > 0 ? ' ' : '') + word;
        }
      } else {
        // Start a new paragraph
        paragraphs.push(currentParagraph);
        currentParagraph = word;
      }
    });
  
    // Add the last paragraph
    if (currentParagraph.length > 0) {
      paragraphs.push(currentParagraph);
    }
  
    return paragraphs;
  }
  
  isSouthAfricanCurrency(word: string): boolean {
    // Check if the word matches the South African currency format (e.g., R200.00 or R 200.00)
    return /^R(\s?\d{1,3}(,\d{3})*(\.\d{2})?)$/.test(word);
  }



  viewDocDetails(friend: IDoctorsInterface) {
    this.router.navigate(['friend-profile'], {
      queryParams: {
        friendData: JSON.stringify(friend),
        usersList:JSON.stringify(this.doctorsList)
      },
    });
  }
  // viewDocDetails(post:IDoctorsInterface){

  //   this.router.navigate(['friend-profile'], {
  //     queryParams: {
  //       friendData: JSON.stringify(post),
  //       usersList:JSON.stringify(this.recommedations)
  //     },
  //   });
  //   this.router.navigate(['view-ads-details'],{queryParams:{
  //     title:post.title,
  //     comments:post.comments,
  //     datePosted:post.datePosted,
  //     likedBy:post.likedBy,
  //     likes:post.likes,
  //     originalPost:post.originalPost,
  //     post:post.post,
  //     postImage:post.postImage,
  //     postVideo:post.postVideo,
  //     user:post.user,
  //     userImage:post.userImage,
  //     username:post.username,
  //     viewedBy:post.viewedBy,
  //     docId:post.docId,
  //   }})
  // }
  }
  