import { Component, OnInit } from '@angular/core';
import { PostCard } from "../../components/post-card/post-card";
import { ApiService } from "../../services/api.service"
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-landing',
  imports: [PostCard, CommonModule],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class LandingComponent implements OnInit {
  constructor(public apiService: ApiService) { }  

  ngOnInit() {
    this.apiService.loadAll();  
  }

  filterChanged(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.apiService.setFilter(value);
  }

  prevPage() {
    this.apiService.prevPage();
  }

  nextPage() {
    this.apiService.nextPage();
  }
}
