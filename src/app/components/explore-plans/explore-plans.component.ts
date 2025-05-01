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

  tours: any[] = [];
  user_name: string = '';
  profile_url: string = '';



  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(){
    this.checkAuthentication();
    this.profile_url = localStorage.getItem('tourist_image_url') || '';
    this.user_name = localStorage.getItem('tourist_name')|| '';
    let tourist_id = localStorage.getItem('tourist_id');
    if (tourist_id){
      this.http.get<any>(`http://localhost/api/showPlansForTourist.php?tourist_id=${tourist_id}`).subscribe({
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
          this.router.navigate(['/login']);
        }
      });
    }
  }

  add_wishlisht(plan_id: any){

  }

  private checkAuthentication(): void {
    const tourist_id = localStorage.getItem('tourist_id');
    if (!tourist_id) {
      this.snackBar.open('Please login first', 'Close', { duration: 3000 });
      this.router.navigate(['/login']);
    }
  }

  searchTerm = '';
  selectedCity = 'All'; 
  maxPrice = 500;
  cities = ['All', 'Merzouga', 'Essaouira', 'Marrakech', 'Chefchaouen'];

  // Booking variables
  selectedTour: any = null;
  id_tour: any;
  bookingDates = {
    start: '',
    guests: 1,
    notes: ''
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
    this.id_tour = tour.id;
  }

  // Process booking
  bookTour(plan: any) {
    if (this.selectedTour && this.bookingDates.start && this.bookingDates.notes) {
      let tourist_id = localStorage.getItem('tourist_id'); 
      if(tourist_id){
        this.http.post<any>('http://localhost/api/planbook.php', {
          dates: this.bookingDates.start,
          participants: this.bookingDates.guests,
          total: this.selectedTour.price * this.bookingDates.guests,
          status: "pending",
          tourist_id: tourist_id,
          plan_id: this.id_tour,
          notes: this.bookingDates.notes
        }).subscribe({
          next: response =>{
            if(response.success){
              console.log(response.message);
              this.snackBar.open('Plan booked successfully !!', 'close', { duration: 3000 });
              this.router.navigate(['/tourist/explore']);  
            }else{
              console.log(response.message);
              this.snackBar.open('Error while reserving !!', 'close', { duration: 3000 });
              this.router.navigate(['/tourist/explore']);
            }
          },
          error: error =>{
            console.log(error.message);
            this.snackBar.open('Error Occuring while booking !!', 'close', { duration: 3000 });
            this.router.navigate(['/tourist/explore']);
          }
        });
        this.selectedTour = null;
        this.id_tour = null
      }
    }
  }
 
  logout(): void{
    localStorage.removeItem('tourist_id');
    localStorage.removeItem('tourist_name');
    localStorage.removeItem('tourist_image_url');
    this.snackBar.open('Logged out', 'Close', { duration: 3000 });
    this.router.navigate(['/login']);
  }
}