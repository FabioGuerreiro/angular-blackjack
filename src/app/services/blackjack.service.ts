import { Injectable } from '@angular/core';
import { DeckService } from './deck.service';
import { PlayerService } from './player.service';
import { Player } from '../classes/player';
import { Card } from '../classes/card';

@Injectable()
export class BlackjackService {
  public players: Player[];

  constructor(
    private sDeck: DeckService,
    private sPlayer: PlayerService
  ) { }

  public resetGame() {
    this.sPlayer.resetPlayers();
  }

  public resetDeck() {
    this.sDeck.resetDeck();
    this.sDeck.shuffle();
  }

  public newGame() {
    this.resetDeck();
    this.sPlayer.getPlayers().subscribe((p) => this.players = p);
    this.sPlayer.setActive(this.players[this.players.length - 1].Id);
    this.dealCards();
  }

  public dealCards() {
    this.players.map((player) => {
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
    const nextPlayer = this.sPlayer.nextPlayer(player.Id);

    if (typeof(nextPlayer) !== 'undefined' && !nextPlayer.Human) {
      this.autoPlay(nextPlayer);
    } else {
      this.endGame();
    }
  }

  private autoPlay(player) {
    let highestScore = 0;

    this.players.map((p) => {
        if (p.Id !== player.Id && p.Points <= 21 && p.Points > highestScore) {
          highestScore = p.Points;
        }
    });

    setTimeout(() => {
      // if points are inferior to other players have to hit
      if (player.Points <= highestScore) {
        this.hit(player);
      } else {
        this.stay(player);
      }
    }, 800);
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

        this.sPlayer.setPoints(player.Id, points);
    }

    this.checkWinners(player);
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

  public checkWinners(player) {
    if (player.Points === 21) {
      this.sPlayer.updateStatus(player.Id, 'Blackjack', true);
      this.endGame();
    } else if (player.Points > 21) {
      this.sPlayer.updateStatus(player.Id, 'Busted', false);
      this.stay(player);
    }
  }

  public endGame() {
    let highestScore = 0;
    let winner: Player;

    this.players.map((p) => {
      if (p.Points <= 21 && p.Points > highestScore) {
        highestScore = p.Points;
        winner = p;
      }
    });
    this.sPlayer.updateStatus(winner.Id, '', true);
    this.players.map((p) => {
      if (p.Id !== winner.Id) {
        this.sPlayer.updateStatus(p.Id, '', false);
      }
    });
  }

}
