import { Component, OnInit, OnDestroy } from '@angular/core';
import { Player } from '../../classes/player';
import { BlackjackService } from '../../services/blackjack.service';
import { PlayerService } from '../../services/player.service';
import { Card } from '../../classes/card';
import { DeckService } from '../../services/deck.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy{
  public players: Player[];
  public deck: Card;

  public pSub: Subscription;
  public dSub: Subscription;

  constructor(
    private sGame: BlackjackService,
    private sPlayers: PlayerService,
    private sDeck: DeckService
  ) { }

  ngOnInit() {
    this.pSub = this.sPlayers.getPlayers().subscribe((p) => {
      this.players = p;
    });

    this.dSub = this.sDeck.getDeckLenght().subscribe((d) => {
      this.deck = new Card(null, d.toString());
    });

    this.newGame();
  }

  ngOnDestroy() {
    this.pSub.unsubscribe();
    this.dSub.unsubscribe();
  }

  public newGame() {
    this.sGame.resetGame();
    this.sPlayers.addPlayer('PLAYER 1');
    this.sGame.newGame();
  }

}
