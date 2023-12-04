
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';


import { SecurityAnswerModel } from 'src/app/Models/SecurityAnswerModel';
import { SecuirityService } from '../shared/Services/SecurityService/security.service';


@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent {

  answer: any[] = [];
  questions: any[] = [];
  resultloader: boolean = false;
  submitted: boolean = false;
  securityForm!: FormGroup;
  securityQuestions: SecurityAnswerModel[] = [];

  userData: any;

  selected1 = '';
  selected2 = '';
  selected3 = '';
  ans1: string = '';
  ans2: string = '';
  ans3: string = '';


  availableOptions: any = {
    question1: [],
    question2: [],
    question3: []
  };


  selectedQuestions: string[] = [];
  LoginId: string = "";
  questionId: string = "";
  question: string = "";

  constructor(private service: SecuirityService, private route: Router, private http: HttpClient) { }

  ngOnInit(): void {
    
    this.securityForm = new FormGroup({
      selected1: new FormControl('', Validators.required),
      ans1: new FormControl('', Validators.required),
      selected2: new FormControl('', Validators.required),
      ans2: new FormControl('', Validators.required),
      selected3: new FormControl('', Validators.required),
      ans3: new FormControl('', Validators.required)
    });

    this.service.getAllQuestions().subscribe(result => {
      this.questions = result;
      console.log(result)

    });

    let userInfo = JSON.parse(sessionStorage.getItem('userData') as string);
    let emailId = userInfo.EmailId;
    this.LoginId = userInfo.EmailId;
    //  console.log(userInfo)

    let httpParams = new HttpParams().append("emailId", emailId);
    this.service.GetAnswerById(httpParams).subscribe((data) => {
      this.answer = data;

    });

  }

  onSubmit() {
    const selectedQuestionIds = [
      this.securityForm.value.selected1,
      this.securityForm.value.selected2,
      this.securityForm.value.selected3
    ];


    const duplicateQuestion = selectedQuestionIds.some((questionId, index) =>
      selectedQuestionIds.indexOf(questionId) !== index
    );

    if (duplicateQuestion) {

      alert("You cannot select the same question multiple times");
      this.securityForm.reset();
      return;
    }


    this.selectedQuestions = selectedQuestionIds;



    this.ans1 = this.securityForm.value.ans1;
    this.ans2 = this.securityForm.value.ans2;
    this.ans3 = this.securityForm.value.ans3;

    this.toCreate();
    this.submitted = true;
    if (this.securityForm.invalid) {
      return;
    }

  }

  toCreate() {
    let userInfo = JSON.parse(sessionStorage.getItem('userData') as string);
    console.log(userInfo)

    let formValue = this.securityForm.value;
    let data = {
      answerId: 0,
      emailId: userInfo.EmailId,
      questionId1: formValue.selected1,
      answer1: formValue.ans1,
      questionId2: formValue.selected2,
      answer2: formValue.ans2,
      questionId3: formValue.selected3,
      answer3: formValue.ans3,
      type: 'post'
    };
    console.log(data)
    this.service.postAnswer(data).subscribe((res) => {
      alert('Security Question and Answer Set');
      sessionStorage.clear();
      this.route.navigate(["/"]);
    });
  }






}


