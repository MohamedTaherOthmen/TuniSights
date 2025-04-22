import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuidePlansListService {

  constructor() { }


  plans_list :any[] = [
    {
      id: 1,
      title: 'Sahara Desert Adventure',
      description: '3-day camel trek with overnight camping',
      price: 120,
      duration: 3,
      image: 'https://www.tacapes-tours.com/wp-content/uploads/2020/05/Bivouac-2-min.jpg',
      status: 'active'
    },
    {
    id: 2,
    title: 'Ancient Carthage Tour',
    description: 'Historical tour of Carthage ruins',
    price: 80,
    duration: 1,
    image: 'https://cdn.tripspoint.com/uploads/photos/9779/tunis-carthage-sidi-bou-said-and-medina-private-day-tour_QeBt7.jpeg',
    status: 'active'
    }
  ];

}
