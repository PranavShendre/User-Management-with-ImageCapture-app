import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {

  loginForm! :FormGroup;

  ngOnInit():void{
    this.setForm();
  }

  constructor(
    private _login: LoginService,
    private _router: Router
  ){}

  setForm(){
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required , Validators.email]),
      password: new FormControl('', [Validators.required]),
      role: new FormControl('')
    });
  }

  submit(role: string){
    this.loginForm.patchValue({ role });
    console.log(this.loginForm.value);

    this._login.loginUser(this.loginForm.value).subscribe({next:(resp)=>{
      console.log(resp);

      this._router.navigate(['admin-dashboard']).then(()=>{
        alert("Login Successful");
      })

    },error:(err)=>{
      console.log(err);
      alert("Login failed");
    }})

  }
}
