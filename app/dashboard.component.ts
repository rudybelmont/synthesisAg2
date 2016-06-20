import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { Material } from './models/material';
import { MainItem} from './models/mainItem'
import { SynthesisItemService } from './services/synthesisItem.service';
import { ItemAddComponent } from './views/modal/item-add.component';

@Component({
  selector: 'my-dashboard',
  templateUrl: 'app/views/dashboard.component.html',
  styleUrls: ['app/css/dashboard.component.css'],
  directives: [MODAL_DIRECTIVES, ItemAddComponent]
})
export class DashboardComponent implements OnInit {

  mainItems: MainItem[] = [];
 modal: ModalComponent

  constructor(
    private router: Router,
    private synthesisItemService: SynthesisItemService) {
  }

  ngOnInit() {
    this.synthesisItemService.getMainItems()
      .then(mainItems => this.mainItems = mainItems);
  }

  gotoDetail(material: Material) {
    let link = ['MaterialDetail', { id: material.id }];
    this.router.navigate(link);
  }

  open() {
    this.modal.open();
  }
}
