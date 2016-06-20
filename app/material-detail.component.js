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
var material_1 = require('./models/material');
var synthesisMaterial_service_1 = require('./services/synthesisMaterial.service');
var MaterialDetailComponent = (function () {
    function MaterialDetailComponent(synthesisMaterialService, routeParams) {
        this.synthesisMaterialService = synthesisMaterialService;
        this.routeParams = routeParams;
        this.close = new core_1.EventEmitter();
        this.navigated = false; // true if navigated here
    }
    MaterialDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.routeParams.get('id') !== null) {
            var id = +this.routeParams.get('id');
            this.navigated = true;
            this.synthesisMaterialService.getMaterial(id)
                .then(function (material) { return _this.material = material; });
        }
        else {
            this.navigated = false;
            this.material = new material_1.Material();
        }
    };
    MaterialDetailComponent.prototype.save = function () {
        var _this = this;
        this.synthesisMaterialService
            .save(this.material)
            .then(function (material) {
            _this.material = material; // saved synthesis, w/ id if new
            _this.goBack(material);
        })
            .catch(function (error) { return _this.error = error; }); // TODO: Display error message
    };
    MaterialDetailComponent.prototype.goBack = function (savedMaterial) {
        if (savedMaterial === void 0) { savedMaterial = null; }
        this.close.emit(savedMaterial);
        if (this.navigated) {
            window.history.back();
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', material_1.Material)
    ], MaterialDetailComponent.prototype, "material", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MaterialDetailComponent.prototype, "close", void 0);
    MaterialDetailComponent = __decorate([
        core_1.Component({
            selector: 'my-material-detail',
            templateUrl: 'app/views/material-detail.component.html',
            styleUrls: ['app/css/material-detail.component.css']
        }), 
        __metadata('design:paramtypes', [synthesisMaterial_service_1.SynthesisMaterialService, router_deprecated_1.RouteParams])
    ], MaterialDetailComponent);
    return MaterialDetailComponent;
}());
exports.MaterialDetailComponent = MaterialDetailComponent;
//# sourceMappingURL=material-detail.component.js.map