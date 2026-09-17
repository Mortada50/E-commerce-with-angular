import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShopService } from './shop.service';
import { IProduct } from '../shared/Models/product';
import { IPagnation } from '../shared/Models/Pagnation';
import { ICategory } from '../shared/Models/Category';
import { ProductParam } from '../shared/Models/ProductParam';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shop',
  standalone: false,
  templateUrl: './shop.html',
  styleUrl: './shop.scss',
})
export class Shop implements OnInit {
  constructor(
    private shopService: ShopService,
    private toast: ToastrService,
  ) {}

  products: IProduct[] = [] as IProduct[];
  categories: ICategory[] = [] as ICategory[];
  TotalCount: number;
  ProductParam = new ProductParam();

  @ViewChild('search') searchInput: ElementRef;
  @ViewChild('SortSelected') selected: ElementRef;

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
  }

  // get products
  getAllProducts() {
    this.shopService.getProducts(this.ProductParam).subscribe({
      next: (res: IPagnation) => {
        this.products = res.data;
        this.TotalCount = res.totalCount;
        this.ProductParam.pageNumber = res.pageNumber;
        this.ProductParam.pageSize = res.pageSize;
        this.toast.success('All Products Loaded', 'SUCCESS');
      },
    });
  }

  onChangePage(event: any) {
    this.ProductParam.pageNumber = event;
    this.getAllProducts();
  }

  // get categories
  getAllCategories() {
    this.shopService.getCategories().subscribe({
      next: (res) => {
        this.categories = res;
      },
    });
  }

  selectedCategory(categoryId: number) {
    this.ProductParam.categoryId = categoryId;
    this.getAllProducts();
  }

  // sorting by Price
  SortingOption = [
    { name: 'Price', value: 'Name' },
    { name: 'Price:min-max', value: 'PriceAce' },
    { name: 'Price:max-min', value: 'PriceDce' },
  ];

  SortingByPrice(sort: Event) {
    this.ProductParam.sortSelected = (sort.target as HTMLInputElement).value;
    this.getAllProducts();
  }

  // filtering by words
  onSearch(search: string) {
    this.ProductParam.search = search;
    this.getAllProducts();
  }

  // reset all filter
  onReset() {
    this.ProductParam.search = '';
    this.ProductParam.categoryId = 0;
    this.ProductParam.sortSelected = this.SortingOption[0].value;

    this.searchInput.nativeElement.value = '';
    this.selected.nativeElement.selectedIndex = 0;

    this.getAllProducts();
  }
}
