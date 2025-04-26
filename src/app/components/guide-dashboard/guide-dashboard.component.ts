import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

//import { CreatePlanFormComponent } from '../create-plan-form/create-plan-form.component';
//import { GuidePlansListService } from '../../services/guide-plans-list.service';


@Component({
  selector: 'app-guide-dashboard',
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    MatSnackBarModule,
  ],
  templateUrl: './guide-dashboard.component.html',
  styleUrl: './guide-dashboard.component.css'
})
export class GuideDashboardComponent {

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ){ }

  ngOnInit(): void {
    this.checkAuthentication();
  }

  private checkAuthentication(): void {
    const guideId = localStorage.getItem('guide_id');
    if (!guideId) {
      this.snackBar.open('Please login first', 'Close', { duration: 3000 });
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    localStorage.removeItem('guide_id');
    localStorage.removeItem('guide_name');
    this.snackBar.open('Logged out', 'Close', { duration: 3000 });
    this.router.navigate(['/login']);
  }

}