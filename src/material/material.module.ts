import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule} from '@angular/material/paginator';

const MaterialComponent = [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatPaginatorModule
]

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      MaterialComponent
    ],
    exports: [
      MaterialComponent
    ]
  })
  export class MaterialModule { }