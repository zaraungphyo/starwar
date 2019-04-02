import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from '../api.service';
//import {Product} from '../product';
//import {AngularWaitBarrier} from 'blocking-proxy/built/lib/angular_wait_barrier';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Catalog } from '../catalog';
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productForm: FormGroup;
  // product:Product = {_id:'',prod_name:'',prod_desc:'',prod_price:null,updated_at:null,catalog:'',image:''};
  isLoadingResults = true;
  imagePath: any;
  base64textString: string;
  message: string = '';

  prod_name: string = '';
  prod_desc: string = '';
  prod_price: number = null;
  catalog: string = '';
  image: string = '';
  private catalogs:Catalog[];
  constructor(private route: ActivatedRoute, private api: ApiService
    , private router: Router
    , private _sanitizer: DomSanitizer
    , private formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      'prod_name': [null, Validators.required],
      'prod_desc': [null, Validators.required],
      'prod_price': [null, Validators.required],
      'catalog': [null, Validators.required],
      'image': [''],
      '_id': [null]
    });
    this.api.getCatalogs().subscribe(x=>
      this.catalogs = x);

    this.getProductDetails(this.route.snapshot.params['id']);
  }
  onFileChanged(event: any) {
    const file = event.target.files[0];
    if (file) {
      var mimeType = file.type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = "Only images are supported.";
        return;
      }
      const reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      // console.log(file)
     // reader.readAsDataURL(file);
      reader.readAsBinaryString(file);
      
    }
  }
  handleReaderLoaded(e) {
    this.base64textString = btoa(e.target.result);
    this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + this.base64textString);
  }
  getProductDetails(id) {
    this.api.getProduct(id)
      .subscribe(data => {
        if (data != null) {
          this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + data.image);
        }
        this.base64textString = data.image;
        (<FormControl>this.productForm.controls['catalog']).setValue(data.catalog);
        (<FormControl>this.productForm.controls['prod_name']).setValue(data.prod_name);
        (<FormControl>this.productForm.controls['prod_desc']).setValue(data.prod_desc);
        (<FormControl>this.productForm.controls['prod_price']).setValue(data.prod_price);
       // (<FormControl>this.productForm.controls['image']).setValue(data.image);
        (<FormControl>this.productForm.controls['_id']).setValue(data._id);
        this.isLoadingResults = false;
      });
  }
  updateProduct(form: NgForm) {
    this.isLoadingResults = true;
    form['image'] = this.base64textString;
    this.api.updateProduct(form)
      .subscribe(res => {
        this.isLoadingResults = false;
        this.router.navigate(['/product-list']);
      }, (res) => {
        this.isLoadingResults = false;
      });
  }
}
