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
var SynthesisMaterialService = (function () {
    function SynthesisMaterialService(http) {
        this.http = http;
        this.materialsUrl = 'http://localhost:3000/materials'; // URL to web api
    }
    SynthesisMaterialService.prototype.getMaterials = function () {
        return this.http.get(this.materialsUrl + '.json')
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    SynthesisMaterialService.prototype.getMaterial = function (id) {
        return this.getMaterials()
            .then(function (materials) { return materials.filter(function (material) { return material.id === id; })[0]; });
    };
    SynthesisMaterialService.prototype.save = function (material) {
        if (material.id) {
            return this.put(material);
        }
        return this.post(material);
    };
    SynthesisMaterialService.prototype.delete = function (material) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var url = this.materialsUrl + "/" + material.id + ".json";
        return this.http
            .delete(url, headers)
            .toPromise()
            .catch(this.handleError);
    };
    // Add new Material
    SynthesisMaterialService.prototype.post = function (material) {
        var headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        return this.http
            .post(this.materialsUrl + '.json', JSON.stringify(material), { headers: headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    // Update existing Material
    SynthesisMaterialService.prototype.put = function (material) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var url = this.materialsUrl + "/" + material.id + ".json";
        return this.http
            .put(url, JSON.stringify(material), { headers: headers })
            .toPromise()
            .then(function () { return material; })
            .catch(this.handleError);
    };
    SynthesisMaterialService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    SynthesisMaterialService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], SynthesisMaterialService);
    return SynthesisMaterialService;
}());
exports.SynthesisMaterialService = SynthesisMaterialService;
//# sourceMappingURL=synthesisMaterial.service.js.map