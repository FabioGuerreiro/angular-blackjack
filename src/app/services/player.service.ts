import { Injectable } from '@angular/core';
import { Player } from '../classes/player';
import { Card } from '../classes/card';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { playerStatus } from '../interfaces/iplayer';

@Injectable()
export class PlayerService {
  public innerPlayers: Player[];
  public players: BehaviorSubject<Player[]> = new BehaviorSubject<Player[]>([]);

  constructor() {}

  public resetPlayers() {
    this.innerPlayers = [];
    this.innerPlayers.push(new Player(this.innerPlayers.length + 1, 'House', false));
    this.updateSubject();
  }

  public addPlayer(name: string) {
    this.innerPlayers.push(new Player(this.innerPlayers.length + 1, name, true));
    this.updateSubject();
  }

  public clearHand(playerId: number) {
    this.innerPlayers.map((p) => {
      if (p.Id === playerId) {
        p.Hand = [];
      }
    });
    this.updateSubject();
  }

  public addToHand(playerId: number, card: Card) {
    this.innerPlayers.map((p) => {
      if (p.Id === playerId) {
        p.Hand.push(card);
      }
    });
    this.updateSubject();
  }

  public setPoints(playerId: number, points: number) {
    this.innerPlayers.map((p) => {
      if (p.Id === playerId) {
        p.Points = points;
      }
    });
    this.updateSubject();
  }

  public setActive(playerId: number) {
    this.innerPlayers.map((p) => {
      p.Active = p.Id === playerId;
    });
    this.updateSubject();
  }

  public nextPlayer(playerId: number): Player {
    this.setActive(playerId - 1);
    return this.innerPlayers.filter((p) => p.Active)[0];
  }

  public updateStatus(playerId: number, text: string, win: boolean) {
    const player = this.innerPlayers.filter((p) => p.Id === playerId)[0];

    player.Status = win ? playerStatus.Win : playerStatus.Lose;
    player.StatusText = text;

    this.updateSubject();
  }

  private updateSubject() {
    this.players.next(this.innerPlayers);
  }

  public getPlayers(): Observable<Player[]> {
    return this.players.asObservable();
  }

}
