import {Directive,HostListener} from '@angular/core'

@Directive({
selector: '[cardDash]'
})
export class CardDirective {

@HostListener('input', ['$event'])
onKeyDown(event: KeyboardEvent) {
const input = event.target as HTMLInputElement;

let trimmed = input.value.replace(/\s+/g, ''); //trimming the value by ignoring spaces

if (trimmed.length > 19) {
  trimmed = trimmed.substr(0, 19);
}


trimmed = trimmed.replace(/-/g,''); //avoid dash from users

 let numbers = [];

 numbers.push(trimmed.substr(0,4));
 if(trimmed.substr(4,4)!=="" )
 numbers.push(trimmed.substr(4,4));
 if(trimmed.substr(8,4)!="")
 numbers.push(trimmed.substr(8,4));
 if(trimmed.substr(12,4)!="")
 numbers.push(trimmed.substr(12,4));

input.value = numbers.join('-');

  }
}