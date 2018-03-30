import { Component, OnInit, Input } from '@angular/core';
import { Card } from '../../classes/card';

@Component({
  selector: 'app-hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.scss']
})
export class HandComponent implements OnInit {
  @Input() hand: Card[];

  constructor() { }

  ngOnInit() {
  }

}
