"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
var ng2_bs3_modal_1 = require('ng2-bs3-modal/ng2-bs3-modal');
var ng2_uploader_1 = require('ng2-uploader/ng2-uploader');
var mainItem_1 = require('./models/mainItem');
var item_1 = require('./models/item');
var synthesisItem_service_1 = require('./services/synthesisItem.service');
var item_add_component_1 = require('./views/modal/item-add.component');
//import { AppConfig } from './config/index';
var core_2 = require('@angular/core');
core_2.enableProdMode();
var DashboardComponent = (function () {
    function DashboardComponent(router, synthesisItemService) {
        this.router = router;
        this.synthesisItemService = synthesisItemService;
        this.mainItems = [];
        this.viewItemDetail = true;
        this.editItemDetail = false;
        this.animation = true;
        this.keyboard = false;
        this.backdrop = true;
        this.options = {
            url: ''
        };
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.mainItemDetail = new mainItem_1.MainItem();
        this.mainItemDetail.item = new item_1.Item();
        this.refreshDashBoard();
    };
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
    DashboardComponent.prototype.gotoDetail = function (material) {
        var link = ['MaterialDetail', { id: material.id }];
        this.router.navigate(link);
    };
    /*open() {
      this.modal.open();
    }
  
    dismissed() {
      this.output = '(dismissed)';
    }*/
    DashboardComponent.prototype.handleUpload = function (data) {
        var _this = this;
        if (data && data.response) {
            data = JSON.parse(data.response);
            this.uploadFile = data;
            this.mainItemDetail = this.mainItemDetail;
            this.synthesisItemService
                .save(this.mainItemDetail)
                .then(function (mainItemDetailInput) {
                _this.mainItemDetail = mainItemDetailInput;
            });
        }
    };
    DashboardComponent.prototype.toViewItem = function (itemId) {
        var _this = this;
        this.viewItemDetail = true;
        this.editItemDetail = false;
        if (itemId != "") {
            console.log("try update");
            this.synthesisItemService
                .save(this.mainItemDetail)
                .then(function (mainItemDetailInput) {
                _this.mainItemDetail = mainItemDetailInput;
            })
                .catch(function (error) { return _this.error = error; });
        }
        this.refreshDashBoard();
    };
    DashboardComponent.prototype.toEditItem = function (itemId) {
        var _this = this;
        var el = document.getElementById(itemId);
        console.log(el);
        this.viewItemDetail = false;
        this.editItemDetail = true;
        this.synthesisItemService
            .getMainItemsDetail(itemId)
            .then(function (response) { _this.mainItemDetail = response; });
        this.refreshDashBoard();
    };
    /*generatePictureLink(picture?: any) {
      let url;
      if (picture && picture.picture && picture.picture.url) {
        url = picture.picture.url;
      } else {
        url = ""//AppConfig.DEFAULT_HERO_PICTURE;
      }
      return AppConfig.API_BASE_URL + url;
    }*/
    DashboardComponent.prototype.refreshDashBoard = function () {
        var _this = this;
        this.synthesisItemService.getMainItems()
            .then(function (mainItems) { return _this.mainItems = mainItems; });
    };
    DashboardComponent.prototype.onRowClick = function (event, id) {
        console.log(event.target.outerText, id);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', mainItem_1.MainItem)
    ], DashboardComponent.prototype, "mainItemDetail", void 0);
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'my-dashboard',
            templateUrl: 'app/views/dashboard.component.html',
            styleUrls: ['app/css/dashboard.component.css', 'app/css/card.component.css'],
            directives: [ng2_bs3_modal_1.MODAL_DIRECTIVES, item_add_component_1.ItemAddComponent, ng2_uploader_1.UPLOAD_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, synthesisItem_service_1.SynthesisItemService])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map