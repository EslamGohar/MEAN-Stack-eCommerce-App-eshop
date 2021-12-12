"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CategoriesFormComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var CategoriesFormComponent = /** @class */ (function () {
    function CategoriesFormComponent(formBuilder, categoriesService, messageService, location, route) {
        this.formBuilder = formBuilder;
        this.categoriesService = categoriesService;
        this.messageService = messageService;
        this.location = location;
        this.route = route;
        this.isSubmitted = false;
        this.editmode = false;
        this.currentCategoryId = '';
    }
    CategoriesFormComponent.prototype.ngOnInit = function () {
        // Reactive Form
        this.form = this.formBuilder.group({
            name: ['', forms_1.Validators.required],
            icon: ['', forms_1.Validators.required],
            color: ['#fff']
        });
        this._checkEditMode();
    };
    CategoriesFormComponent.prototype.onSubmit = function () {
        this.isSubmitted = true;
        if (this.form.invalid) {
            return;
        }
        var category = {
            id: this.currentCategoryId,
            name: this.categoryForm.name.value,
            icon: this.categoryForm.icon.value,
            color: this.categoryForm.color.value
        };
        if (this.editmode) {
            this._updateCategory(category);
        }
        else {
            this._addCategory(category);
        }
    };
    CategoriesFormComponent.prototype.OnCancel = function () {
        this.location.back();
    };
    CategoriesFormComponent.prototype._addCategory = function (category) {
        var _this = this;
        this.categoriesService.createCategory(category).subscribe(function (category) {
            _this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: "Category " + category.name + " is created"
            });
            rxjs_1.timer(2000).toPromise().then(function () {
                _this.location.back();
            });
        }, function () {
            _this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Category is not created'
            });
        });
    };
    CategoriesFormComponent.prototype._updateCategory = function (category) {
        var _this = this;
        this.categoriesService.updateCategory(category).subscribe(function (category) {
            _this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: "Category " + category.name + " is updated!"
            });
            rxjs_1.timer(2000)
                .toPromise()
                .then(function () {
                _this.location.back();
            });
        }, function () {
            _this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Category is not updated'
            });
        });
    };
    CategoriesFormComponent.prototype._checkEditMode = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            if (params.id) {
                _this.editmode = true;
                _this.currentCategoryId = params.id;
                _this.categoriesService.getOneCategory(params.id).subscribe(function (category) {
                    _this.categoryForm.name.setValue(category.name);
                    _this.categoryForm.icon.setValue(category.icon);
                    _this.categoryForm.color.setValue(category.color);
                });
            }
        });
    };
    Object.defineProperty(CategoriesFormComponent.prototype, "categoryForm", {
        // to avoid the long name in forms, use get/set methods
        get: function () {
            return this.form.controls;
        },
        enumerable: false,
        configurable: true
    });
    CategoriesFormComponent = __decorate([
        core_1.Component({
            selector: 'admin-categories-form',
            templateUrl: './categories-form.component.html',
            styles: []
        })
    ], CategoriesFormComponent);
    return CategoriesFormComponent;
}());
exports.CategoriesFormComponent = CategoriesFormComponent;
