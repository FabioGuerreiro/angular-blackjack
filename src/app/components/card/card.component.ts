import { Component, OnInit, Input } from '@angular/core';
import { Card } from '../../classes/card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() public card: Card;
  public suitsClass: string;

  constructor() { }

  ngOnInit() {
    this.suitsClass = `suit${this.card.Suit}`;
  }

}
