import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { product } from '../../model/product';

@Component({
  selector: 'app-dashboard-component',
  templateUrl: './dashboard-component.component.html',
  styleUrls: ['./dashboard-component.component.css']
})
export class DashboardComponentComponent implements OnInit {
  products: product[] = [];
  filteredproducts: product[] = [];
  searchQuery: string = '';
  sortByPriceAsc: boolean = true;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.fetchproducts();
  }

  fetchproducts(): void {
    this.dataService.getProductData().subscribe((data: product[]) => {
      this.products = data;
      this.filteredproducts = [...this.products];
    });
  }

  toggleSortByPrice(): void {
    this.sortByPriceAsc = !this.sortByPriceAsc;
    this.sortproductsByPrice();
  }

  sortproductsByPrice(): void {
    this.filteredproducts.sort((a, b) => {
      if (this.sortByPriceAsc) {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  }

  applyFilter(): void {
    this.filteredproducts = this.products.filter(product =>
      product.productName.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
