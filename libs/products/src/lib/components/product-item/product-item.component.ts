import { Component, Input } from '@angular/core';
import { Product } from '../../models/product';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CartItem, CartService } from '@bluebits/orders';


@Component({
  selector: 'products-product-item',
  templateUrl: './product-item.component.html',
  styles: []
})
export class ProductItemComponent {

  @Input() product: Product
  
  constructor(private cartService: CartService) { }

  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: 1
    }
    this.cartService.setCartItem(cartItem)
  }

}
