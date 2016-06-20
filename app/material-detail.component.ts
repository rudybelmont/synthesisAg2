import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';

import { Material }        from './models/material';
import { SynthesisMaterialService } from './services/synthesisMaterial.service';

@Component({
  selector: 'my-material-detail',
  templateUrl: 'app/views/material-detail.component.html',
  styleUrls: ['app/css/material-detail.component.css']
})
export class MaterialDetailComponent implements OnInit {
  @Input() material: Material;
  @Output() close = new EventEmitter();
  error: any;
  navigated = false; // true if navigated here

  constructor(
    private synthesisMaterialService: SynthesisMaterialService,
    private routeParams: RouteParams) {
  }

  ngOnInit() {
    if (this.routeParams.get('id') !== null) {
      let id = +this.routeParams.get('id');
      this.navigated = true;
      this.synthesisMaterialService.getMaterial(id)
        .then(material => this.material = material);
    } else {
      this.navigated = false;
      this.material = new Material();
    }
  }

  save() {
    this.synthesisMaterialService
      .save(this.material)
      .then(material => {
        this.material = material; // saved synthesis, w/ id if new
        this.goBack(material);
      })
      .catch(error => this.error = error); // TODO: Display error message
  }
  
  goBack(savedMaterial: Material = null) {
    this.close.emit(savedMaterial);
    if (this.navigated) { window.history.back(); }
  }
}