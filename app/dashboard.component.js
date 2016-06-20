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
var synthesisItem_service_1 = require('./services/synthesisItem.service');
var item_add_component_1 = require('./views/modal/item-add.component');
var DashboardComponent = (function () {
    function DashboardComponent(router, synthesisItemService) {
        this.router = router;
        this.synthesisItemService = synthesisItemService;
        this.mainItems = [];
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.synthesisItemService.getMainItems()
            .then(function (mainItems) { return _this.mainItems = mainItems; });
    };
    DashboardComponent.prototype.gotoDetail = function (material) {
        var link = ['MaterialDetail', { id: material.id }];
        this.router.navigate(link);
    };
    DashboardComponent.prototype.open = function () {
        this.modal.open();
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'my-dashboard',
            templateUrl: 'app/views/dashboard.component.html',
            styleUrls: ['app/css/dashboard.component.css'],
            directives: [ng2_bs3_modal_1.MODAL_DIRECTIVES, item_add_component_1.ItemAddComponent]
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, synthesisItem_service_1.SynthesisItemService])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map