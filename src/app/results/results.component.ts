import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs-compat/Subscription';
import { TaxForm } from '../tax-form/tax-form.component';
import { CalculatorService, TaxBracket, TaxResult } from './calculator.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit, OnDestroy {
  public taxResult: TaxResult;

  private country: 'aus' = 'aus';
  private income: number = 0;
  private year: number = 0;

  private routeSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private calculator: CalculatorService
  ) {}

  ngOnInit() {
    this.routeSubscription = this.subscribeToRouteParams();
  }

  private subscribeToRouteParams(): Subscription {
    return this.route.queryParams.subscribe((params: Params) => {
      this.calculateTaxResults(params);
    });
  }

  private calculateTaxResults(params: Params): void {
    if (this.canCalculate(params)) {
      this.country = params.country;
      this.income = params.income;
      this.year = params.year;
      return this.calculate();
    }
    return this.navigateHome();
  }

  private canCalculate(params: Params): params is TaxForm {
    const { country, income, year } = params;
    return !!country && !!income && !!year;
  }

  private navigateHome(): void {
    this.router.navigate(['/home']);
  }

  private calculate(): void {
    if (this.country === 'aus') {
      return this.calculateAus();
    }
  }

  private calculateAus(): void {
    this.taxResult = this.calculator.getAustralianTax(this.income, this.year);
  }

  public getTotalTax(): string {
    return this.formatMoney(this.taxResult?.totalTax);
  }

  private formatMoney(value: number): string {
    let formatter = new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'aud'
    });
    return formatter.format(value);
  }

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
}
