import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tourist-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './tourist-signup.component.html',
  styleUrls: ['./tourist-signup.component.css']
})

export class TouristSignupComponent {
  
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
} 