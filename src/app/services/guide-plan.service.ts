import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuidePlanService{
  private planid: string = '';
  
  get plan_id(): string{
    return this.planid || localStorage.getItem('plan_id') || '';
  }

  set plan_id(id: string){
    this.planid = id;
    localStorage.setItem('plan_id', id);
  }

  constructor() {}
}