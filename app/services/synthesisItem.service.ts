import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { MainItem } from '../models/mainItem';


@Injectable()

export class SynthesisItemService {
  private mainItemsUrl = 'http://localhost:3000/items';  // URL to web api

  constructor(private http: Http) { }

  getMainItems(): Promise<MainItem[]> {
    return this.http.get(this.mainItemsUrl + '.json')
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getMainItem(id: number) {
    return this.getMainItems()
      .then(mainItems => mainItems.filter(mainItem => mainItem.id === id)[0]);
  }

  save(mainItem: MainItem): Promise<MainItem> {
    if (mainItem.id) {
      return this.put(mainItem);
    }
    return this.post(mainItem);
  }

  // Add new Item
  private post(mainItem: MainItem): Promise<MainItem> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http
      .post(this.mainItemsUrl + '.json', JSON.stringify(mainItem), { headers: headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  // Update existing Item
  private put(mainItem: MainItem) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.mainItemsUrl}/${mainItem.id}.json`;

    return this.http
      .put(url, JSON.stringify(mainItem), { headers: headers })
      .toPromise()
      .then(() => mainItem)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}