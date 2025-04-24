import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-explore-plans',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './explore-plans.component.html',
  styleUrl: './explore-plans.component.css'
})
export class ExplorePlansComponent {


  filter_btn_state = false;

  // Sample tour data
  tours = [
    {
      id: 1,
      title: 'Sahara Adventure',
      city: 'Merzouga',
      price: 299,
      duration: 3,
      image: 'https://www.tacapes-tours.com/wp-content/uploads/2020/05/Bivouac-2-min.jpg',
      rating: 4.8,
      highlight: true
    },
    {
      id: 2,
      title: 'Coastal Escape',
      city: 'Essaouira',
      price: 199,
      duration: 2,
      image: 'https://lh6.googleusercontent.com/proxy/oWyxCtVTf03yt7IFbVP-We6oPmJsM17mIKg4beJUyMxN0n-Hse9o_VOU8ynAgM3eDbxTEx7cXsakww7KedkBcvhqRo_x_hZXEDF3rgal257dkvJNDC96HUnqlOFHwlL5WANEGXTKagX31Rhj8HIXCqZLragm6gyxrwjOlxlZY2d30W3cyw',
      rating: 4.5,
      highlight: false
    },
    // Add more tours...
  ];

  // Filter/Search variables
  searchTerm = '';
  selectedCity = '';
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
      const matchesSearch = tour.title.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
                          tour.city.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCity = this.selectedCity === 'All' || tour.city === this.selectedCity;
      const matchesPrice = tour.price <= this.maxPrice;
      
      return matchesSearch && matchesCity && matchesPrice;
    });
  }

  // Get highlighted tours
  get highlightedTours() {
    return this.tours.filter(tour => tour.highlight);
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
