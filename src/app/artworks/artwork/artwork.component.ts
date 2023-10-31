import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Artwork } from 'src/shared/model/artwork.model';
import { LocalStorageService } from 'src/shared/service/localStorage.service';

@Component({
  selector: 'app-artwork',
  templateUrl: './artwork.component.html',
  styleUrls: ['./artwork.component.css']
})
export class ArtworkComponent implements OnInit{
  @Input() artwork: Artwork
  isFav: boolean

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ){}

  ngOnInit(): void {
    this.isFav = this.localStorageService.isFavorite(this.artwork.id)
    console.log(this.isFav)
  }

  onViewArtwork(id: number){
    this.router.navigate(['/artworks', id])
  }

  /**
   * 
   * @param artworkId The ID of the artwork to add to favorites.
   * @returns 'true' if the artwork ID was successfully added to favorites, 'false' otherwise.
   */
  addToFavorites(): boolean{
    if(this.isFav) return false
    if(this.localStorageService.getData('user-fav').length === 0){
      const favs = [this.artwork]
      this.localStorageService.saveData('user-fav', JSON.stringify(favs))
      this.isFav = true
      return true
    }
    const storedData = this.localStorageService.getData('user-fav')
    storedData.push(this.artwork)
    this.localStorageService.saveData('user-fav', JSON.stringify(storedData))
    this.isFav = true
    return true
  }

}
