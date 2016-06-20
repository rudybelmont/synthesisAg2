import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Material } from '../models/material';

@Injectable()
export class SynthesisMaterialService {

  private materialsUrl = 'http://localhost:3000/materials';  // URL to web api

  constructor(private http: Http) { }

  getMaterials(): Promise<Material[]> {
    return this.http.get(this.materialsUrl+'.json')
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getMaterial(id: number) {
    return this.getMaterials()
      .then(materials => materials.filter(material => material.id === id)[0]);
  }

  save(material: Material): Promise<Material> {
    if (material.id) {
      return this.put(material);
    }
    return this.post(material);
  }

  delete(material: Material) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.materialsUrl}/${material.id}.json`;

    return this.http
      .delete(url, headers)
      .toPromise()
      .catch(this.handleError);
  }

  // Add new Material
  private post(material: Material): Promise<Material> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http
      .post(this.materialsUrl+'.json', JSON.stringify(material), { headers: headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  // Update existing Material
  private put(material: Material) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.materialsUrl}/${material.id}.json`;

    return this.http
      .put(url, JSON.stringify(material), { headers: headers })
      .toPromise()
      .then(() => material)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
