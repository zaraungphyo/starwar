import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './product';
@Pipe({
    name: 'searchgallery',
    pure: false
})
export class searchgalleryPipe implements PipeTransform {
    transform(items: Product[], keyword: string): any {
        if (!items || !keyword) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return items.filter(item => item.prod_name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1);
    }
}