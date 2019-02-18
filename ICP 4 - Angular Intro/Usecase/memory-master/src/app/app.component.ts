import { Component, NgModule } from '@angular/core';
import { browser, element } from 'protractor';
import { Cards } from './cards';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  public cards: Array<{name: string, icon: string, answer: string, border: string, imagesrc: string, imageAnswersrc: string}> = [];
  cardArrayUsedNumbers: Array<{id: number, icon: string}> = [];
  amountOfCards: number = 8;
  activeCard1: any;
  activeCard2: any;
  currentClick: number;


  constructor() {

      //Define game plan
      for(var i = 0; i <this.amountOfCards ; i++){
        this.cards.push({name: 'card', icon: 'cloud', answer: 'cloud', border: 'fa-border',imagesrc: '../assets/images/questionmark.png', imageAnswersrc: '../assets/images/questionmark.png'});
      }

      //Add pairs
      this.addPair('../assets/images/42686-umbrella-with-rain-drops-icon.png');
      this.addPair('../assets/images/tiger.png');
      this.addPair('../assets/images/Car-Right-Red-icon.png');
      this.addPair('../assets/images/ballon-icon.png');
  }

  isUsed(n)
  {
    if(this.cards[n].imageAnswersrc == '../assets/images/questionmark.png')
      return false;
    else
      return true;
  }

  addPair(icon)
  {
    var pair1 = Math.floor(Math.random() * this.amountOfCards);
    while(this.isUsed(pair1)==true)
    {
      pair1 = Math.floor(Math.random() * this.amountOfCards);
    }
    this.cards[pair1].imageAnswersrc = icon;

    var pair2 = Math.floor(Math.random() * this.amountOfCards);
    while(this.isUsed(pair2)==true)
    {
      pair2 = Math.floor(Math.random() * this.amountOfCards);
    }
    this.cards[pair2].imageAnswersrc = icon;
  }

  checkAnswer(i)
  {
    if(this.activeCard1 == null && i != this.currentClick || (this.activeCard1 != null && this.activeCard2 == null && i != this.currentClick))
    {
      if(this.activeCard1 == null)
      {
        this.activeCard1 = this.cards[i];
        this.activeCard1.imagesrc = this.activeCard1.imageAnswersrc;
      }
      else
      {
        this.activeCard2 = this.cards[i];
        this.activeCard2.imagesrc = this.activeCard2.imageAnswersrc;
      }
  
      if(this.activeCard1 != null && this.activeCard2 !=null)
      {
        if(this.activeCard1.imageAnswersrc == this.activeCard2.imageAnswersrc)
        {
          this.sleepAndDelete(this.activeCard1,this.activeCard2);
        }
        else{
          this.sleepAndReset(this.activeCard1,this.activeCard2);
        }
        this.activeCard1 = null;
        this.activeCard2 = null;
      }
      this.currentClick = i;
    }
 }

 sleepAndReset(card1, card2)
 {
  setTimeout( () => {
    card1.imagesrc = '../assets/images/questionmark.png';
    card2.imagesrc = '../assets/images/questionmark.png';
   }, 1000 );
 }

 sleepAndDelete(card1, card2)
 {
  setTimeout( () => {
    card1.imagesrc = '../assets/images/blank.png';
    card1.border = null;
    card1.imageAnswersrc = null;
    card2.imagesrc = '../assets/images/blank.png';
    card2.border = null;
    card2.imageAnswersrc = null;
   }, 1000 );
 }
}