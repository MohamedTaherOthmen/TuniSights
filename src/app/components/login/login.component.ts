import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    MatSnackBarModule
  ]
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authSer: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ){}

  onSubmit(){
    this.authSer.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next : response =>{
        if (response.success == true){
          this.snackBar.open('Welcome to TuniSights ', 'thanks !', {duration: 3000});
          this.router.navigate(['/welcome']);
        }else{
          this.snackBar.open(response.message || 'Sorry! Login failed !', 'close', {duration : 3000});
          this.router.navigate(['/signup']);
        }
      },
      error : error => {
        console.log(error.error);
        this.snackBar.open('Login error !! please contact us !', 'close', {duration : 3000});
      }
    });
  }
  
} 