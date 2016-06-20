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
var material_1 = require('./models/material');
var synthesisMaterial_service_1 = require('./services/synthesisMaterial.service');
var material_detail_component_1 = require('./material-detail.component');
var confirm_delete_component_1 = require('./views/modal/confirm-delete.component');
var MaterialsComponent = (function () {
    function MaterialsComponent(router, synthesisMaterialService) {
        this.router = router;
        this.synthesisMaterialService = synthesisMaterialService;
        this.animation = true;
        this.keyboard = false;
        this.backdrop = true;
        this.model = new material_1.Material();
    }
    MaterialsComponent.prototype.getMaterials = function () {
        var _this = this;
        this.synthesisMaterialService
            .getMaterials()
            .then(function (materials) { return _this.materials = materials; })
            .catch(function (error) { return _this.error = error; });
    };
    MaterialsComponent.prototype.ngOnInit = function () {
        this.model.name = "";
        this.getMaterials();
    };
    MaterialsComponent.prototype.onSelect = function (materials) {
        this.selectedMaterial = materials;
    };
    MaterialsComponent.prototype.gotoDetail = function () {
        this.router.navigate(['MaterialDetail', { id: this.selectedMaterial.id }]);
    };
    MaterialsComponent.prototype.opened = function () {
        this.model.name = "";
        this.model.unit = "";
        this.model.quantity = 0;
        this.output = '(opened)';
    };
    MaterialsComponent.prototype.open = function () {
        this.modal.open();
    };
    MaterialsComponent.prototype.closed = function () {
        var _this = this;
        this.material = this.model;
        this.synthesisMaterialService
            .save(this.material)
            .then(function (material) {
            _this.material = material; // saved synthesis, w/ id if new
        })
            .catch(function (error) { return _this.error = error; });
        this.output = '(dismissed) ';
        this.getMaterials();
    };
    MaterialsComponent.prototype.dismissed = function () {
        this.output = '(dismissed)';
    };
    MaterialsComponent.prototype.delete = function (material, event) {
        var _this = this;
        event.stopPropagation();
        this.synthesisMaterialService
            .delete(material)
            .then(function (res) {
            _this.materials = _this.materials.filter(function (h) { return h !== material; });
            if (_this.selectedMaterial === material) {
                _this.selectedMaterial = null;
            }
        })
            .catch(function (error) { return _this.error = error; }); // TODO: Display error message*/
    };
    __decorate([
        core_1.ViewChild('NewMaterialDetail'),
        core_1.Input(), 
        __metadata('design:type', material_1.Material)
    ], MaterialsComponent.prototype, "material", void 0);
    MaterialsComponent = __decorate([
        core_1.Component({
            selector: 'my-materials',
            templateUrl: 'app/views/material.component.html',
            styleUrls: ['app/css/material.component.css'],
            directives: [material_detail_component_1.MaterialDetailComponent, confirm_delete_component_1.ConfirmDeleteComponent, ng2_bs3_modal_1.MODAL_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, synthesisMaterial_service_1.SynthesisMaterialService])
    ], MaterialsComponent);
    return MaterialsComponent;
}());
exports.MaterialsComponent = MaterialsComponent;
//# sourceMappingURL=material.component.js.map