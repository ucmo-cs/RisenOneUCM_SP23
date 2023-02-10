import { NgModule } from '@angular/core';
import { BrowserModule, HammerGestureConfig } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { StatusUpdateTableComponent } from './status-update-table/status-update-table.component';
import { DataTableComponent } from './data-table/data-table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { HttpClientModule } from '@angular/common/http';
import {ConfigService} from './services/config.service';
import { ConfigComponent } from './services/app-config/app-config.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from './message.service';


console.log ("test");
@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    StatusUpdateTableComponent,
    DataTableComponent,
    ConfigComponent,
    HeroesComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
  ],
  providers: [ConfigService,
              HttpErrorHandler,
              MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
