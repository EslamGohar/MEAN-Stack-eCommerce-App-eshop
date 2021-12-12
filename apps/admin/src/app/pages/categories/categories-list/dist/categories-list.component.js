"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CategoriesListComponent = void 0;
var core_1 = require("@angular/core");
var CategoriesListComponent = /** @class */ (function () {
    function CategoriesListComponent(categoriesService, messageService, confirmationService, router) {
        this.categoriesService = categoriesService;
        this.messageService = messageService;
        this.confirmationService = confirmationService;
        this.router = router;
        this.categories = [];
    }
    CategoriesListComponent.prototype.ngOnInit = function () {
        this._getCategories();
    };
    CategoriesListComponent.prototype._getCategories = function () {
        var _this = this;
        this.categoriesService.getCategories().subscribe(function (cats) {
            _this.categories = cats.data;
        });
    };
    CategoriesListComponent.prototype.deleteCategory = function (categoryId) {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Do you want to delete this category?',
            header: 'Delete Category',
            icon: 'pi pi-exclamation-triangle',
            accept: function () {
                _this.categoriesService.deleteCategory(categoryId).subscribe(function () {
                    _this._getCategories();
                    _this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Category is deleted'
                    });
                }, function () {
                    _this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Category is not deleted'
                    });
                });
            }
        });
    };
    CategoriesListComponent.prototype.updateCategory = function (categoryId) {
        this.router.navigateByUrl("categories/form/" + categoryId);
    };
    CategoriesListComponent = __decorate([
        core_1.Component({
            selector: 'admin-categories-list',
            templateUrl: './categories-list.component.html',
            styles: []
        })
    ], CategoriesListComponent);
    return CategoriesListComponent;
}());
exports.CategoriesListComponent = CategoriesListComponent;
