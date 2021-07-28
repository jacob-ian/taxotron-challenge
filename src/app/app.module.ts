import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CardComponent } from './card/card.component';
import { SelectComponent } from './core/select/select.component';
import { MoneyInputComponent } from './core/money-input/money-input.component';
import { PrimaryButtonComponent } from './core/primary-button/primary-button.component';
import { ResultsComponent } from './results/results.component';
import { BackgroundComponent } from './card/background/background.component';
import { RequiredMessageComponent } from './core/required-message/required-message.component';
import { TaxFormComponent } from './tax-form/tax-form.component';
import { TaxBracketComponent } from './results/tax-bracket/tax-bracket.component';
import { ReturnButtonComponent } from './results/return-button/return-button.component';
import { CalculatorService } from './results/calculator.service';
import { TaxTotalComponent } from './results/tax-total/tax-total.component';

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, AppRoutingModule],
  declarations: [
    AppComponent,
    HomeComponent,
    CardComponent,
    SelectComponent,
    MoneyInputComponent,
    PrimaryButtonComponent,
    ResultsComponent,
    BackgroundComponent,
    RequiredMessageComponent,
    TaxFormComponent,
    TaxBracketComponent,
    ReturnButtonComponent,
    TaxTotalComponent
  ],
  bootstrap: [AppComponent],
  providers: [CalculatorService]
})
export class AppModule {}
