import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncarTexto',
  standalone: true
})
export class TruncarTextoPipe implements PipeTransform {

  transform(texto: string): string {
    if (!texto) return '';
    return texto.length > 20 ? texto.substring(0, 50) + '...' : texto;
  }

}
