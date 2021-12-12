import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart';

export const CART_KEY = 'cart';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  cart$: BehaviorSubject<Cart> = new BehaviorSubject(this.getCart())

  // Initialize a cart in localStorage && Checkout if there's a cart in localStorage or not!
  initCartLocalStorage() {
    const cart : Cart = this.getCart()
    if ( !cart ) {
      const intialCart = {
        items: []
      }
      const intialCartJson = JSON.stringify(intialCart) // convert cart Items to be string json
      localStorage.setItem(CART_KEY, intialCartJson)
    }
  }

  // Empty Cart Items after place order
  emptyCart() {
    const intialCart = {
      items: []
    }
    const intialCartJson = JSON.stringify(intialCart)
    localStorage.setItem(CART_KEY, intialCartJson)
    this.cart$.next(intialCart)
  }

  // Get/Read any cart in localStorage
  getCart(): Cart {
    const cartJsonString: string = localStorage.getItem(CART_KEY)
    const cart: Cart = JSON.parse(cartJsonString)   // convert cart Items to be Object (CART)
    return cart;
  }

  // Write a cart items to localStorage && increase the quantity of cart items
  setCartItem(cartItem: CartItem, updateCartItem?: boolean) : Cart {
    const cart = this.getCart()
    const cartItemExist = cart.items.find((item) => item.productId === cartItem.productId )
    if (cartItemExist) {
      cart.items.map(item => {
        if (item.productId === cartItem.productId) {
          if (updateCartItem) {
            item.quantity = cartItem.quantity;
          } else {
            item.quantity = item.quantity + cartItem.quantity;
          }
        }
        return item
      })
    } else {
      cart.items.push(cartItem)
    }

    const cartJson = JSON.stringify(cart)
    localStorage.setItem(CART_KEY, cartJson)
    this.cart$.next(cart) // to update the observable
    return cart;
  }


  deleteCartItem(productId: string) {
    const cart = this.getCart()
    const newCart = cart.items.filter(item => item.productId !== productId)

    cart.items = newCart

    const cartJsonString = JSON.stringify(cart)
    localStorage.setItem(CART_KEY, cartJsonString)

    this.cart$.next(cart)
  }

}
