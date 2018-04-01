import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../../classes/player';
import { BlackjackService } from '../../services/blackjack.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  @Input() player: Player;

  constructor(
    private sGame: BlackjackService
  ) { }

  ngOnInit() {
  }

  public hit() {
    this.sGame.hit(this.player);
  }

  public stay() {
    this.sGame.stay(this.player);
  }

}
