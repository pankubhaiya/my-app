import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-component',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-component.component.html',
  styleUrl: './dashboard-component.component.css'
})
export class DashboardComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchQuery: string = '';
  sortByPriceAsc: boolean = true;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.dataService.getProductData().subscribe((data: Product[]) => {
      this.products = data;
      this.filteredProducts = [...this.products];
    });
  }

  toggleSortByPrice(): void {
    this.sortByPriceAsc = !this.sortByPriceAsc;
    this.sortProductsByPrice();
  }

  sortProductsByPrice(): void {
    this.filteredProducts.sort((a, b) => {
      if (this.sortByPriceAsc) {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  }

  applyFilter(): void {
    this.filteredProducts = this.products.filter(product =>
      product.productName.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
