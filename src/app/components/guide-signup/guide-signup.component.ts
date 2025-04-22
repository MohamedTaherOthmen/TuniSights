import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Route, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';


@Component({
  selector: 'app-guide-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    MatSnackBarModule
  ],
  templateUrl: './guide-signup.component.html',
  styleUrls: ['./guide-signup.component.css']
})
export class GuideSignupComponent {
  
  // List of Tunisian cities for the dropdown
  cities: string[] = [
    'Tunis', 'Sfax', 'Sousse', 'Kairouan', 'Bizerte',
    'Gabès', 'Ariana', 'Gafsa', 'Monastir', 'Ben Arous',
    'Kasserine', 'Médenine', 'Nabeul', 'Tataouine', 'Béja',
    'Jendouba', 'El Kef', 'Mahdia', 'Sidi Bouzid', 'Tozeur',
    'Kebili', 'Zaghouan', 'Siliana', 'Manouba',
    'Other'
  ];
  
  // List of languages for the dropdown
  languages: string[] = [
    'Arabic', 'French', 'English', 'German', 'Italian',
    'Spanish', 'Russian', 'Chinese', 'Japanese', 'Korean',
    'Other'
  ];

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

  constructor(
    private authSer: AuthService,
    private route: Router,
    private snackBar: MatSnackBar
  ){}

  onSubmit(){
    this.authSer.signupguide({
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      phone_number: this.phone_number,
      city: this.city,
      language: this.language,
      bio: this.bio,
      experience_years: this.experience_years,
      profile_picture_url: this.profile_picture_url,
      password: this.password
    }).subscribe({
      next: response => {
        if (response.success){  
          console.log(response.message);
          this.snackBar.open('Account Created Succesfully', 'close', {duration:3000});
          this.route.navigate(['/login']);
        }else{
          console.log(response.message);
          this.snackBar.open('Error While Creating Account', 'close', {duration:3000});
          this.route.navigate(['/signup/guide']);
        }
      },
      error : error =>{
        console.log(error.message);
        this.snackBar.open('Error Occured while Creating Account', 'close', {duration:3000});
        this.route.navigate(['/signup/guide']);
      }
    })
  }

}

  
