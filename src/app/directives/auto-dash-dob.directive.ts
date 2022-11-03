import { Directive, HostListener } from "@angular/core";

@Directive({
  selector: "[dobDash]",
})
export class DobDirective {
  @HostListener("input", ["$event"])
  onKeyDown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const currYear = new Date().getFullYear();

    let trimmed = input.value.replace(/\s+/g, ""); //trimming the value by ignoring spaces
    console.log(trimmed);

    if (trimmed.length > 10) {
      trimmed = trimmed.substr(0, 10);
    }

    trimmed = trimmed.replace(/\//g, ""); //avoid slash from users

    let numbers = [];

    if (+trimmed.substr(0, 2) <= 31) numbers.push(trimmed.substr(0, 2));
    if (trimmed.substr(2, 2) !== "" && +trimmed.substr(2, 2) <= 12)
      numbers.push(trimmed.substr(2, 2));
    if (trimmed.substr(4, 4) != "" && +trimmed.substr(4, 4) <= currYear - 1)
      numbers.push(trimmed.substr(4, 4));

    input.value = numbers.join("/");
  }
}
