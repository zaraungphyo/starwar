import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { Product } from '../product';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  displayedColumns: string[] = ['prod_name', 'prod_price','details', 'update'];
  public data = new MatTableDataSource<Product>();
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private api: ApiService) { 
  }
  ngOnInit() {
    this.api.getProducts(null)
      .subscribe(res => {
        this.data.data = res as Product[];
        this.isLoadingResults = false;
      }, err => {
        this.isLoadingResults = false;
      });
  }
  ngAfterViewInit(): void {
    // this.dataSource.sort = this.sort;
    this.data.paginator = this.paginator;
  }
}
