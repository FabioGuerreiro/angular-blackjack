import { Injectable } from '@angular/core';
import { Player } from '../classes/player';
import { Card } from '../classes/card';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PlayerService {
  public innnerPlayers: Player[];
  public players: BehaviorSubject<Player[]> = new BehaviorSubject<Player[]>([]);

  constructor() {}

  public resetPlayers() {
    this.innnerPlayers = [];
    this.innnerPlayers.push(new Player(this.innnerPlayers.length + 1, 'House', false));
    this.updateSubject();
  }

  public addPlayer(name: string) {
    this.innnerPlayers.push(new Player(this.innnerPlayers.length + 1, name, true));
    this.updateSubject();
  }

  public clearHand(playerId: number) {
    this.innnerPlayers.map((p) => {
      if (p.Id === playerId) {
        p.Hand = [];
      }
    });
    this.updateSubject();
  }

  public addToHand(playerId: number, card: Card) {
    this.innnerPlayers.map((p) => {
      if (p.Id === playerId) {
        p.Hand.push(card);
      }
    });
    this.updateSubject();
  }

  public setPoints(playerId: number, points: number) {
    this.innnerPlayers.map((p) => {
      if (p.Id === playerId) {
        p.Points = points;
      }
    });
    this.updateSubject();
  }

  public setActive(playerId: number) {
    this.innnerPlayers.map((p) => {
      p.Active = p.Id === playerId;
    });
    this.updateSubject();
  }

  public nextPlayer(playerId: number): Player {
    this.setActive(playerId - 1);
    return this.innnerPlayers.filter((p) => p.Active)[0];
  }

  private updateSubject() {
    this.players.next(this.innnerPlayers);
  }

  public getPlayers(): Observable<Player[]> {
    return this.players.asObservable();
  }

}
