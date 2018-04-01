import { Component, OnInit, Input } from '@angular/core';
import { playerStatus } from '../../interfaces/iplayer';

@Component({
  selector: 'app-player-status',
  templateUrl: './player-status.component.html',
  styleUrls: ['./player-status.component.scss']
})
export class PlayerStatusComponent implements OnInit {
  public winOrLose: string;
  public statusTitle: string;

  @Input() public status: playerStatus;
  @Input() public statusText: string;

  constructor() { }

  ngOnInit() {
    if (this.status === playerStatus.Win) {
      this.winner();
    } else {
      this.loser();
    }
  }

  private winner() {
    this.winOrLose = 'win';
    this.statusTitle = 'winner';
  }

  private loser() {
    this.winOrLose = 'lose';
    this.statusTitle = 'loser';
  }

}
