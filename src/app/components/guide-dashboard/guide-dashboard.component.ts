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


  edit_plan() {

  }
  delete_plan() {
    
  }


}
