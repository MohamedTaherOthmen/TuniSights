import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { GuidePlanService } from '../../services/guide-plan.service';

@Component({
  selector: 'app-guide-profile-settings',
  standalone: true,
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
  language_spoken: string = '';
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

  user_name: string = '';
  profile_url: string = '';

  loadGuideInfo(){
    const guide_id = localStorage.getItem('guide_id');
    if(guide_id){
      this.http.get<any>(`http://localhost/api/guideProfileLoad.php?guide_id=${guide_id}`).subscribe({
        next: response => {
          if(response.success){
            console.log(response.infos);
            this.first_name = response.infos.first_name;
            this.last_name = response.infos.last_name;
            this.email = response.infos.email;
            this.phone_number = response.infos.phone_number;
            this.city = response.infos.city;
            this.language_spoken = response.infos.languag_spoken;
            this.bio = response.infos.bio;
            this.experience_years = response.infos.experience_years;
            this.profile_picture_url = response.infos.profile_picture_url;
          }else{
            console.log(response.message);
            this.snackBar.open('Error During Fetching guide infos', 'close', {duration : 3000});
          }
        },
        error: error => {
          console.log(error.message);
          this.snackBar.open(error.message || 'Fatal Error Please Contact us', 'close', {duration : 3000});
        } 
      });
    }
  }

  ngOnInit():void{
    this.profile_url = localStorage.getItem('guide_image_url') || '';
    this.user_name = localStorage.getItem('guide_name') || '';
    this.loadGuideInfo();
  }

  logout(){
    localStorage.removeItem('guide_id');
    localStorage.removeItem('guide_name');
    this.snackBar.open('Logged out', 'Close', { duration: 3000 });
    this.router.navigate(['/login']);
  }

  
  
  
}
