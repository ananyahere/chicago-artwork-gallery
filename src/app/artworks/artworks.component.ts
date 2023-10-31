import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Artwork } from 'src/shared/model/artwork.model';
import { ArtworkService } from 'src/shared/service/artwork.service';

@Component({
  selector: 'app-artworks',
  templateUrl: './artworks.component.html',
  styleUrls: ['./artworks.component.css']
})
export class ArtworksComponent implements OnInit{
  artworks: Artwork[] = []
  isDisplaySearch: boolean
  fullTextQuery: string
  filterForm: FormGroup = null
  fullTextSeachForm: FormGroup = null
  pageIndex = 0
  pageSize = 5
  paginatorLength: number

  constructor(
    private artworkService: ArtworkService,
    private fb: FormBuilder
  ){
    this.paginatorLength = this.artworkService.getPaganitorLength()
  }

  ngOnInit(): void {
    this.paginatorLength = this.artworkService.getPaganitorLength()

    // service subscribes to changes in the search status of artwork and updates the "isDisplaySearch" property of a component accordingly. 
    this.artworkService.showSearchChanged$
    .subscribe(status => {
      this.isDisplaySearch = status
    })

    // retrieves artworks data and logs it to the console and updates the "artworks" property of the component.
    this.artworkService.getArtworks()
    .subscribe((responseData: any) => {
      this.artworks = responseData["data"]
    })

    // creates searchForm
    this.filterForm = this.fb.group({
      title: this.fb.control(null),
      artist: this.fb.control(null),
      period: this.fb.control(null)
    })

    // creates fullTextSeachForm
    this.fullTextSeachForm = new FormGroup({
      'text': new FormControl(null)
    })

    // filters data with every keystroke
    this.filterForm.valueChanges.subscribe(value => {
      console.log(value)
      this.artworks = this.artworkService.applyFilter(this.artworks.slice(), value.title, value.artist, value.period)
    })

  }

  onFullTextSearch(){
    const query: string = this.fullTextSeachForm.value["text"]
    this.fullTextQuery = query
    this.artworkService.searchArtwork(query).subscribe(responseData => {
      this.artworks = responseData["data"]
    })
  }

  resetFilter(){
    this.filterForm.reset()
    this.artworkService.searchArtwork(this.fullTextQuery).subscribe(responseData => {
      this.artworks = responseData["data"]
    })
  }

  handlePageChange(event: PageEvent){
    this.pageIndex = event.pageIndex // page
    this.pageSize = event.pageSize  // limit
    this.artworkService.getPaginatedArtwork(this.pageSize, this.pageIndex).subscribe(responseData => {
      this.artworks = responseData["data"]
    })

  }
}
