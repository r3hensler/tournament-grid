import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { GridContainerComponent } from './components/grid-container/grid-container.component';
import { TournamentFeedService } from './services/tournament-feed.service';

@NgModule({
  declarations: [
    AppComponent,
    GridContainerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [TournamentFeedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
