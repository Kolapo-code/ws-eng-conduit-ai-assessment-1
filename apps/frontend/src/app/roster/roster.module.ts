import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RosterComponent } from './roster.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [RosterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: RosterComponent }])
  ]
})
export class RosterModule { }