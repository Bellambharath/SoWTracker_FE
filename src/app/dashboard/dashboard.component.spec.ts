import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from '../shared/Services/DashbordService/dashboard.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { Chart, ChartTypeRegistry, registerables } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../common.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockDashboardService: any, mockSODashboardData: any, mockrouter: any,
    mockroute: any, mockcommonservice: any
  Chart.register(...registerables);
  beforeEach(() => {
    mockDashboardService = jasmine.createSpyObj('DashboardService', ['GetSODashboardData'])
    mockcommonservice = jasmine.createSpyObj('CommonService', ['GetIsFromLogin'])
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [{ provide: DashboardService, useValue: mockDashboardService },
      { provide: Router, useValue: mockrouter },
      { provide: ActivatedRoute, useValue: mockroute },
      { provide: CommonService, useValue: mockcommonservice }

      ],

      imports: [NgChartsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]

    })

      .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    mockSODashboardData = [
      { category: 'Status', name: 'Cancelled', count: 0 }
    ]

    mockDashboardService.GetSODashboardData.and.returnValue(of(mockSODashboardData));

    fixture.detectChanges();

  });

  it('should create', () => {

    expect(component).toBeTruthy();

  });

  it('selectionChange', () => {
    const value = 'monthly';

    spyOn(component, 'getSODashboardData');
    component.selectionChange(value);

  });
  it('ngAfterViewInit', () => {
    component.domainCount = false;
    component.ngAfterViewInit();

  });

});