import { Injectable } from '@angular/core';
import { DeckService } from './deck.service';
import { PlayerService } from './player.service';
import { Player } from '../classes/player';
import { Card } from '../classes/card';

@Injectable()
export class BlackjackService {
  public currentPlayerId: number;

  constructor(
    private sDeck: DeckService,
    private sPlayer: PlayerService
  ) { }

  public resetGame() {
    this.sPlayer.resetPlayers();
    this.newGame();
  }

  public resetDeck() {
    this.sDeck.resetDeck();
    this.sDeck.shuffle();
  }

  public newGame() {
    this.resetDeck();
  }

  public dealCards() {
    this.sPlayer.players.map((player) => {
      if (player.Human) {
        while (player.Hand.length < 2) {
            this.hit(player, true);
        }
      } else {
        this.hit(player, true);
      }
    });
  }

  public hit(player: Player, dealing: boolean = false) {
    const card = this.sDeck.dealCard();
    this.sPlayer.addToHand(player.Id, card);
    this.handlePoints(player);

    if (!dealing && !player.Human) {
        this.autoPlay(player);
    }
  }

  public stay(player: Player) {
    const nextPlayer = this.nextPlayer(player);
    if (this.currentPlayerId >= 0 && !nextPlayer.Human) {
          this.autoPlay(nextPlayer);
    } else {
      this.endGame();
    }
  }

  private nextPlayer(player: Player): Player {
    this.currentPlayerId = player.Id - 1;
    return this.sPlayer.players.filter((p) => p.Id === this.currentPlayerId)[0];
  }

  private autoPlay(player) {
    let highestScore = 0;

    this.sPlayer.players.map((p) => {
        if (p.Id !== player.Id && p.Points <= 21 && p.Points > highestScore) {
            highestScore = p.Points;
        }
    });

    window.setTimeout(() => {
        // if points are inferior to other players have to hit
        if (player.points <= highestScore) {
            this.hit(player);
        } else {
            this.stay(player);
        }
    }, 1000);
  }

  private handlePoints(player: Player) {
    // to handle aces last
    const orderedCards = [];
    let points = 0;

    if (player.Hand.length > 0) {
        player.Hand.map((card) => {
            if (card.Value === 'A') {
                orderedCards.push(card);
            } else {
                orderedCards.unshift(card);
            }
        });

        orderedCards.map((card) => {
            points += this.cardWeight(card, points);
        });

        player.Points = points;
    }

    // checkWinners(player);
  }

  private cardWeight(card: Card, currentPoints: number): number {
    const faces = ['J', 'Q', 'K'];

    let weight = parseInt(card.Value, 10);

    weight = faces.indexOf(card.Value) > -1 ? 10 : weight;

    if (card.Value === 'A') {
        weight = currentPoints + 11 > 21 ? 1 : 11;
    }
    return weight;
  }

  public endGame() {
    let highestScore = 0;
    let winner: Player;

    this.sPlayer.players.map((p) => {
        if (p.Points <= 21 && p.Points > highestScore) {
            highestScore = p.Points;
            winner = p;
        }
    });
  }

}
