import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-catalog-add',
  templateUrl: './catalog-add.component.html',
  styleUrls: ['./catalog-add.component.css']
})
export class CatalogAddComponent implements OnInit {

  catalogForm: FormGroup;
  catalog_name:string='';
 
  isLoadingResults = false;

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.catalogForm = this.formBuilder.group({
      'catalog_name' : [null, Validators.required]
    });
  }

  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;
    this.api.addCatalog(form)
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
