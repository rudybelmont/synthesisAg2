import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import { MainItem } from '../../models/mainItem';
import { ItemMaterial } from '../../models/itemMaterial';

import { SynthesisItemService } from '../../services/synthesisItem.service';

import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  selector: 'itemAddModal',
  templateUrl: 'app/views/modal/item-add.component.html',
  styleUrls: ['app/css/material.component.css'],
  directives: [MODAL_DIRECTIVES]
})

export class ItemAddComponent {
  @Input() mainItem: MainItem;
  modal: ModalComponent
  animation: boolean = true;
  keyboard: boolean = false;
  backdrop: string | boolean = true;
  output: string;

  model: MainItem = new MainItem();
  //materials: MainItem[];
  error: any;

  constructor(
    private router: Router,
    private synthesisItemService: SynthesisItemService) { }

  opened() {
    this.model.name = ""
    this.model.rank = ""
    this.model.description = ""
    this.output = '(opened)';
  }

  open() {
    this.modal.open();
  }

  closed() {
    this.mainItem = this.model;
    this.synthesisItemService
      .save(this.mainItem)
      .then(mainItem => {
        this.mainItem = mainItem;
      })
      .catch(error => this.error = error);
    this.router.navigateByUrl('/');
  }

  dismissed() {
    this.output = '(dismissed)';
  }
};