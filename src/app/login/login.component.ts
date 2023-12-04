import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../shared/Services/LoginService/login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  submitted: boolean = false
  userData: any;
  resultloader: boolean = false;
  loaderTimeout: any;
  errorMessage: string;
  showError: boolean = false;
  isAuthor: boolean = false;
  userName: string;
  count: number = 0;
  public isChecked = false;

  @Output() eventChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private service: LoginService, private router: Router, private commonservice: CommonService) { }

  ngOnInit(): void { }


  loginForm = new FormGroup({
    loginName: new FormControl('', [Validators.required]),
    loginPassword: new FormControl('', [Validators.required]),
  })

  onSubmit() {

    this.submitted = true;
    if (this.loginForm.invalid) {
      this.markAllFieldsAsTouched();
      alert("Invalid Credentials");
      return;
    } else {

      this.checkUserisValid();

      let count = 0;
      setInterval(() => {
        count++;

        if (this.resultloader = false) {

        }
      }, 2000);
    }
  }
  isFieldInvalid(fieldName: string): boolean {
    const control = this.loginForm.get(fieldName);
    return control !== null && control.invalid && (control.touched || this.submitted);
  }


  markAllFieldsAsTouched() {
    const formControls = this.loginForm.controls as { [key: string]: FormControl };
    Object.keys(formControls).forEach(fieldName => {
      const control = formControls[fieldName];
      control.markAsTouched();
    });
  }



  get f() { return this.loginForm.controls; }

  async checkUserisValid() {

    if (this.loginForm.valid) {
      let formValue = this.loginForm.value;
      let httpParams = new HttpParams()
        .append("emailId", formValue.loginName ?? '')
        .append("loginPassword", formValue.loginPassword ?? '');
      this.loaderTimeout = setTimeout(() => {
        this.resultloader = true;
      }, 1000);


      try {

        const res = await this.service.GetUserData(httpParams).toPromise();
        console.log(res)
        clearTimeout(this.loaderTimeout);

        if (res.Status == 1) {
          console.log(this.commonservice.FromLogin(true));

          this.eventChange.emit(this.isChecked);
          this.resultloader = false;
          this.userData = res;
          if (this.userData.PermissionName.toLowerCase() == "edit") {
            sessionStorage.setItem("author", "true");
          }

          sessionStorage.setItem("userData", JSON.stringify(this.userData));
          this.loginForm.reset();

          if (res.IsFirstLogin == true) {
            this.router.navigate(["/ChangePassword"]);

          }
          else {

            this.router.navigate(["/dashboard"]).then(() => {
              window.location.reload();
            });

          }
        }

        else if (res.Status == "0" && (res.FailureAttempts >= 1 && res.FailureAttempts < 3)) {
          this.errorMessage = "Invalid Credentials. You are left with " + (3 - res.FailureAttempts) + " more attempt";

        }
        else if (res.Status == 0 && res.FailureAttempts >= 3) {
          this.errorMessage = "Your Account is Locked.";
        }


      }
      catch (err: any) {
        console.log(err)
        clearTimeout(this.loaderTimeout);
        this.resultloader = true;
        if (err.status === 0) {
          this.router.navigate(["/server-down"]);
          this.showError = true;
        }
        else {
          this.errorMessage = "Username or Password is Incorrect";

        }
      }

    }
  }





}
