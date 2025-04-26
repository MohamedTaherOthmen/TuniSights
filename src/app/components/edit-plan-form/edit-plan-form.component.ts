import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit-plan-form',
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './edit-plan-form.component.html',
  styleUrl: './edit-plan-form.component.css'
})
export class EditPlanFormComponent {


  title: string = '';
  description: string = '';
  price: any = null;
  duration: any = null;
  image: string = '';
  status: string = 'active';

  titleError = false;
  descriptionError = false;
  priceError = false;
  durationError = false;


  update_plan() {
    this.titleError = !this.title;
    this.descriptionError = !this.description;
    this.priceError = !this.price || this.price < 0;
    this.durationError = !this.duration || this.duration < 1 || this.duration > 30;

    if (!this.titleError && !this.descriptionError && !this.priceError && !this.durationError) {

      /* nik rouhek lenna ( const guide_id wsubcscribe
       wzebi wbaad tansech tnik reset form ahyka
       deja makhdouma just 3aytelha felkher )*/
    }
  }

  resetForm() {
    this.title = '';
    this.description = '';
    this.price = null;
    this.duration = null;
    this.image = '';
    this.status = 'active';
  }

}
