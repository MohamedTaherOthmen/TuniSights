import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { GuidePlanService } from '../../services/guide-plan.service';

@Component({
  selector: 'app-tourist-wishlist',
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    MatSnackBarModule,
  ],
  templateUrl: './tourist-wishlist.component.html',
  styleUrl: './tourist-wishlist.component.css'
})
export class TouristWishlistComponent {


  filter_btn_state = false;

  
  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    private PlanServ: GuidePlanService
  ){ }

  planList: any[] = [];
  user_name: string = '';
  profile_url: string = '';


  loadPlan(){
    const guide_id = localStorage.getItem('tourist_id');
    if (guide_id) {
      this.http.get<any>(`http://localhost/api/whishlistplans.php?tourist_id=${guide_id}`)
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
      this.snackBar.open('Please Login', 'close', {duration : 3000});
      this.router.navigate(['/login']);
    }
  }

  ngOnInit():void{
    this.loadPlan();
    this.profile_url = localStorage.getItem('guide_image_url') || '';
    this.user_name = localStorage.getItem('guide_name') || '';
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
      this.snackBar.open('Please Login first', 'close', {duration : 3000});
      this.router.navigate(['/login']);
    }
  }

}
