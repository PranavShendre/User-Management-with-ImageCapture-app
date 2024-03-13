import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { RegisterService } from '../../services/register.service';
import { CoreService } from '../../core/core.service';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-add-edit-user',
  standalone: true,
  imports: [MatToolbarModule, 
    MatIconModule,
    MatButtonModule, 
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
  FormsModule,
ReactiveFormsModule],
  templateUrl: './add-edit-user.component.html',
  styleUrl: './add-edit-user.component.css'
})
export class AddEditUserComponent {
  hide = true;

  empForm! :FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _register: RegisterService,
    private _userService: UserDataService,
    private _dialogRef: DialogRef<AddEditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
     ){
      this.empForm = this._fb.group({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        gender: '',
        role: ''
      })
  }

  ngOnInit():void{
    this.empForm.patchValue(this.data);
  }

  setForm(){
    this.empForm = new FormGroup({
      firstName: new FormControl('', [Validators.required ]),
      lastName: new FormControl('', [Validators.required ]),
      email: new FormControl('', [Validators.required , Validators.email]),
      password: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required ]),
      role: new FormControl('')
    });
  }

  submit(){
    // console.log(this.empForm.value);
    // this._register.registerUser(this.empForm.value).subscribe((data)=>{
    //   console.log(data);
    // })

    // if(this.empForm.valid){
    //   this._dialogRef.close();
    //   alert("User Added Successfully");
    // }

    if (this.empForm.valid) {
      if (this.data) {
        this._userService
          .updateUser(this.data.id, this.empForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Employee detail updated!');
              this._dialogRef.close();
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._register.registerUser(this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Employee added successfully');
            this._dialogRef.close();
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
 
}
