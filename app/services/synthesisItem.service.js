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
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var SynthesisItemService = (function () {
    function SynthesisItemService(http) {
        this.http = http;
        this.mainItemsUrl = 'http://localhost:3000/items'; // URL to web api
    }
    SynthesisItemService.prototype.getMainItems = function () {
        return this.http.get(this.mainItemsUrl + '.json')
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    SynthesisItemService.prototype.getMainItem = function (id) {
        return this.getMainItems()
            .then(function (mainItems) { return mainItems.filter(function (mainItem) { return mainItem.item.id === id; })[0]; });
    };
    SynthesisItemService.prototype.getMainItemsDetail = function (itemId) {
        return this.http.get(this.mainItemsUrl + '/' + itemId + '.json')
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    SynthesisItemService.prototype.save = function (mainItem) {
        if (mainItem.item.id) {
            return this.put(mainItem);
        }
        return this.post(mainItem);
    };
    // Add new Item
    SynthesisItemService.prototype.post = function (mainItem) {
        var headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        return this.http
            .post(this.mainItemsUrl + '.json', JSON.stringify(mainItem), { headers: headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    // Update existing Item
    SynthesisItemService.prototype.put = function (mainItem) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var url = this.mainItemsUrl + "/" + mainItem.item.id + ".json";
        return this.http
            .put(url, JSON.stringify(mainItem), { headers: headers })
            .toPromise()
            .then(function () { return mainItem; })
            .catch(this.handleError);
    };
    SynthesisItemService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    SynthesisItemService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], SynthesisItemService);
    return SynthesisItemService;
}());
exports.SynthesisItemService = SynthesisItemService;
//# sourceMappingURL=synthesisItem.service.js.map