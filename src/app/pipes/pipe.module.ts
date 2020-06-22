import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotePipePipe } from './quote-pipe.pipe';



@NgModule({
  declarations: [QuotePipePipe],
  imports: [
    CommonModule
  ],
  exports: [
    QuotePipePipe
  ]
})
export class PipeModule { }
