import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

//backend
//import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-guide-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
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
}

  
