import { Injectable } from "@angular/core";
import { Product } from "../models/product.model";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CartService {
  public cartCount: Observable<number>;

  private cartSubject: BehaviorSubject<number>;

  constructor() {
    const count: number = JSON.parse(localStorage.getItem("cartProducts"))
      ? JSON.parse(localStorage.getItem("cartProducts")).length
      : 0;
    this.cartSubject = new BehaviorSubject<number>(count);
  }

  public get cartSubjectValue(): number {
    return this.cartSubject.value;
  }

  getProductsInCart() {
    return JSON.parse(localStorage.getItem("cartProducts")) || [];
  }

  addProductToCart(product: Product) {
    const productsInCart = this.getProductsInCart();
    productsInCart.push(product);
    localStorage.setItem("cartProducts", JSON.stringify(productsInCart));
    this.setCartSubjectvalue();
  }

  setCartSubjectvalue() {
    const cartCount = JSON.parse(localStorage.getItem("cartProducts")).length;
    this.cartSubject.next(cartCount);
  }

  deleteProductFromCart(id: number) {
    const productsInCart = this.getProductsInCart();
    const index = productsInCart.findIndex((product) => product.id === id);
    productsInCart.splice(index, 1);
    localStorage.setItem("cartProducts", JSON.stringify(productsInCart));
    this.setCartSubjectvalue();
  }
}
