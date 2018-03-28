import { Injectable } from '@angular/core';
import { Player } from '../classes/player';

@Injectable()
export class PlayerService {
  public players: Player[];

  constructor() { }

  public resetPlayers() {
    this.players = [];
    this.players.push(new Player(this.players.length + 1, 'House', false));
  }

  public addPlayer(name: string) {
    this.players.push(new Player(this.players.length + 1, name, true));
  }

}
