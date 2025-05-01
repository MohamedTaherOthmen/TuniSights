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
  standalone: true,
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
  ){}

  ngOnInit(): void {
    this.LoadStatus();
    this.checkAuthentication();
  }

  earnings: number = 0;
  upcomingTours: number = 0;
  TomorrowTours: number = 0;
  rating: number = 0.0;
  TotalBooking: number = 0;
  WeekBookings: number = 0;
  increaseEarningsP: number = 0;

  private LoadStatus(){
    let guide_id = localStorage.getItem('guide_id');
    if (guide_id){
      this.http.get<any>(`http://localhost/api/loadStatus.php?guide_id=${guide_id}`).subscribe({
        next: response=>{
          if(response.success){
            console.log(response.stats);
            this.TotalBooking = response.stats.TotalBookings;
            this.earnings = response.stats.TotalEarnings;
            this.upcomingTours = response.upComing.UpcomingTours; 
            this.TomorrowTours = response.tomorrowTours.bookings_tomorrow;
            this.WeekBookings = response.thisWeek.bookings_this_week;
            this.increaseEarningsP = response.growth_percentage;
          }else{
            console.log(response.message);
            this.snackBar.open('Error While Loading Status', 'close', {duration : 3000});
          }
        },
        error: error=>{
          console.log(error.message);
          this.snackBar.open('Fatal Error !!', 'close', {duration : 3000});
        }
      });
    }
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