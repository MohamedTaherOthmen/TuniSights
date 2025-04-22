import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GuideSignupComponent } from "./components/guide-signup/guide-signup.component";
import { WelcomeComponent } from "./components/welcome/welcome.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GuideSignupComponent, WelcomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TuniSights';
}
