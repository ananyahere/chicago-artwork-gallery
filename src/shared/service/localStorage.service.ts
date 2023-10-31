import { Injectable } from "@angular/core";
import { Artwork } from "../model/artwork.model";

@Injectable()
export class LocalStorageService{
    constructor() { }

    saveData(key: string, value: string) {
        localStorage.setItem(key, value);
    }

    getData(key: string) {
        const dataJSON = localStorage.getItem(key);
        return dataJSON ? JSON.parse(dataJSON) : []
    }
    removeData(key: string) {
        localStorage.removeItem(key);
    }

    clearData() {
        localStorage.clear();
    }

    isFavorite(artworkId: number): boolean{
        const favorites = this.getData('user-fav')
        favorites.forEach((artwork: Artwork) => {
            if(artwork.id == artworkId){
                console.log('true')
                return true
            }
        })
        return false
    }
}