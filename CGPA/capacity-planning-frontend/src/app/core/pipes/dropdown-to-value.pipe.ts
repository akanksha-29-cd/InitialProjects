import { Pipe, PipeTransform } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Pipe({
  name: 'dropdownToValuePipe',
})
export class DropdownToValuePipe implements PipeTransform {
  transform(source: { id: string; name: string }[]): SelectItem[] {
    if (!source) {
      return undefined;
    }
    return source.map((u) => ({ label: u.name, value: u.id }));
  }
}
