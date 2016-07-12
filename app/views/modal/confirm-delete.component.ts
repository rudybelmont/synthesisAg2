import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import { MainItem } from '../../models/mainItem';
import { ItemMaterial } from '../../models/itemMaterial';
import { Material } from '../../models/material';

import { SynthesisMaterialService } from '../../services/synthesisMaterial.service';

import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  selector: 'confirmDelButton',
  templateUrl: 'app/views/modal/confirm-delete.component.html',
  styleUrls: ['app/css/confirm-delete.component.css'],
  directives: [MODAL_DIRECTIVES]
})

export class ConfirmDeleteComponent {
  @Input() material: Material;
  modal: ModalComponent
  animation: boolean = true;
  keyboard: boolean = false;
  backdrop: string | boolean = true;
  output: string;

  model: Material = new Material();
  delName = ""

  constructor(
    private router: Router,
    private synthesisMaterialService: SynthesisMaterialService) { }

  open() {
    this.modal.open();
  }

  opened(material) {
    this.delName = material.name
    this.output = '(opened)';
  }

  closed(material: Material, event: any) {

    //TODO: add delete services
    /*    event.stopPropagation();
    this.synthesisService
      .delete(material)
      .then(res => {
        this.materials = this.materials.filter(h => h !== material);
        if (this.selectedMaterial === material) { this.selectedMaterial = null; }
      })
      .catch(error => this.error = error); */
    // TODO: Display error message

    console.log(this.material.name)
    this.output = '(dismissed) '
    //this.getMaterials();
  }

  dismissed() {
    this.output = '(dismissed)';
  }
}


