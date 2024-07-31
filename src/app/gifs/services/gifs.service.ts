import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({ providedIn: 'root' })
export class GifsService {

  public gifs: Gif[] = []

  private _tagsHistory: string[] = [];
  private _gifApiKey: string = '';

  private _apiUrl: string = 'https://api.giphy.com/v1/gifs';
  private _apiService: string = '/search';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  async searchTag(tag: string): Promise<void> {
    if (tag.length === 0) return;

    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this._gifApiKey)
      .set('limit', 10)
      .set('q', tag);

    this.http.get<SearchResponse>(this._apiUrl + this._apiService, { params })
      .subscribe((response) => {
        this.gifs = response.data;
      });  
  }

  private organizeHistory(tag: string): void {
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this.tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    const storage = localStorage.getItem('history');

    if (!storage) return;

    this._tagsHistory = JSON.parse(storage);

    this.searchTag(this._tagsHistory[0]);
  }
}
