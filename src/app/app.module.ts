import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ArtworksComponent } from './artworks/artworks.component';
import { ArtworkComponent } from './artworks/artwork/artwork.component';
import { AppRoutingModule } from './app-routing-module';
import { FavArtworkComponent } from './artworks/fav-artwork/fav-artwork.component';
import { ArtworkService } from 'src/shared/service/artwork.service';
import { SharedModule } from 'src/shared/shared.module';
import { ArtworkDetailComponent } from './artworks/artwork-detail/artwork-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocalStorageService } from 'src/shared/service/localStorage.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ArtworksComponent,
    ArtworkComponent,
    FavArtworkComponent,
    ArtworkDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    LocalStorageService,
    ArtworkService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
