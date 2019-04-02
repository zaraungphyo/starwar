import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Product } from '../product';
import { PageEvent } from '@angular/material';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
  data_source: Product[] = [];
  paginate_data: Product[];
  isLoadingResults = true;
  pageSize = 8;
  pageSizeOptions: number[] = [8, 16, 64, 256];
  // MatPaginator Output
  pageEvent: PageEvent;
  catalogId: string;
  constructor(private api: ApiService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.catalogId = params.get("cid")
    });
    this.api.getProducts(this.catalogId).subscribe(res => {
      this.data_source = res;
      this.paginate_data = this.data_source.slice(0, this.pageSize);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }
  onPageChanged(e) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.paginate_data = this.data_source.slice(firstCut, secondCut);
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }
}
