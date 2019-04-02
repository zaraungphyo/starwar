import { Component } from '@angular/core';
import { ApiService } from '../app/api.service';
import { Catalog } from '../app/catalog';
import { Router } from "@angular/router";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  title = 'starwarWorkshop';
  catalogs: Catalog[];
  constructor(private api: ApiService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.api.getCatalogs().subscribe(x =>
      this.catalogs = x);
  }
}