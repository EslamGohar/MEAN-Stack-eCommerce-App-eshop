export class Cart {
    items?: CartItem[];
}

export class CartItem {
    productId?: string | any;
    quantity?: number | any;
}

export class CartItemDetailed {
    product?: any;
    quantity?: number;
}