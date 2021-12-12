"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var http_1 = require("@angular/common/http");
var forms_1 = require("@angular/forms");
// App Components
var app_component_1 = require("./app.component");
var router_1 = require("@angular/router");
var dashboard_component_1 = require("./pages/dashboard/dashboard.component");
var shell_component_1 = require("./shared/shell/shell.component");
var sidebar_component_1 = require("./shared/sidebar/sidebar.component");
var categories_list_component_1 = require("./categories/categories-list/categories-list.component");
var categories_form_component_1 = require("./categories/categories-form/categories-form.component");
var products_list_component_1 = require("./pages/products/products-list/products-list.component");
var products_form_component_1 = require("./pages/products/products-form/products-form.component");
// PrimeNg for UX
var card_1 = require("primeng/card");
var toolbar_1 = require("primeng/toolbar");
var button_1 = require("primeng/button");
var table_1 = require("primeng/table");
var products_1 = require("@bluebits/products");
var inputtext_1 = require("primeng/inputtext");
var toast_1 = require("primeng/toast");
var api_1 = require("primeng/api");
var confirmdialog_1 = require("primeng/confirmdialog");
var colorpicker_1 = require("primeng/colorpicker");
var inputnumber_1 = require("primeng/inputnumber");
var inputtextarea_1 = require("primeng/inputtextarea");
var inputswitch_1 = require("primeng/inputswitch");
var dropdown_1 = require("primeng/dropdown");
var editor_1 = require("primeng/editor");
var UX_MODULE = [
    card_1.CardModule,
    toolbar_1.ToolbarModule,
    button_1.ButtonModule,
    table_1.TableModule,
    inputtext_1.InputTextModule,
    toast_1.ToastModule,
    confirmdialog_1.ConfirmDialogModule,
    colorpicker_1.ColorPickerModule,
    inputnumber_1.InputNumberModule,
    inputtextarea_1.InputTextareaModule,
    inputswitch_1.InputSwitchModule,
    dropdown_1.DropdownModule,
    editor_1.EditorModule
];
var routes = [
    {
        path: '',
        component: shell_component_1.ShellComponent,
        children: [
            {
                path: 'dashboard',
                component: dashboard_component_1.DashboardComponent
            },
            // Categories Routes
            {
                path: 'categories',
                component: categories_list_component_1.CategoriesListComponent
            },
            {
                path: 'categories/form',
                component: categories_form_component_1.CategoriesFormComponent
            },
            {
                path: 'categories/form/:id',
                component: categories_form_component_1.CategoriesFormComponent
            },
            // Products Routes
            {
                path: 'products',
                component: products_list_component_1.ProductsListComponent
            },
            {
                path: 'products/form',
                component: products_form_component_1.ProductsFormComponent
            },
            {
                path: 'products/form/:id',
                component: products_form_component_1.ProductsFormComponent
            },
        ]
    }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                dashboard_component_1.DashboardComponent,
                shell_component_1.ShellComponent,
                sidebar_component_1.SidebarComponent,
                categories_list_component_1.CategoriesListComponent,
                categories_form_component_1.CategoriesFormComponent,
                products_list_component_1.ProductsListComponent,
                products_form_component_1.ProductsFormComponent
            ],
            imports: __spreadArrays([
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                http_1.HttpClientModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                router_1.RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' })
            ], UX_MODULE),
            providers: [products_1.CategoriesService, api_1.MessageService, api_1.ConfirmationService],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
