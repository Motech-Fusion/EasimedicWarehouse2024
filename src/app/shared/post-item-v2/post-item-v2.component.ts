import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IMedicalPosts, IPosts } from '../Interfaces/IPosts';

@Component({
  selector: 'app-post-item-v2',
  templateUrl: './post-item-v2.component.html',
  styleUrls: ['./post-item-v2.component.scss']
})
export class PostItemV2Component {
  @Input() postItem!:IMedicalPosts;
  @Output() ViewHustle = new EventEmitter<IMedicalPosts>();
  

  ngOnInit(): void {
    console.log("here we are",this.postItem)
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
  
  ViewDetails(PostDetails: IMedicalPosts) {
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
  }
  