import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { GuidePlanService } from '../../services/guide-plan.service';

@Component({
  selector: 'app-guide-profile-settings',
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    MatSnackBarModule,
  ],
  templateUrl: './guide-profile-settings.component.html',
  styleUrl: './guide-profile-settings.component.css'
})
export class GuideProfileSettingsComponent {

  first_name: string = '';
  last_name: string = '';
  email: string = '';
  phone_number: string = '';
  city: string = '';
  language: string = '';
  bio: string = '';
  experience_years: string = '';
  profile_picture_url: string = '';
  password: string = '';
  confirm_password: string = '';


  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    private PlanServ: GuidePlanService
  ){ }

  planList: any[] = [];
  user_name: string = '';
  profile_url: string = '';

  ngOnInit():void{
    this.profile_url = localStorage.getItem('guide_image_url') || '';
    this.user_name = localStorage.getItem('guide_name') || '';
  }

  logout(){
    localStorage.removeItem('guide_id');
    localStorage.removeItem('guide_name');
    this.snackBar.open('Logged out', 'Close', { duration: 3000 });
    this.router.navigate(['/login']);
  }

  
  
  
}
