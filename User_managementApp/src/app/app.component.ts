import { Component } from '@angular/core';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { WebcamImage } from 'ngx-webcam';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, 
    UserLoginComponent, 
    FormsModule, 
    ReactiveFormsModule, 
    UserDashboardComponent,
    AdminDashboardComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'user-management-app';

  webcamImage : WebcamImage | undefined;

  handleImage(webcamImage: WebcamImage){
    this.webcamImage = webcamImage;
  }

}
