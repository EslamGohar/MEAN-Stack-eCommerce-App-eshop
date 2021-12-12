"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductsFormComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ProductsFormComponent = /** @class */ (function () {
    function ProductsFormComponent(formBuilder, categoriesService) {
        this.formBuilder = formBuilder;
        this.categoriesService = categoriesService;
        this.editmode = false;
        this.isSubmitted = false;
        this.categories = [];
    }
    ProductsFormComponent.prototype.ngOnInit = function () {
        this._initForm();
        this._getCategories();
    };
    ProductsFormComponent.prototype.OnCancel = function () {
    };
    ProductsFormComponent.prototype._initForm = function () {
        this.form = this.formBuilder.group({
            name: ['', forms_1.Validators.required],
            brand: ['', forms_1.Validators.required],
            price: ['', forms_1.Validators.required],
            category: ['', forms_1.Validators.required],
            countInStock: ['', forms_1.Validators.required],
            description: ['', forms_1.Validators.required],
            richDescription: [''],
            image: [''],
            isFeatured: ['']
        });
    };
    ProductsFormComponent.prototype._getCategories = function () {
        var _this = this;
        this.categoriesService.getCategories().subscribe(function (category) {
            _this.categories = category.data;
        });
    };
    ProductsFormComponent.prototype.onSubmit = function () { };
    ProductsFormComponent.prototype.onCancel = function () { };
    ProductsFormComponent.prototype.onImageUpload = function (event) {
        var _this = this;
        var file = event.target.files[0];
        if (file) {
            var fileReader_1 = new FileReader();
            fileReader_1.onload = function () {
                _this.imageDisplay = fileReader_1.result;
            };
            fileReader_1.readAsDataURL(file);
        }
    };
    Object.defineProperty(ProductsFormComponent.prototype, "productForm", {
        get: function () {
            return this.form.controls;
        },
        enumerable: false,
        configurable: true
    });
    ProductsFormComponent = __decorate([
        core_1.Component({
            selector: 'admin-products-form',
            templateUrl: './products-form.component.html',
            styles: []
        })
    ], ProductsFormComponent);
    return ProductsFormComponent;
}());
exports.ProductsFormComponent = ProductsFormComponent;
