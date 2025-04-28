import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { GuidePlanService } from '../../services/guide-plan.service';
import { response } from 'express';

@Component({
  selector: 'app-edit-plan-form',
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    RouterModule,
    MatSnackBarModule
  ],
  templateUrl: './edit-plan-form.component.html',
  styleUrl: './edit-plan-form.component.css',
  standalone: true
})
export class EditPlanFormComponent {

  guide_id = localStorage.getItem('guide_id');

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

  constructor(
    private http: HttpClient,
    private PlanServ: GuidePlanService,
    private snackBar: MatSnackBar,
    private router: Router
  ){}

  ngOnInit() {
    const id_p = this.PlanServ.plan_id;
    
    if (!id_p) {
      this.snackBar.open('No plan selected for editing', 'close', {duration: 3000});
      return;
    }
  
    this.http.get<any>(`http://localhost/api/showplan.php?id_plan=${id_p}`).subscribe({
      next: response => {
        if(response.success && response.plans.length > 0){
          const plan = response.plans[0];
          this.title = plan.plan_name;
          this.description = plan.description;
          this.price = plan.price;
          this.duration = plan.duration;
          this.image = plan.image_url;
          this.status = plan.status
        }else{
          this.snackBar.open("Error loading plan data", 'close', {duration: 3000});
        }
      },
      error: error => {
        this.snackBar.open("Connection error", 'close', {duration: 3000});
      }
    });  
  }

  update_plan() {
    this.titleError = !this.title;
    this.descriptionError = !this.description;
    this.priceError = !this.price || this.price < 0;
    this.durationError = !this.duration || this.duration < 1 || this.duration > 30;
    
    if (!this.titleError && !this.descriptionError && !this.priceError && !this.durationError) {
      const id_p = this.PlanServ.plan_id;
      this.http.post<any>(`http://localhost/api/editplan.php`, {
        id_plan: id_p, 
        title: this.title,
        description: this.description,
        price: this.price,
        duration: this.duration,
        image: this.image,
        status: this.status
      }).subscribe({
        next: response => {
          if (response.success) {
            this.snackBar.open('Plan Updated Successfully !!', 'close', {duration: 3000});
            this.router.navigate(["/guide/plans"]);
          } else {
            this.snackBar.open(response.message || 'Update failed', 'close', {duration: 3000});
            this.router.navigate(["/guide/plans"]);
          }
        },
        error: error => {
          this.snackBar.open('Connection error', 'close', {duration: 3000});
          this.router.navigate(["/guide/plans"]);
        }
      });
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
