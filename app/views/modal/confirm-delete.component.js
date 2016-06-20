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
var material_1 = require('../../models/material');
var synthesisMaterial_service_1 = require('../../services/synthesisMaterial.service');
var ng2_bs3_modal_1 = require('ng2-bs3-modal/ng2-bs3-modal');
var ConfirmDeleteComponent = (function () {
    function ConfirmDeleteComponent(router, synthesisMaterialService) {
        this.router = router;
        this.synthesisMaterialService = synthesisMaterialService;
        this.animation = true;
        this.keyboard = false;
        this.backdrop = true;
        this.model = new material_1.Material();
        this.delName = "";
    }
    ConfirmDeleteComponent.prototype.open = function () {
        this.modal.open();
    };
    ConfirmDeleteComponent.prototype.opened = function (material) {
        this.delName = material;
        this.output = '(opened)';
    };
    ConfirmDeleteComponent.prototype.closed = function (material, event) {
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
        console.log(this.material.name);
        this.output = '(dismissed) ';
        //this.getMaterials();
    };
    ConfirmDeleteComponent.prototype.dismissed = function () {
        this.output = '(dismissed)';
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', material_1.Material)
    ], ConfirmDeleteComponent.prototype, "material", void 0);
    ConfirmDeleteComponent = __decorate([
        core_1.Component({
            selector: 'confirmDelButton',
            templateUrl: 'app/views/modal/confirm-delete.component.html',
            styleUrls: ['app/css/confirm-delete.component.css'],
            directives: [ng2_bs3_modal_1.MODAL_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, synthesisMaterial_service_1.SynthesisMaterialService])
    ], ConfirmDeleteComponent);
    return ConfirmDeleteComponent;
}());
exports.ConfirmDeleteComponent = ConfirmDeleteComponent;
//# sourceMappingURL=confirm-delete.component.js.map