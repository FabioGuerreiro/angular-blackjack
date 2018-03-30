import { Injectable } from '@angular/core';
import { Player } from '../classes/player';
import { Card } from '../classes/card';

@Injectable()
export class PlayerService {
  public players: Player[];

  constructor() {}

  public resetPlayers() {
    this.players = [];
    this.players.push(new Player(this.players.length + 1, 'House', false));
  }

  public addPlayer(name: string) {
    this.players.push(new Player(this.players.length + 1, name, true));
  }

  public clearHand(playerId: number) {
    this.players.map((p) => {
      if (p.Id === playerId) {
        p.Hand = [];
      }
    });
  }

  public addToHand(playerId: number, card: Card) {
    this.players.map((p) => {
      if (p.Id === playerId) {
        p.Hand.push(card);
      }
    });
  }

  public setPoints(playerId: number, points: number) {
    this.players.map((p) => {
      if (p.Id === playerId) {
        p.Points = points;
      }
    });
  }

}
