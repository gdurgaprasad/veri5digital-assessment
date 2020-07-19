import { Component, OnInit } from "@angular/core";
import { ProductService } from "../shared/services/product.service";
import { Product } from "../shared/models/product.model";
import { CartService } from "../shared/services/cart.service";
import { SnackbarService } from "../shared/services/snackbar.service";
import { SNACKBAR_MESSAGES, RESPONSES, PAGES } from "../shared/utils/constant";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  showSearch = false;

  loading = false;
  products: Product[] = [];
  productsCopy: Product[] = [];
  cartCount = 0;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private snackbar: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartCount = this.cartService.cartSubjectValue;
    this.fetchAvailableProducts();
  }

  fetchAvailableProducts(): void {
    this.loading = true;
    this.productService.getAvailableProducts().subscribe((data) => {
      this.products = data;
      this.productsCopy = [...this.products];
      this.loading = false;
    });
  }

  addToCart(product: Product): void {
    this.loading = true;
    this.cartService.addProductToCart(product);
    this.snackbar.show(
      `${product.name} ${SNACKBAR_MESSAGES.ADD_TO_CART_SUCCESS}`,
      RESPONSES.SUCCESS
    );
    this.cartCount = this.cartService.cartSubjectValue;
    this.loading = false;
  }

  filterProducts(value: string): void {
    const searchString = value.trim().toLowerCase();
    this.products = this.productsCopy.filter((item) =>
      item.name.includes(searchString)
    );
  }

  navToCart(): void {
    this.router.navigate([PAGES.CART]);
  }
}
