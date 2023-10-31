import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Artwork } from 'src/shared/model/artwork.model';
import { ArtworkService } from 'src/shared/service/artwork.service';

@Component({
  selector: 'app-artwork-detail',
  templateUrl: './artwork-detail.component.html',
  styleUrls: ['./artwork-detail.component.css']
})
export class ArtworkDetailComponent implements OnInit{
  artwork: Artwork
  constructor(
    private artworkService: ArtworkService,
    private route: ActivatedRoute
  ){}
  ngOnInit(): void {
    const id = this.route.snapshot.params['id']
    this.artworkService.getArtwork(Number(id))
    .subscribe(responseData => {
      this.artwork = responseData['data']
    })
    this.route.params.subscribe((params: Params) => {
      this.artworkService.getArtwork(Number(params['id']))
      .subscribe(
        responseData => this.artwork = responseData['data']
      )
    })
  }

  removeHTML(str: string) { 
    if(!str) return ''
    return str.replace(/<[^>]+>/g, '').replace(/\n/g, ''); 
  }

}
