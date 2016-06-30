import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import {UPLOAD_DIRECTIVES} from 'ng2-uploader/ng2-uploader';

import { Material } from './models/material';
import { MainItem} from './models/mainItem';
import { Item } from './models/item';
import { SynthesisItemService } from './services/synthesisItem.service';
import { ItemAddComponent } from './views/modal/item-add.component';
//import { AppConfig } from './config/index';

import {enableProdMode} from '@angular/core';
enableProdMode();

@Component({
  selector: 'my-dashboard',
  templateUrl: 'app/views/dashboard.component.html',
  styleUrls: ['app/css/dashboard.component.css', 'app/css/card.component.css'],
  directives: [MODAL_DIRECTIVES, ItemAddComponent, UPLOAD_DIRECTIVES]
})

export class DashboardComponent implements OnInit {
  //@Input() mainItem: MainItem;
  @Input() mainItemDetail: MainItem;
  error: any;
  mainItems: MainItem[] = [];
  //modal: ModalComponent

  //mainItemDetail: MainItem = new MainItem();
  pictureLink: string;
  viewItemDetail: boolean = true;
  editItemDetail: boolean = false;

  animation: boolean = true;
  keyboard: boolean = false;
  backdrop: string | boolean = true;
  output: string;

  constructor(
    private router: Router,
    private synthesisItemService: SynthesisItemService) {
  }

  uploadFile: any;
  options: Object = {
    url: ''
  };

  ngOnInit() {
    this.mainItemDetail = new MainItem();
    this.mainItemDetail.item = new Item();
    this.refreshDashBoard();
  }

  /*opened(itemId) {
    this.synthesisItemService
      .getMainItemsDetail(itemId)
      //.then(this.debug)
      .then(response => this.mainItemDetail = response)
    //console.log(this.mainItemDetail);
    //this.mainItem.name = this.mainItem.name
    //this.model.rank = this.mainItemDetail.rank
    //this.model.description = this.mainItemDetail.description
  }

  debug(response: any) {
    console.log(response.item)
    this.mainItemDetail = response.item;
    //this.mainItemDetail.name = response.item.name
    //this.mainItemDetail.rank = response.item.rank
    //this.mainItemDetail.description = response.item.description
  }*/

  gotoDetail(material: Material) {
    let link = ['MaterialDetail', { id: material.id }];
    this.router.navigate(link);
  }

  /*open() {
    this.modal.open();
  }

  dismissed() {
    this.output = '(dismissed)';
  }*/

  handleUpload(data): void {
    if (data && data.response) {
      data = JSON.parse(data.response);
      this.uploadFile = data;

      this.mainItemDetail = this.mainItemDetail;
      this.synthesisItemService
        .save(this.mainItemDetail)
        .then(mainItemDetailInput => {
          this.mainItemDetail = mainItemDetailInput;
        })
    }
  }

  toViewItem(itemId) {
    this.viewItemDetail = true;
    this.editItemDetail = false;

    if (itemId != "") {
      console.log("try update");
      this.synthesisItemService
        .save(this.mainItemDetail)
        .then(mainItemDetailInput => {
          this.mainItemDetail = mainItemDetailInput;
        })
        .catch(error => this.error = error)
    }

    this.refreshDashBoard();
  }

  toEditItem(itemId) {
    var el = document.getElementById(itemId);
    console.log(el);
    this.viewItemDetail = false;
    this.editItemDetail = true

    this.synthesisItemService
      .getMainItemsDetail(itemId)
      .then(response => { this.mainItemDetail = response; })

    this.refreshDashBoard();
  }

  /*generatePictureLink(picture?: any) {
    let url;
    if (picture && picture.picture && picture.picture.url) {
      url = picture.picture.url;
    } else {
      url = ""//AppConfig.DEFAULT_HERO_PICTURE;
    }
    return AppConfig.API_BASE_URL + url;
  }*/

  refreshDashBoard() {
    this.synthesisItemService.getMainItems()
      .then(mainItems => this.mainItems = mainItems)
  }

  onRowClick(event, id) {
    console.log(event.target.outerText, id);
  }


}
