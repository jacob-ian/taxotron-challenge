import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tax-bracket',
  templateUrl: './tax-bracket.component.html',
  styleUrls: ['./tax-bracket.component.css']
})
export class TaxBracketComponent implements OnInit {
  @Input('value') value: number;
  @Input('bracket') bracket: string;

  constructor() {}

  ngOnInit() {}

  public getFormattedValue(): string {
    let roundedUp = Math.ceil(this.value);
    let formatted = roundedUp.toLocaleString('en-us');
    return `\$${formatted}`;
  }
}
