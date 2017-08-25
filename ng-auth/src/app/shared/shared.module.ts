import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { ShowAuthedDirective } from './show-authed.directive';
import { ListErrorsComponent } from './list-errors/list-errors.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule
  ],
  exports: [
    ShowAuthedDirective,
    ListErrorsComponent
  ],
  declarations: [
    ShowAuthedDirective,
    ListErrorsComponent
  ],
  providers: [],
})
export class SharedModule { }
