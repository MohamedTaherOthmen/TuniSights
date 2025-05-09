import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-tourist-bookings',
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    MatSnackBarModule,
  ],
  templateUrl: './tourist-bookings.component.html',
  styleUrl: './tourist-bookings.component.css'
})
export class TouristBookingsComponent {

  filter_btn_state = false;



  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
  ){ }

  planList: any[] = [];
  user_name: string = '';
  profile_url: string = '';

  loadBookings(){
    const tourist_id = localStorage.getItem('tourist_id');
    if (tourist_id) {
      this.http.get<any>(`http://localhost/api/loadbookingstourist.php?tourist_id=${tourist_id}`)
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
    this.profile_url = localStorage.getItem('tourist_image_url') || '';
    this.user_name = localStorage.getItem('tourist_name') || '';
    
  }

  logout(){
    localStorage.removeItem('tourist_id');
    localStorage.removeItem('tourist_name');
    localStorage.removeItem('tourist_image_url');
    this.snackBar.open('Logged out', 'Close', { duration: 3000 });
    this.router.navigate(['/login']);
  }
    /*localStorage.clear();
    this.snackBar.open('Logged out', 'Close', { duration: 3000 });
    this.router.navigate(['/login']);*/

}
