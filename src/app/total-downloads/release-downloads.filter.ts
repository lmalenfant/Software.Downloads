import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'downloadFilter',
    pure: false
})
export class DownloadFilterPipe implements PipeTransform {
    transform(items: any[], filter: number): any {
        if (!items || !filter) {
            return items;
        }
        return items.filter(item => item.year === filter);
    }
}