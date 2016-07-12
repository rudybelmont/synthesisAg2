import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { Material } from './models/material';
import { MainItem} from './models/mainItem';
import { Item } from './models/item';
import { SynthesisItemService } from './services/synthesisItem.service';
import { ItemAddComponent } from './views/modal/item-add.component';

import {enableProdMode} from '@angular/core';
enableProdMode();

@Component({
  selector: 'my-dashboard',
  templateUrl: 'app/views/dashboard.component.html',
  styleUrls: ['app/css/dashboard.component.css', 'app/css/card.component.css'],
  directives: [MODAL_DIRECTIVES, ItemAddComponent]
})

export class DashboardComponent implements OnInit {
  @Input() mainItemDetail: MainItem;
  error: any;
  mainItems: Item[] = [];
  //modal: ModalComponent

  pictureLink: string;
  viewItemDetail: boolean = true;
  editItemDetail: boolean = false;

  /*animation: boolean = true;
  keyboard: boolean = false;
  backdrop: string | boolean = true;*/

  constructor(
    private router: Router,
    private synthesisItemService: SynthesisItemService) {
  }

  ngOnInit() {
    this.mainItemDetail = new MainItem();
    this.mainItemDetail.item = new Item();

    this.synthesisItemService.getMainItems()
      .then(mainItems => { this.mainItems = mainItems }
      )
  }

  /*opened(itemId) {
    this.synthesisItemService
      .getMainItemsDetail(itemId)
      //.then(this.debug)
      .then(response => this.mainItemDetail = response)
    //console.log(this.mainItemDetail);
  }

  debug(response: any) {
    console.log(response.item)
    this.mainItemDetail = response.item;
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

  onFileChange(fileInput: any) {
    let input = fileInput.target;
    if (input && input.files && input.files[0]) {
      // Preview picture
      this.pictureLink = URL.createObjectURL(input.files[0]);

      this.base64(input.files[0], data => {
        let prefix = 'data:' + data.filetype + ';base64,';

        this.mainItemDetail.item.picture = prefix + data.base64;
      });
    }
  }

  base64(file: any, callback: (result: any) => any) {
    let result: any = {};
    function readerOnload(e: any) {
      // Show preview
      this.pictureLink = e.target.result;

      // Generate base64
      let base64 = btoa(e.target.result);
      result.base64 = base64;
      callback(result);
    };

    let reader = new FileReader();
    reader.onload = readerOnload;

    result.filetype = file.type;
    result.size = file.size;
    result.filename = file.name;
    reader.readAsBinaryString(file);
  }

  toViewItemCancel(itemId) {
    document.getElementById("cardView_" + itemId).className = ' '
    document.getElementById("cardEdit_" + itemId).className = 'card-hide'
  }

  toViewItemSave(itemId, item) {
    if (itemId != "") {
      document.getElementById("cardEdit_" + itemId).className = ' '
      document.getElementById("cardView_" + itemId).className = 'card '

      this.mainItemDetail.item.id = itemId
      this.mainItemDetail.item.name = item.name
      this.mainItemDetail.item.rank = item.rank
      this.mainItemDetail.item.description = item.description

      this.synthesisItemService
        .save(this.mainItemDetail)
        .then(mainItemDetailInput => {
          this.mainItemDetail = mainItemDetailInput;
        })
        .catch(error => this.error = error)
    } else {
      document.getElementById("cardView_" + item.id).className = ' '
      document.getElementById("cardEdit_" + item.id).className = 'card-hide'

    }
    document.getElementById("cardView_" + item.id).className = ' '
    document.getElementById("cardEdit_" + item.id).className = 'card-hide'
  }

  toEditItem(itemId) {
    for (var i = 0; i < this.mainItems.length; i++) {
      if (this.mainItems[i].id == itemId) {
        this.mainItemDetail.item.picture = this.mainItems[i].picture
        break;
      }
    }

    document.getElementById("cardView_" + itemId).className = 'card-hide'
    document.getElementById("cardEdit_" + itemId).className = ''

    this.synthesisItemService
      .getMainItemsDetail(itemId)
      .then(response => {
        this.mainItemDetail = response;
        console.log(this.mainItemDetail.item.picture.picture.url);
      })
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
      .then(mainItems => {
        this.mainItems = mainItems
      })
  }

  onRowClick(event, id) {
    console.log(event.target.outerText, id);
  }

}
