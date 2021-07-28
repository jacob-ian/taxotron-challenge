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
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements OnInit, ControlValueAccessor {
  @ViewChild('select', { static: true }) selectRef: ElementRef;
  private select: HTMLSelectElement;

  @Input('label') label: string;
  @Input('required') required: string;
  public disabled: boolean = false;

  constructor() {}

  ngOnInit() {
    this.select = this.selectRef.nativeElement;
  }

  public onChange: (_: any) => void;
  public onTouched: () => void;

  public set value(value: any) {
    this.select.value = value;
  }

  public get value(): any {
    return this.select.value;
  }

  public writeValue(value: any): void {
    this.select.value = value;
  }

  public registerOnChange(fn: (value: any) => any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public getRequiredIndicator(): string {
    return this.required ? ' *' : '';
  }
}
