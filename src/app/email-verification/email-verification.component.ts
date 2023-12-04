
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SecuirityService } from '../shared/Services/SecurityService/security.service';


@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent {
  email: string = '';


  constructor(private router:Router,
    private securityservice:SecuirityService,
    private snackBar: MatSnackBar) {}
 

  submitForm(email: string) {
   
    this.securityservice.GetQuestionsByLoginId(email).subscribe(
      (res) => {
        
        if (res && res.length > 0) {
          
          let questions = {
            
            question1: res[0].questionId1,
            question2: res[0].questionId2,
            question3: res[0].questionId3,
          };
          console.log(questions);
          sessionStorage.setItem('question', JSON.stringify(questions));
          this.router.navigate(['/varifyquestions'], {
            queryParams: { emailid: email },
          });
        } else {
         
          
          this.openSnackBar("Email not found", 'ok');
          const config = new MatSnackBarConfig();
          config.panelClass = ['custom-snackbar'];
          config.verticalPosition = 'top';
          this.openSnackBar("Email not found", 'ok');
        }
      },
      (error) => {
        const config = new MatSnackBarConfig();
        config.panelClass = ['custom-snackbar'];
        config.verticalPosition = 'top';
        this.snackBar.open('An error occurred', 'Close', config);
        console.error(error);
      }
    );
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  
}



