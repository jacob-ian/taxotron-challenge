import { Injectable } from '@angular/core';

export interface TaxBracket {
  description: string;
  tax: number;
}

export interface TaxRate {
  lower: number;
  upper: number;
  rate: number;
  label: string;
}

export interface TaxResult {
  totalTax: number;
  brackets: TaxBracket[];
}

const AUS_TAX_RATES: { [year: number]: TaxRate[] } = {
  2020: [
    { lower: 0, upper: 18200, rate: 0, label: '$0 - $18,200' },
    {
      lower: 18201,
      upper: 45000,
      rate: 0.19,
      label: '$18,201 - $45,000'
    },
    {
      lower: 45001,
      upper: 120000,
      rate: 0.325,
      label: '$45,001 - $120,000'
    },
    {
      lower: 120001,
      upper: 180000,
      rate: 0.37,
      label: '$120,001 - $180,000'
    },
    {
      lower: 180001,
      upper: Infinity,
      rate: 0.45,
      label: '$180,001+'
    }
  ]
};

@Injectable()
export class CalculatorService {
  constructor() {}

  public getAustralianTax(income: number, year: number): TaxResult {
    const rates = this.getAustralianRates(year);
    const brackets = this.calculateAusTaxBrackets(income, rates);
    const totalTax = this.calculateAusTotalTax(brackets);

    return { brackets, totalTax };
  }

  private getAustralianRates(year: number): TaxRate[] {
    return AUS_TAX_RATES[year];
  }

  private calculateAusTaxBrackets(
    income: number,
    rates: TaxRate[]
  ): TaxBracket[] {
    let brackets = rates.map(rate => {
      const bracket: TaxBracket = {
        description: rate.label,
        tax: this.calculateAusBracket(income, rate)
      };
      return bracket;
    });
    return brackets;
  }

  private calculateAusBracket(income: number, rate: TaxRate): number {
    if (income < rate.lower) {
      return 0;
    }

    const taxableAmount =
      income > rate.upper ? rate.upper - rate.lower : income - rate.lower;
    const tax = taxableAmount * rate.rate;
    return tax;
  }

  private calculateAusTotalTax(brackets: TaxBracket[]): number {
    let total = brackets.reduce((value, bracket) => value + bracket.tax, 0);
    return total;
  }
}
