import { Component, OnInit } from '@angular/core';
import { Player } from '../../classes/player';
import { BlackjackService } from '../../services/blackjack.service';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  public players: Player[];

  constructor(
    private sGame: BlackjackService,
    private sPlayers: PlayerService
  ) { }

  ngOnInit() {
    this.sGame.resetGame();
    this.sGame.newGame();
    this.players = this.sPlayers.players;
  }

}
