import { Component, OnInit } from "@angular/core";
import { Product } from "../shared/models/product.model";
import { CartService } from "../shared/services/cart.service";
import { SnackbarService } from "../shared/services/snackbar.service";
import { SNACKBAR_MESSAGES, RESPONSES, PAGES } from "../shared/utils/constant";
import { Router } from "@angular/router";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit {
  cartProducts: Product[];
  totalCartValue: number;

  constructor(
    private cartService: CartService,
    private snackbar: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchCartProducts();
  }

  fetchCartProducts(): void {
    this.cartProducts = this.cartService.getProductsInCart();
    if (this.cartProducts.length > 0) {
      this.totalCartValue = this.cartProducts.reduce((total, product) => {
        return (total += product.discount_price);
      }, 0);
    } else {
      this.totalCartValue = 0;
    }
  }

  deleteProductFormCart({ id, name }): void {
    this.cartService.deleteProductFromCart(id);
    this.snackbar.show(
      `${name} ${SNACKBAR_MESSAGES.REMOVE_PRODUCT_FROM_CART}`,
      RESPONSES.SUCCESS
    );
    this.fetchCartProducts();
  }

  navToHome(): void {
    this.router.navigate([PAGES.HOME]);
  }
}
