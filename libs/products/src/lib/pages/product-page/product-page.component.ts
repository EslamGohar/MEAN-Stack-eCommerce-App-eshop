import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CartItem, CartService } from '@bluebits/orders';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'products-product-page',
  templateUrl: './product-page.component.html',
  styles: []
})

export class ProductPageComponent implements OnInit, OnDestroy {
  product: Product;
  endSubs$: Subject<any> = new Subject();
  quantity = 1;
  rating = 5;

  constructor(
    private prodService: ProductsService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) { }

  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params.productid) {
        this._getOneProduct(params.productid);
      }
    })
  }

  private _getOneProduct(id: string) {
    this.prodService.getOneProduct(id)
    .pipe(takeUntil(this.endSubs$))
    .subscribe((resProduct: any) => {
      this.product = resProduct.data;
    })
  }

  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: this.quantity
    }
    this.cartService.setCartItem(cartItem)
  }

}
