import { TestBed } from '@angular/core/testing';

import { SecuirityService } from './security.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('SecuirityService', () => {
  let service: SecuirityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[SecuirityService]
    });
    service = TestBed.inject(SecuirityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('getAllQuestions',()=>{
    const data=[
      {
        "questionId": 12,
        "question": "What is the name of your favorite childhood friend?",
        "type": ""
      },
      {
        "questionId": 11,
        "question": "In what city or town was your first job?",
        "type": ""
      }]
    service.getAllQuestions().subscribe((r)=>{
      expect(r).toBe(data)
    })
  })
  it('postAnswer',()=>{
    const data=
      {
        "questionId": 12,
        "question": "What is the name of your favorite childhood friend?",
        "type": ""
      }
    service.postAnswer(data).subscribe((r)=>{
      expect(r).toBe(data)
    })
  })
  it('getValidateSecurityQnA',()=>{
    const data=
      {
        "questionId": 12,
        "question": "What is the name of your favorite childhood friend?",
        "type": ""
      }
    service.getValidateSecurityQnA(data).subscribe((r)=>{
      expect(r).toBe(data)
    })
  })
  it('UpdateQuestion',()=>{
    const data=
      {
        "questionId": 12,
        "question": "What is the name of your favorite childhood friend?",
        "type": ""
      }
    service.UpdateQuestion(12,data).subscribe((r)=>{
      expect(r).toBe(data)
    })
  })
  it('GetQuestionById',()=>{
    const data=
      {
        "questionId": 12,
        "question": "What is the name of your favorite childhood friend?",
        "type": ""
      }
    service.GetQuestionById(12).subscribe((r)=>{
      expect(r).toBe(data)
    })
  })
  it('GetAnswerById',()=>{
    const data=
      {
        "questionId": 12,
        "question": "What is the name of your favorite childhood friend?",
        "type": ""
      }
    service.GetAnswerById(12).subscribe((r)=>{
      expect(r).toBe(data)
    })
  })
  it('GetQuestionsByLoginId',()=>{
    const data=
      {
        "questionId": 12,
        "question": "What is the name of your favorite childhood friend?",
        "type": ""
      }
    service.GetQuestionsByLoginId(12).subscribe((r)=>{
      expect(r).toBe(data)
    })
  })
  it('StoreQuestionIds',()=>{
    const data=
      {
        "questionId": 12,
        "question": "What is the name of your favorite childhood friend?",
        "type": ""
      }
    service.StoreQuestionIds(12)
    
  })
  
  });
