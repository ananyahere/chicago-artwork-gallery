import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Artwork } from 'src/shared/model/artwork.model';
import { LocalStorageService } from 'src/shared/service/localStorage.service';

@Component({
  selector: 'app-fav-artwork',
  templateUrl: './fav-artwork.component.html',
  styleUrls: ['./fav-artwork.component.css']
})
export class FavArtworkComponent implements OnInit{
  favoriteArtworks: Artwork[] = []

  constructor(
    public localStorageService: LocalStorageService,
    private router: Router,
    ){
      this.favoriteArtworks = this.localStorageService.getData('user-fav')
    }

  ngOnInit(): void {
    this.favoriteArtworks = this.localStorageService.getData('user-fav')
  }

  onViewArtwork(id: number){
    this.router.navigate(['/artworks', id])
  }

}
