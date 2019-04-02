import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router'
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { CatalogAddComponent } from './catalog-add/catalog-add.component';
import { ProductListComponent } from './product-list/product-list.component';
const routes: Routes = [
  {
    path: 'catalog-add',
    component: CatalogAddComponent,
    data: { title: 'Add Catalog' }
  },
  {
    path: 'products',
    component: ProductsComponent,
    data: { title: 'List of Products' }
  },
  {
    path: 'product-details/:id',
    component: ProductDetailComponent,
    data: { title: 'Product Details' }
  },
  {
    path: 'product-add',
    component: ProductAddComponent,
    data: { title: 'Add Product' }
  },
  {
    path: 'product-edit/:id',
    component: ProductEditComponent,
    data: { title: 'Edit Product' }
  },
  { path: '',
    redirectTo: '/product-list',
    pathMatch: 'full'
  },
  { path: 'product-list',
    component:ProductListComponent,
    data: { title: 'Product Gallery' }
  },
  { path: 'product-list/:cid',
    component:ProductListComponent,
    data: { title: 'Product Gallery' }
  }
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes) 
  ]
  ,exports: [
    RouterModule
  ],
})

export class AppRoutingModule { 
  
}
