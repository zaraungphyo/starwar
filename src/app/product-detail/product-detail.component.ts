import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from '../api.service';
import { Product } from '../product';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product = { _id: '', prod_name: '', prod_desc: '', prod_price: null, updated_at: null,catalog:'',image:'' };
  isLoadingResults = true;
  imagePath:any;
  constructor(private route: ActivatedRoute, private api: ApiService
    , private router: Router
    ,private _sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.getProductDetails(this.route.snapshot.params['id']);
  }
  getProductDetails(id) {
    this.api.getProduct(id)
      .subscribe(data => {
        if(data != null){
           this.imagePath =  this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + data.image);
        }
        this.product = data;
        this.isLoadingResults = false;
      });
  }
  deleteProduct(id) {
    this.isLoadingResults = true;
    this.api.deleteProduct(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/products']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  arrayBufferToBase64 = function(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
  }
}
