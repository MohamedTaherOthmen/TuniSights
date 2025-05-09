import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-guide-bookings',
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    MatSnackBarModule,
  ],
  templateUrl: './guide-bookings.component.html',
  styleUrl: './guide-bookings.component.css'
})
export class GuideBookingsComponent {

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
  ){ }

  planList: any[] = [];
  user_name: string = '';
  profile_url: string = '';
  
  loadBookings(){
    const guide_id = localStorage.getItem('guide_id');
    if (guide_id) {
      this.http.get<any>(`http://localhost/api/loadbookings.php?guide_id=${guide_id}`)
        .subscribe({
          next: (response) => {
            if (response.success) {
              this.planList = response.plans;
            } else {
              this.snackBar.open('Error Loading Plans', 'close', {duration : 3000})
              console.error(response.message);
            }
          },
          error: (error) => {
            this.snackBar.open('Error Fetching Plans', 'close', {duration : 3000})
            console.error('Error fetching plans:', error.message);
          }
        });
    } else {
      console.error('Guide ID not found in localStorage');
      this.snackBar.open('Please Login first', 'close', {duration : 3000});
      this.router.navigate(['/login']);
    }
  }

  ngOnInit():void{
    this.loadBookings();
    this.profile_url = localStorage.getItem('guide_image_url') || '';
    this.user_name = localStorage.getItem('guide_name') || '';

  }

  logout(){
    localStorage.removeItem('guide_id');
    localStorage.removeItem('guide_name');
    localStorage.removeItem('guide_image_url');
    this.snackBar.open('Logged out', 'Close', { duration: 3000 });
    this.router.navigate(['/login']);
  }
    /*localStorage.clear();
    this.snackBar.open('Logged out', 'Close', { duration: 3000 });
    this.router.navigate(['/login']);*/

}
