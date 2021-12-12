"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductsListComponent = void 0;
var core_1 = require("@angular/core");
var ProductsListComponent = /** @class */ (function () {
    function ProductsListComponent(productsService) {
        this.productsService = productsService;
        this.products = [];
    }
    ProductsListComponent.prototype.ngOnInit = function () {
        this._getProducts();
    };
    ProductsListComponent.prototype._getProducts = function () {
        var _this = this;
        this.productsService.getProducts().subscribe(function (prods) {
            _this.products = prods.data;
        });
    };
    ProductsListComponent = __decorate([
        core_1.Component({
            selector: 'admin-products-list',
            templateUrl: './products-list.component.html',
            styles: []
        })
    ], ProductsListComponent);
    return ProductsListComponent;
}());
exports.ProductsListComponent = ProductsListComponent;
