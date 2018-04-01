import { Injectable } from '@angular/core';
import { Card } from '../classes/card';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class DeckService {
  public deck: Card[];
  public deckLength: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  public resetDeck() {
    // this arrays are fixed, no need to complicate
    const cardValues = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const cardSuits = ['hearts', 'spades', 'diamonds', 'clubs'];

    this.deck = [];

    cardSuits.map((s) => cardValues.map((v) => this.deck.push(new Card(s, v))));
    this.updateSubject();
  }

  public shuffle() {
    // still usign Fisher-Yates Shuffle as it works good
    let currentIndex = this.deck.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = this.deck[currentIndex];
        this.deck[currentIndex] = this.deck[randomIndex];
        this.deck[randomIndex] = temporaryValue;
    }
  }

  public dealCard(): Card {
    // Just return a card from the top of the deck
    const card = this.deck.pop();
    this.updateSubject();
    return card;
  }

  private updateSubject() {
    this.deckLength.next(this.deck.length);
  }

  public getDeckLenght(): Observable<number> {
    return this.deckLength.asObservable();
  }

}
