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

  loadPlan(){
    const guide_id = localStorage.getItem('guide_id');
    if (guide_id) {
      this.http.get<any>(`http://localhost/api/get_guide_plans.php?guide_id=${guide_id}`)
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
      this.snackBar.open('Please Login aasba', 'close', {duration : 3000});
      this.router.navigate(['/login']);
    }
  }

  ngOnInit():void{
    this.loadPlan();
  }

  logout(){
    localStorage.removeItem('guide_id');
    localStorage.removeItem('guide_name');
    this.snackBar.open('Logged out', 'Close', { duration: 3000 });
    this.router.navigate(['/login']);
  }
    /*localStorage.clear();
    this.snackBar.open('Logged out', 'Close', { duration: 3000 });
    this.router.navigate(['/login']);*/

  edit_plan(id: any) {

  }

  trash_btn_state = true;

  delete_plan(id_plan: any) {
    const guide_id = localStorage.getItem('guide_id');
    if (guide_id){
      this.http.post<any>(`http://localhost/api/delete_guide_plans.php?guide_id=${guide_id}`, {
        id : id_plan
      }).subscribe({
        next: (response) => {
          if (response.success){
            this.snackBar.open('Plan Deleted', 'close', {duration : 3000});
            this.loadPlan();
          } else {
            this.snackBar.open('Error Deleting Plan', 'close', {duration : 3000});
            console.log(response.message);
          }
        },
        error: (error) => {
          this.snackBar.open('DataBase Error, Contact us please', 'close', {duration : 3000})
          console.log('Error deleting plans:', error.message);
        }
      });
    } else {
      console.error('Guide ID not found in localStorage');
      this.snackBar.open('Please Login', 'close', {duration : 3000});
      this.router.navigate(['/login']);
    }
  }

}
