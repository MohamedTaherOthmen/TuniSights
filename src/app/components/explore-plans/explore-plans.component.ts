import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // Fixed typo in import
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-explore-plans',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatSnackBarModule
  ],
  templateUrl: './explore-plans.component.html',
  styleUrl: './explore-plans.component.css'
})
export class ExplorePlansComponent {

  filter_btn_state = false;

  tours: any[] = []; // Initialize as empty array

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(){
    this.http.get<any>(`http://localhost/api/showPlansForTourist.php`).subscribe({
      next: response => {
        if (response.success){
          console.log('plans data fetched for this tourist !');
          console.log(response.tours);
          this.snackBar.open('Data fetched for this tourist', 'close', { duration: 3000 });
          this.tours = response.tours;
        } else {
          console.log("couldn't data extract plans !!");
          this.snackBar.open("Data couldn't extract for this plan !!", 'close', { duration: 3000 });
        }
      },
      error: error => {
        console.log('Error Fatal !!');
        this.snackBar.open('Error Fatal !!', 'close', { duration : 3000 });
      }
    });
  }

  searchTerm = '';
  selectedCity = 'All'; 
  maxPrice = 500;
  cities = ['All', 'Merzouga', 'Essaouira', 'Marrakech', 'Chefchaouen'];

  // Booking variables
  selectedTour: any = null;
  bookingDates = {
    start: '',
    guests: 1
  };

  // Filter tours based on search/filters
  get filteredTours() {
    return this.tours.filter(tour => {
      const matchesSearch = 
        (tour.plan_name?.toLowerCase().includes(this.searchTerm.toLowerCase())) || 
        (tour.city?.toLowerCase().includes(this.searchTerm.toLowerCase()));
      const matchesCity = this.selectedCity === 'All' || tour.city === this.selectedCity;
      const matchesPrice = tour.price <= this.maxPrice;
      
      return matchesSearch && matchesCity && matchesPrice;
    });
  }

  // Get highlighted tours
  get highlightedTours() {
    return this.filteredTours.filter(tour => tour.highlight);
  }

  // Select tour for booking
  selectTour(tour: any) {
    this.selectedTour = tour;
  }

  // Process booking
  bookTour() {
    if (this.selectedTour && this.bookingDates.start) {
      const bookingData = {
        tour: this.selectedTour,
        dates: this.bookingDates,
        total: this.selectedTour.price * this.bookingDates.guests
      };
      console.log('Booking:', bookingData);

      // Here you would typically call a payment service
      alert(`Booked ${this.selectedTour.title} for ${this.bookingDates.guests} guests!`);
      this.selectedTour = null;
    }
  }
}