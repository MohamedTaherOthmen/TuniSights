import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GuidePlansListService } from '../../services/guide-plans-list.service';


@Component({
  selector: 'app-create-plan-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './create-plan-form.component.html',
  styleUrl: './create-plan-form.component.css'
})
export class CreatePlanFormComponent {

  constructor(public _s : GuidePlansListService){ }

  newPlan_1 = {
    id: 1,
    title: 'Sahara Desert Adventure',
    description: '3-day camel trek with overnight camping',
    price: 120,
    duration: 3,
    image: 'https://www.tacapes-tours.com/wp-content/uploads/2020/05/Bivouac-2-min.jpg',
    status: 'active'
  };

  newPlan_2 = {
    id: 2,
    title: 'Ancient Carthage Tour',
    description: 'Historical tour of Carthage ruins',
    price: 80,
    duration: 1,
    image: 'https://cdn.tripspoint.com/uploads/photos/9779/tunis-carthage-sidi-bou-said-and-medina-private-day-tour_QeBt7.jpeg',
    status: 'active'
  };

  newPlan = {
    title: '',
    description: '',
    price: 0,
    duration: 1,
    image: ''
  };

  add_new_plan() {
    this._s.plans_list.push( this.newPlan );
    this.resetForm();
  }

  resetForm() {
    this.newPlan = {
      title: '',
      description: '',
      price: 0,
      duration: 1,
      image: ''
    };
  }


}
