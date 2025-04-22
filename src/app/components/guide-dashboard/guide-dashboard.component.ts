import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CreatePlanFormComponent } from '../create-plan-form/create-plan-form.component';
import { GuidePlansListService } from '../../guide-plans-list.service';


@Component({
  selector: 'app-guide-dashboard',
  imports: [FormsModule, CommonModule, RouterModule, CreatePlanFormComponent],
  templateUrl: './guide-dashboard.component.html',
  styleUrl: './guide-dashboard.component.css'
})
export class GuideDashboardComponent {

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


}
