import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SecurityComponent } from '../security/security.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SecurityAnswerModel } from '../Models/SecurityAnswerModel';
import { ActivatedRoute, Router } from '@angular/router';
import { SecuirityService } from '../shared/Services/SecurityService/security.service';

@Component({
  selector: 'app-user-selected-questions',
  templateUrl: './user-selected-questions.component.html',
  styleUrls: ['./user-selected-questions.component.css']
})
export class UserSelectedQuestionsComponent {
  userQuestions: any[] = [];
  userData: any;
  questions: any;
  question1: number = 0;
  question2: number = 0;
  question3: number = 0;
  useremail: string = "";


  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;

  validationResult: string = '';

  constructor(private route: ActivatedRoute, private securityService: SecuirityService, private _formBuilder: FormBuilder, private snackBar: MatSnackBar, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.useremail = params['emailid'];
      console.log(params)

    });

    this.questions = JSON.parse(sessionStorage.getItem("question") as string);
    for (let key in this.questions) {
      if (this.questions.hasOwnProperty(key)) {
        const questionId = this.questions[key]
        this.securityService.GetQuestionById(questionId).subscribe(
          (res) => {
            console.log(res)
            const questionWithId = {
              id: questionId,
              question: res[0].question
            };
            this.userQuestions.push(questionWithId); 
           
          },
          (error) => {
            console.error('Error:', error);
          }
        );
      }
    }
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required],
    });
  }

  

  resetForm(stepper: MatStepper): void {
    stepper.reset();
    this.firstFormGroup.value.firstCtrl = '';
    this.secondFormGroup.value.secondCtrl = '';
    this.thirdFormGroup.value.thirdCtrl = '';
  }

 

  ValidateAnswers(formValues: FormValues) {
    const firstFormGroupValues = formValues.firstFormGroup;
    const secondFormGroupValues = formValues.secondFormGroup;
    const thirdFormGroupValues = formValues.thirdFormGroup;
    this.questions = JSON.parse(sessionStorage.getItem("question") as string);
    let obj = {
      emailId: this.useremail,
      questionId1: this.questions.question1,
      answer1: firstFormGroupValues.firstCtrl,
      questionId2: this.questions.question2,
      answer2: secondFormGroupValues.secondCtrl,
      questionId3: this.questions.question3,
      answer3: thirdFormGroupValues.thirdCtrl
    };
    // console.log(obj)
    this.securityService.getValidateSecurityQnA(obj).subscribe(
      (res) => {

        this.snackBar.open(res, '', {
          duration: 1000, 
        });
        
        this.firstFormGroup.value.firstCtrl = '';
        this.secondFormGroup.value.secondCtrl = '';
        this.thirdFormGroup.value.thirdCtrl = '';

        if (res === 'Email Verified Successfully') {
          setTimeout(() => {
            this.router.navigate(['/ChangePassword'],
              { queryParams: { forgotpassword: 'true', emailid: this.useremail } })
          }, 1500);
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );

  }

}

interface FormValues {
  firstFormGroup: any;
  secondFormGroup: any;
  thirdFormGroup: any;
}

