import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  FaIconComponent,
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { faShoppingCart, faStoreAlt } from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [],
  imports: [CommonModule, FontAwesomeModule],
  exports: [FaIconComponent],
})
export class FaModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faStoreAlt, faShoppingCart);
  }
}
