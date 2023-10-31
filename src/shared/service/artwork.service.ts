import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Artwork } from "../model/artwork.model";
import { Observable, Subject } from "rxjs";

@Injectable()
export class ArtworkService{
    // add a subject here which will trigger when the artwork is changed
    showSearchChanged$ = new Subject<boolean>();
    artworks: Artwork[] = []
    fetchFields = 'id,title,artist_display,date_display,place_of_origin,description,image_id'
    paginatorLength = 50
    BASE_URL = `https://api.artic.edu/api/v1/artworks`
    showSearch = false;

    constructor(
        private http: HttpClient
    ){}

    getArtworks(): Observable<any>{
        let getParams = new HttpParams()
        getParams = getParams.append('fields', this.fetchFields)
        getParams = getParams.append('limit', this.paginatorLength)
        return this.http.get<any>(this.BASE_URL,{
            params: getParams
        })
        
    }

    getArtwork(artworkId: number): Observable<any>{
        let getParams = new HttpParams()
        getParams = getParams.append('fields', this.fetchFields)
        return this.http.get<any>(`${this.BASE_URL}/${artworkId}`, {
            params: getParams
        })
    }

    setShowSearch(status: boolean): void{
        this.showSearch = status
        this.showSearchChanged$.next(status)
    }

    searchArtwork(text: string){
        let searchParams = new HttpParams()
        searchParams = searchParams.append('q', text)
        searchParams = searchParams.append('fields', this.fetchFields)
        return this.http.get<any>(`${this.BASE_URL}/search`, {
            params: searchParams
        })
    }

    applyFilter(artworkListing: Artwork[],title: string, artist: string, period: string){
        if(!title) title = ''
        if(!artist) artist = ''
        if(!period) period = ''
        console.log("filtering-before",artworkListing,artworkListing.length)
        const filteredArtworks = artworkListing.filter(
            artwork => 
                artwork["title"]?.toString().toLowerCase().includes(title?.toLowerCase()) 
                &&
                artwork["artist_display"]?.toString().toLowerCase().includes(artist?.toLowerCase())
                &&
                artwork["date_display"]?.toString().toLowerCase().includes(period?.toLowerCase())
        )
        console.log("filtering-after", filteredArtworks.length)
        return filteredArtworks
    }

    getPaganitorLength(){
        return this.paginatorLength
    }

    getPaginatedArtwork(limit: number, page: number){
        let getParams = new HttpParams()
        getParams = getParams.append('fields', this.fetchFields)
        getParams = getParams.append('limit', limit)
        getParams = getParams.append('page', page)
        return this.http.get<any>(this.BASE_URL, {
            params: getParams
        })
    }
} 