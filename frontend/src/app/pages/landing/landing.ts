import { Component } from '@angular/core';
import { PostCard } from "../../components/post-card/post-card";

@Component({
  selector: 'app-landing',
  imports: [PostCard],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class LandingComponent {

}
