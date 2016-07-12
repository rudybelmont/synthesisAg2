import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import { MainItem } from '../../models/mainItem';
import { Item } from '../../models/Item';
import { ItemMaterial } from '../../models/itemMaterial';
import { SynthesisItemService } from '../../services/synthesisItem.service';

import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  selector: 'itemAddModal',
  templateUrl: 'app/views/modal/item-add.component.html',
  styleUrls: ['app/css/material.component.css'],
  directives: [MODAL_DIRECTIVES]
})

export class ItemAddComponent implements OnInit {
  @Input() mainItem: MainItem;
  modal: ModalComponent
  animation: boolean = true;
  keyboard: boolean = false;
  backdrop: string | boolean = true;
  output: string;

  model: MainItem = new MainItem();
  itemMaterialData: ItemMaterial[] = [];
  error: any;

  ngOnInit() {
    this.model.item = new Item();
  }
  
  constructor(
    private router: Router,
    private synthesisItemService: SynthesisItemService) { }

  opened() {
    this.load();
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
        location.reload() //this not good for best practice
      })
      .catch(error => this.error = error);
  }

  dismissed() {
    this.output = '(dismissed)';
  }

  load() {
    this.itemMaterialData.push(new ItemMaterial())
    this.itemMaterialData[0].item_id = 1
  }

  onRowClick(event, id) {
    console.log(event.target.outerText, id);
  }
};