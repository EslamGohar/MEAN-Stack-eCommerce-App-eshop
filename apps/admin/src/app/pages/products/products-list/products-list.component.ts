import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '@bluebits/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: []
})

export class ProductsListComponent implements OnInit, OnDestroy {
  products = [];
  endsub$: Subject<any>  = new Subject();

  constructor(
    private productsService: ProductsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._getProducts()
  }

  ngOnDestroy() {
    this.endsub$.next();
    this.endsub$.complete();
  }

  private _getProducts(){
    this.productsService.getProducts()
    .pipe(takeUntil(this.endsub$))
    .subscribe( (prods: any) => {
      this.products = prods.data
    })
  }

  updateProduct(productId: string) {
    this.router.navigateByUrl(`products/form/${productId}`)
  }

  deleteProduct(productId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this product?',
      header: 'Delete Product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productsService.deleteProduct(productId).subscribe(
          () => {
            this._getProducts();
            this.messageService.add({
              severity:'success', 
              summary:'Success', 
              detail:'Product is deleted'
            })
          },
          () => {
            this.messageService.add({
              severity:'error', 
              summary:'Error', 
              detail:'Product is not deleted'
            })
          }
        )
      }
    })
  }
}
