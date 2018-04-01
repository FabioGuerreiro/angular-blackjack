import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { HandComponent } from './components/hand/hand.component';
import { PlayerComponent } from './components/player/player.component';
import { TableComponent } from './components/table/table.component';
import { BlackjackService } from './services/blackjack.service';
import { DeckService } from './services/deck.service';
import { PlayerService } from './services/player.service';
import { PlayerStatusComponent } from './components/player-status/player-status.component';


@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    HandComponent,
    PlayerComponent,
    TableComponent,
    PlayerStatusComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    DeckService,
    PlayerService,
    BlackjackService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
