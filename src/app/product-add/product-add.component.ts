import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Catalog } from '../catalog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productForm: FormGroup;
  prod_name: string = '';
  prod_desc: string = '';
  prod_price: number = null;
  catalog: string = '';
  isLoadingResults = false;
  public catalogs: Catalog[];
  image: string = '';
  base64textString: string;
  message: string;
  imagePath:any;
  constructor(private router: Router, private api: ApiService
    , private formBuilder: FormBuilder
    ,private _sanitizer:DomSanitizer) { 
    }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      'prod_name': [null, Validators.required],
      'prod_desc': [null, Validators.required],
      'prod_price': [null, Validators.required],
      'catalog': [null, Validators.required],
      'image': [null]
    });
    this.api.getCatalogs().subscribe(x =>
      this.catalogs = x);
  }
  onFileChanged(event: any) {
    //this.image = event.target.files[0];
    const file = event.target.files[0];
    if (file) {
      var mimeType = file.type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = "Only images are supported.";
        return;
      }
      this.message ="";
      const reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }


  handleReaderLoaded(e) {
    this.base64textString = btoa(e.target.result);
    this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + this.base64textString);
  }

  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    form['image'] = this.base64textString;
    this.api.addProduct(form)
      .subscribe(res => {
        console.log(res);
        this.api.getProducts(null);
        // let id = res['_id'];
        this.isLoadingResults = false;
        // this.router.navigate(['/product-details', id]);
        this.router.navigate(['/products']);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

}