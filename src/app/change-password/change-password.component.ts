import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { sequenceEqual } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ChangePasswordService } from '../shared/Services/ChangePasswordService/change-password.service';
import { AuthService } from '../shared/Services/AuthService/auth.service';
import { JsonPipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  submitted = false;
  isAuthor: boolean = false;
  passwordsMatch = true;
  passwordMatchError: string;
  oldPasswordMatchWithNew = true;
  oldPasswordMatchWithNewError: string;
  emailId: string;
  errorMessage: string;
  oldPasswordIsWrong: string;
  updatedSuccessfully: string;
  updatedSuccessfullyCounts: number[] = [];
  oldPasswordIsWrongCounts: number[] = [];
  passwordUpdated = false;
  prevUpdatedSuccessfullyCount: number = 0;
  prevOldPasswordIsWrongCount: number = 0;

  hideCurrentPassword: boolean;
  hideNewPassword: boolean;
  currentPassword!: string;
  newPassword!: string;
  newPasswordConfirm!: string;
  disableSubmit!: boolean;
  firstLogin: boolean = false;
  IsForgotPassword: boolean = false;
  useremail: string = "";

  constructor(private service: ChangePasswordService,
    private router: Router, private route: ActivatedRoute,
    public authservice: AuthService,private snackBar: MatSnackBar) {
    this.hideCurrentPassword = true;
    this.hideNewPassword = true;

  }

  ngOnInit(): void {

    if (this.authservice.loggedIn()) {
      let data = JSON.parse(sessionStorage.getItem('userData') as string);

      this.firstLogin = data.IsFirstLogin;
    }
    this.route.queryParams.subscribe(params => {
      this.IsForgotPassword = params['forgotpassword'] === 'true' ? true : false;
      console.log(params)
      this.useremail = params['emailid'];
      console.log(this.useremail)
    });
    if (this.authservice.loggedIn()) {
      this.emailId = this.getEmailId();
    }

    // this.isAuthor = JSON.parse(sessionStorage.getItem('author') ?? '');
  }
  passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+~`|}{[\]:;?><,./-]).{6,}$/

  passwordForm = new FormGroup({

    oldPw: new FormControl('', [Validators.required]),
    newPw: new FormControl('', [Validators.required, Validators.pattern(this.passwordPattern)]),
    confirmPw: new FormControl('', [Validators.required]),
    emailId: new FormControl('', [Validators.required])

  })
  getEmailId(): any {
    let data = sessionStorage.getItem('userData');
    let userInfo = (data) ? JSON.parse(data) : null;
    return userInfo.EmailId;

  }

  get f() { return this.passwordForm.controls; }

  OnSubmitForForgot() {
    this.submitted = true;
    this.passwordsMatch = this.f.newPw.value === this.f.confirmPw.value;
    console.log(this.passwordForm)
    if (this.f.newPw.value != null && this.f.confirmPw.value != null) {

      let formValue = this.passwordForm.value;
      let obj =
      {
        emailId: this.useremail,
        newPassword: formValue.newPw,
        type: "UpdatePWDForForgot",
      };
      if (!this.passwordsMatch) {
        this.openSnackBar("Confirm Password does not match with the New Password","ok")
        return;
      }
      console.log(obj)
      this.service.UpdatePasswordData(obj).subscribe((response) => {
        if (response.count1 === 1) {
          alert("Your Password is updated Successfully");
          this.updatedSuccessfully = "Your Password is updated Successfully";
          this.passwordUpdated = true;
          sessionStorage.clear();
          this.router.navigate(["/"]);
        }
      },
        (error) => {
          console.log('Error:', error);
        });

    }

  }

  onSubmit() {
    this.submitted = true;
    this.passwordsMatch = this.f.newPw.value === this.f.confirmPw.value;
    this.oldPasswordMatchWithNew = this.f.oldPw.value !== this.f.newPw.value
    if (this.passwordForm.valid) {
      let formValue = this.passwordForm.value;
      let obj = {
        emailId: formValue.emailId,
        oldPassword: formValue.oldPw,
        newPassword: formValue.newPw,
        type: "post",
      };

      if (!this.passwordsMatch) {
        
        this.openSnackBar("Confirm Password does not match with the New Password","ok")
        return;
      }

      if (!this.oldPasswordMatchWithNew) {
       
        this.openSnackBar("Old Password and New Password should not be the same","ok")
        return;
      }
      if (this.passwordForm.valid) {
        console.log(obj)
        this.service.UpdatePasswordData(obj).subscribe((response) => {
          console.log(response)
          if (response.count1 === 1) {
            alert("Your Password is updated Successfully");
            this.updatedSuccessfully = "Your Password is updated Successfully";
            this.updatedSuccessfullyCounts.push(1);
            this.passwordUpdated = true;
            this.oldPasswordIsWrongCounts = [];
          }
          if (response.count2 === 2) {
            this.oldPasswordIsWrong = "You Have Entered the Wrong Password";
            this.oldPasswordIsWrongCounts.push(1);
          }
          if (this.firstLogin === true) {

            this.router.navigate(["/securityPage"]);

            this.passwordForm.reset();
          }
          else {
            console.log("heyyyyyyyyyyyy")
            this.router.navigate(['/dashboard']);
          }
        },
          (error) => {
            console.log('Error:', error);
          }
        );
      } else {
        this.errorMessage = "Invalid Credentials";
        alert(this.errorMessage);
      }
    }
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}

