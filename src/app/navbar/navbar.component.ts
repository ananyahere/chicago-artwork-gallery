import { Component, OnInit } from '@angular/core';
import {  NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators'
import { ArtworkService } from 'src/shared/service/artwork.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  showSearch: boolean
  onHomePage: boolean
  constructor(
    private artworkService: ArtworkService,
    private router: Router
  ){}
  ngOnInit(): void {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(event => {
      if(event["url"] !== '/artworks') this.onHomePage = true;
      else this.onHomePage = false;
    })
    this.artworkService.showSearchChanged$
    .subscribe(status => this.showSearch = status)
  }
  onShowSearch(){
    this.artworkService.showSearchChanged$.next(!this.showSearch)
  }
}
