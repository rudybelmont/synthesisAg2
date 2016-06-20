import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { Material } from './models/material';
import { SynthesisMaterialService } from './services/synthesisMaterial.service';
import { MaterialDetailComponent } from './material-detail.component';
import { ConfirmDeleteComponent } from './views/modal/confirm-delete.component';

@Component({
  selector: 'my-materials',
  templateUrl: 'app/views/material.component.html',
  styleUrls: ['app/css/material.component.css'],
  directives: [MaterialDetailComponent, ConfirmDeleteComponent, MODAL_DIRECTIVES]
})

export class MaterialsComponent implements OnInit {
  @ViewChild('NewMaterialDetail')
  @Input() material: Material;
  modal: ModalComponent;
  animation: boolean = true;
  keyboard: boolean = false;
  backdrop: string | boolean = true;
  output: string;

  model: Material = new Material();
  materials: Material[];
  selectedMaterial: Material;
  error: any;
  DelName: string;

  constructor(
    private router: Router,
    private synthesisMaterialService: SynthesisMaterialService) { }

  getMaterials() {
    this.synthesisMaterialService
      .getMaterials()
      .then(materials => this.materials = materials)
      .catch(error => this.error = error);
  }

  ngOnInit() {
    this.model.name = "";
    this.getMaterials();
  }

  onSelect(materials: Material) {
    this.selectedMaterial = materials;
  }

  gotoDetail() {
    this.router.navigate(['MaterialDetail', { id: this.selectedMaterial.id }]);
  }

  opened() {
    this.model.name = ""
    this.model.unit = ""
    this.model.quantity = 0
    this.output = '(opened)';
  }

  open() {
    this.modal.open();
  }

  closed() {
    this.material = this.model;
    this.synthesisMaterialService
      .save(this.material)
      .then(material => {
        this.material = material; // saved synthesis, w/ id if new

      })
      .catch(error => this.error = error);

    this.output = '(dismissed) '
    this.getMaterials();
  }

  dismissed() {
    this.output = '(dismissed)';
  }

  delete(material: Material, event: any) {
    event.stopPropagation();
    this.synthesisMaterialService
      .delete(material)
      .then(res => {
        this.materials = this.materials.filter(h => h !== material);
        if (this.selectedMaterial === material) { this.selectedMaterial = null; }
      })
      .catch(error => this.error = error); // TODO: Display error message*/
  }

}
