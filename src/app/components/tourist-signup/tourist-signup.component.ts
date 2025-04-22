import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tourist-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule],
  templateUrl: './tourist-signup.component.html',
  styleUrls: ['./tourist-signup.component.css']
})

export class TouristSignupComponent {

  first_name = '';
  last_name = '';
  email = '';
  phone = '';
  country = '';
  password = '';
  confirm_password = '';
  
  // List of countries for the dropdown
  countries: string[] = [
    'Tunisia', 'Algeria', 'Morocco', 'Egypt', 'France', 
    'Germany', 'Italy', 'Spain', 'United Kingdom', 'United States', 
    'Canada', 'Other'
  ];

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

  login = false;

  //initialise error variables
  inputsError = {

    first_nameError: false,
    last_nameError: false,
    emailError: false,
    phoneError: false,
    countryError: false,
    passwordError: false,
    confirm_passwordError: false

  }
  

  add_new_tourist() {

    //check inputs
    this.inputsError.first_nameError = false;
    this.inputsError.last_nameError = false;
    this.inputsError.emailError = false;
    this.inputsError.phoneError = false;
    this.inputsError.countryError = false;
    this.inputsError.passwordError = false;
    this.inputsError.confirm_passwordError = false;


    if (!this.first_name) this.inputsError.first_nameError = true;
    if (!this.last_name) this.inputsError.last_nameError = true;
    if (!this.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) this.inputsError.emailError = true;
    if (!this.phone || !/^\+\d{1,4}\d{7,15}$/.test(this.phone)) this.inputsError.phoneError = true;
    if (this.country) this.inputsError.countryError = true;
    if (!this.password || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(this.password)) this.inputsError.passwordError = true;
    if (!this.password || this.password !== this.confirm_password) this.inputsError.confirm_passwordError = true;
    

    if (!this.inputsError.first_nameError && !this.inputsError.last_nameError && !this.inputsError.emailError && !this.inputsError.phoneError && !this.inputsError.countryError && !this.inputsError.passwordError && !this.inputsError.confirm_passwordError) {
      this.login = true;
    }
  }
  
    

} 