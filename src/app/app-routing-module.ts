import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArtworksComponent } from './artworks/artworks.component';
import { FavArtworkComponent } from './artworks/fav-artwork/fav-artwork.component';
import { ArtworkDetailComponent } from './artworks/artwork-detail/artwork-detail.component';

const appRoutes : Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'artworks/favorites', component: FavArtworkComponent},
    {path: 'artworks/:id', component: ArtworkDetailComponent},
    {path: 'artworks', component: ArtworksComponent},
    {path: '**', redirectTo: 'home'}
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule{}