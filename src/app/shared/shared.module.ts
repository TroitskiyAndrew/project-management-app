import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalContainerComponent } from './components/modal-container/modal-container.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    ModalContainerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    ModalContainerComponent
  ]
})
export class SharedModule { }
