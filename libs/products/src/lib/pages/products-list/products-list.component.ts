import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/category';

@Component({
  selector: 'products-products-list',
  templateUrl: './products-list.component.html',
  styles: []
})
export class ProductsListComponent implements OnInit {
  
  products:Product[] = [];
  categories:Category[] = [];
  isCategoryPage: boolean;

  constructor(
    private prodService: ProductsService, 
    private categoriesService: CategoriesService, 
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      params.categoryid ? this._getProducts([params.categoryid]) : this._getProducts();
      params.categoryid ? this.isCategoryPage = true : this.isCategoryPage = false;  // to hide category checkbox sidebar
    })

    this._getCategories();
  }

  private _getProducts(categoriesFilter?: string[]) {
    this.prodService.getProducts(categoriesFilter).subscribe((resProducts:any) => {
      this.products = resProducts.data;
    })
  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe((resCats:any) => {
      this.categories = resCats.data;
    })
  }

  categoryFilter(){
    const selectedCategory = this.categories
    .filter(category => category.checked)
    .map(category => category.id)

    this._getProducts(selectedCategory)
  }


}
