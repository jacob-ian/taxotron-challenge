import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-money-input',
  templateUrl: './money-input.component.html',
  styleUrls: ['./money-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MoneyInputComponent),
      multi: true
    }
  ]
})
export class MoneyInputComponent implements OnInit, ControlValueAccessor {
  @ViewChild('input', { static: true }) inputRef: ElementRef;
  public input: HTMLInputElement;

  @Input('label') public label: string;
  @Input('required') public required: string;
  public disabled: boolean = false;
  public value: number;

  constructor() {}

  ngOnInit() {
    this.input = this.inputRef.nativeElement;
  }

  public get textValue(): any {
    return this.input.value;
  }

  public set textValue(value: any) {
    this.input.value = value;
  }

  public onInput(input: string): void {
    this.value = null;

    if (input) {
      this.value = this.convertInputToNumber(input);
      this.textValue = this.formatCurrency(this.value);
    }
    this.onChange(this.value);
  }

  private convertInputToNumber(input: string): number {
    let noCommas = input.replace(/,/gm, '');
    let number = parseInt(noCommas);
    return number;
  }

  private formatCurrency(input: number): string {
    return input.toLocaleString('en-us');
  }

  public onChange: (_: any) => void;
  public onTouched: () => void;

  public writeValue(value: string): void {
    if (value) {
      const number = this.convertInputToNumber(value);
      this.value = number;
      this.textValue = this.formatCurrency(number);
    }
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public getRequiredIndicator(): string {
    return this.required === 'true' ? ' *' : '';
  }
}
