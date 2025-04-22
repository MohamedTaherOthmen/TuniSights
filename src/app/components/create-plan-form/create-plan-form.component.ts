import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GuidePlansListService } from '../../services/guide-plans-list.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-create-plan-form',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './create-plan-form.component.html',
  styleUrl: './create-plan-form.component.css'
})
export class CreatePlanFormComponent {

  constructor(public _s : GuidePlansListService){ }

  newPlan = {
    title: '',
    description: '',
    price: null,
    duration: null,
    image: '',
    status: 'active'
  };

   // Variables d'erreur simples
   titleError = false;
   descriptionError = false;
   priceError = false;
   durationError = false;



  add_new_plan() {

    //check inputs
    this.titleError = false;
    this.descriptionError = false;
    this.priceError = false;
    this.durationError = false;

    if (!this.newPlan.title) this.titleError = true;
    if (!this.newPlan.description) this.descriptionError = true;
    if (!this.newPlan.price || this.newPlan.price < 0) this.priceError = true;
    if (!this.newPlan.duration || this.newPlan.duration < 1 || this.newPlan.duration > 30) this.durationError = true;

    if (!this.titleError && !this.descriptionError && !this.priceError && !this.durationError) {

      this._s.plans_list.push( this.newPlan );
      this.resetForm();

    }
  }

  resetForm() {
    this.newPlan = {
      title: '',
      description: '',
      price: null,
      duration: null,
      image: '',
      status: 'active'
    };
  }


}
