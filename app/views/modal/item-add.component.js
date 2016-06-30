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
var mainItem_1 = require('../../models/mainItem');
var Item_1 = require('../../models/Item');
var itemMaterial_1 = require('../../models/itemMaterial');
var synthesisItem_service_1 = require('../../services/synthesisItem.service');
var ng2_bs3_modal_1 = require('ng2-bs3-modal/ng2-bs3-modal');
var ItemAddComponent = (function () {
    function ItemAddComponent(router, synthesisItemService) {
        this.router = router;
        this.synthesisItemService = synthesisItemService;
        this.animation = true;
        this.keyboard = false;
        this.backdrop = true;
        this.model = new mainItem_1.MainItem();
        this.itemMaterialData = [];
    }
    ItemAddComponent.prototype.ngOnInit = function () {
        this.model.item = new Item_1.Item();
    };
    ItemAddComponent.prototype.opened = function () {
        //this.model.item.name = "";
        //this.model.item.rank = "";
        //this.model.item.description = "";
        this.load();
        this.output = '(opened)';
    };
    ItemAddComponent.prototype.open = function () {
        this.modal.open();
    };
    ItemAddComponent.prototype.closed = function () {
        var _this = this;
        this.mainItem = this.model;
        this.synthesisItemService
            .save(this.mainItem)
            .then(function (mainItem) {
            _this.mainItem = mainItem;
        })
            .catch(function (error) { return _this.error = error; });
        this.router.navigateByUrl('');
    };
    ItemAddComponent.prototype.dismissed = function () {
        this.output = '(dismissed)';
    };
    ItemAddComponent.prototype.load = function () {
        this.itemMaterialData.push(new itemMaterial_1.ItemMaterial());
        this.itemMaterialData[0].item_id = 1;
    };
    ItemAddComponent.prototype.onFileChange = function (fileInput) {
        console.log("change picture");
        /*let input = fileInput.target;
    
        if (input && input.files && input.files[0]) {
            // Preview picture
            this.pictureLink = URL.createObjectURL(input.files[0]);
    
            this.base64(input.files[0], data => {
                let prefix = 'data:' + data.filetype + ';base64,';
                this.hero.picture = prefix + data.base64;
            });
        }*/
    };
    ItemAddComponent.prototype.onRowClick = function (event, id) {
        console.log(event.target.outerText, id);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', mainItem_1.MainItem)
    ], ItemAddComponent.prototype, "mainItem", void 0);
    ItemAddComponent = __decorate([
        core_1.Component({
            selector: 'itemAddModal',
            templateUrl: 'app/views/modal/item-add.component.html',
            styleUrls: ['app/css/material.component.css'],
            directives: [ng2_bs3_modal_1.MODAL_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, synthesisItem_service_1.SynthesisItemService])
    ], ItemAddComponent);
    return ItemAddComponent;
}());
exports.ItemAddComponent = ItemAddComponent;
;
//# sourceMappingURL=item-add.component.js.map