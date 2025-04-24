import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

interface PlanResponse {
  success: boolean;
  message?: string;
  error?: string;
}

@Component({
  selector: 'app-create-plan-form',
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    MatSnackBarModule
  ],
  templateUrl: './create-plan-form.component.html',
  styleUrl: './create-plan-form.component.css'
})
export class CreatePlanFormComponent {
  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

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

  add_new_plan() {
    this.titleError = !this.title;
    this.descriptionError = !this.description;
    this.priceError = !this.price || this.price < 0;
    this.durationError = !this.duration || this.duration < 1 || this.duration > 30;

    if (!this.titleError && !this.descriptionError && !this.priceError && !this.durationError) {
      const guide_id = localStorage.getItem('guide_id');

      this.http.post<any>(`http://localhost/api/createplanguides.php?guide_id=${guide_id}`, {
        title: this.title,
        description: this.description,
        price: this.price,
        duration: this.duration,
        image: this.image,
        status: this.status,
        guide_id: guide_id
      }).subscribe({
        next: (response) => {
          if (response.success) {
            this.snackBar.open('Plan Created', 'close', { duration: 3000 });
            this.router.navigate(['/guide/dashboard']);
          } else {
            this.snackBar.open(response.message || response.error || 'Something went wrong.', 'close', { duration: 3000 });
            this.router.navigate(['/login']);
          }
        },
        error: (error) => {
          console.log(error.error);
          this.snackBar.open('Fatal Error! Please contact us!', 'close', { duration: 3000 });
          this.router.navigate(['/welcome']);
        }
      });

      this.resetForm();
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
