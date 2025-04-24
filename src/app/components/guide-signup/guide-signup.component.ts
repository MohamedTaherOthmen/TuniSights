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
  confirm_password: string = '';


  //initialise error variables
  inputsError = {

    first_nameError: false,
    last_nameError: false,
    emailError: false,
    phoneError: false,
    cityError: false,
    languageError: false,
    bioError: false,
    passwordError: false,
    confirm_passwordError: false

  }

  constructor(
    private authSer: AuthService,
    private route: Router,
    private snackBar: MatSnackBar
  ){}

  onSubmit() {
    //check inputs
    this.inputsError.first_nameError = false;
    this.inputsError.last_nameError = false;
    this.inputsError.emailError = false;
    this.inputsError.phoneError = false;
    this.inputsError.cityError = false;
    this.inputsError.languageError = false;
    this.inputsError.bioError = false;
    this.inputsError.passwordError = false;
    this.inputsError.confirm_passwordError = false;


    if (!this.first_name) this.inputsError.first_nameError = true;
    if (!this.last_name) this.inputsError.last_nameError = true;
    if (!this.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) this.inputsError.emailError = true;
    if (!this.phone_number || !/^\+\d{1,4}\d{7,15}$/.test(this.phone_number)) this.inputsError.phoneError = true;
    if (!this.city || this.city === '') this.inputsError.cityError = true;
    if (!this.language || this.language === '') this.inputsError.languageError = true;
    if (!this.bio || this.bio.length < 100) this.inputsError.bioError = true;
    if (!this.password || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(this.password)) this.inputsError.passwordError = true;
    if (!this.password || this.password !== this.confirm_password) this.inputsError.confirm_passwordError = true;
    

    if (!this.inputsError.first_nameError && !this.inputsError.last_nameError && !this.inputsError.emailError && !this.inputsError.phoneError  && !this.inputsError.languageError && !this.inputsError.bioError && !this.inputsError.passwordError && !this.inputsError.confirm_passwordError) {
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

  /*onSubmit(){
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
  }*/

}

  
