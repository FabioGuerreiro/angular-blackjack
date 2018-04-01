import { Component, OnInit } from '@angular/core';
import { Player } from '../../classes/player';
import { BlackjackService } from '../../services/blackjack.service';
import { PlayerService } from '../../services/player.service';
import { Card } from '../../classes/card';
import { DeckService } from '../../services/deck.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  public players: Player[];
  public deck: Card;

  constructor(
    private sGame: BlackjackService,
    private sPlayers: PlayerService,
    private sDeck: DeckService
  ) { }

  ngOnInit() {
    this.sGame.resetGame();
    this.sPlayers.addPlayer('PLAYER 1');
    this.sGame.newGame();

    this.sPlayers.getPlayers().subscribe((p) => {
      this.players = p;
    });

    this.deck = new Card(null, this.sDeck.deck.length.toString());
  }

}
