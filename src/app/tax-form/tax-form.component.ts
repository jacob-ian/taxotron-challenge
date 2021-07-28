import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs-compat/Subscription';

export interface TaxForm {
  country: 'aus';
  income: number;
  year: number;
}

@Component({
  selector: 'app-tax-form',
  templateUrl: './tax-form.component.html',
  styleUrls: ['./tax-form.component.css']
})
export class TaxFormComponent implements OnInit, OnDestroy {
  @Input('disableForm') disableForm: boolean;

  public taxForm: FormGroup;

  private routeSubscription: Subscription;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.taxForm = this.buildTaxForm();
    this.routeSubscription = this.subscribeToRouteParams();
  }

  private buildTaxForm(): FormGroup {
    return new FormGroup({
      country: new FormControl(
        { value: 'aus', disabled: this.disableForm },
        { validators: Validators.required }
      ),
      year: new FormControl(
        { value: '2020', disabled: this.disableForm },
        { validators: Validators.required }
      ),
      income: new FormControl(
        { value: '', disabled: this.disableForm },
        { validators: Validators.required }
      )
    });
  }

  private subscribeToRouteParams(): Subscription {
    return this.route.queryParams.subscribe((params: Params) => {
      this.updateFormFromParams(params);
    });
  }

  private updateFormFromParams(params: Params): void {
    if (this.paramsValid(params)) {
      return this.updateForm(params);
    }
  }

  private paramsValid(params: Params): boolean {
    const { country, year, income } = params;
    return !!country && !!year && !!income;
  }

  private updateForm(params: Params): void {
    this.taxForm.setValue(params);
  }

  public submit(): void {
    if (this.canCalculate()) {
      this.navigateToResults();
    }
  }

  private canCalculate(): boolean {
    return this.taxForm.valid && !this.disableForm;
  }

  private navigateToResults(): void {
    const { country, year, income } = this.taxForm.value;
    this.router.navigate(['/results'], {
      queryParams: { country, year, income }
    });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
}
