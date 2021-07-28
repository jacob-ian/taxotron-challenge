import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tax-total',
  templateUrl: './tax-total.component.html',
  styleUrls: ['./tax-total.component.css']
})
export class TaxTotalComponent implements OnInit {
  @Input('value') value: number;

  constructor() {}

  ngOnInit() {}

  public getFormattedValue(): string {
    let formatter = new Intl.NumberFormat('en-us', {
      style: 'currency',
      currency: 'usd'
    });

    return formatter.format(this.value);
  }
}
