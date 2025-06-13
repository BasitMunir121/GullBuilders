import { Component } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-crossbutton',
  standalone: true,
  imports: [ MaterialModule],
  templateUrl: './crossbutton.component.html',
  styleUrl: './crossbutton.component.scss'
})
export class CrossbuttonComponent {

}
