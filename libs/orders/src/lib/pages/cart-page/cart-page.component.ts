import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CartItemDetailed } from '../../models/cart';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html',
  styles: []
})
export class CartPageComponent implements OnInit, OnDestroy {

  cartItemsDetailed: CartItemDetailed[] = [];
  cartCount = 0;
  endSubs$: Subject<any> = new Subject();

  constructor(
    private router: Router, 
    private cartService: CartService, 
    private orderService: OrdersService
  ) { }

  ngOnInit(): void {
    this._getCartDetails();
  }

  ngOnDestroy() {
    this.endSubs$.next();
    this.endSubs$.complete();
  }


  private _getCartDetails(){
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe(resCart=> {
      this.cartItemsDetailed = []
      this.cartCount = resCart?.items?.length ?? 0
      resCart.items.forEach((cartItem) => {
        this.orderService.getOneProduct(cartItem.productId).subscribe((resProduct: any) => {
          this.cartItemsDetailed.push({
            product: resProduct.data,
            quantity: cartItem.quantity
          })
        })
      })
    })
  }

  backToShop() {
    this.router.navigate(['/products'])
  }

  deleteCartItem(cartItem: CartItemDetailed){
    this.cartService.deleteCartItem(cartItem.product.id)
  }

  updateCartItemQuantity(event:any, cartItem: CartItemDetailed) {
    this.cartService.setCartItem(
      {
        productId: cartItem.product.id,
        quantity: event.value 
      }
    , true )
  }
}
