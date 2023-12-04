import { ChangeDetectorRef, Component } from '@angular/core';
import { BubbleDataPoint, Chart, ChartData, ChartOptions, ChartTypeRegistry, Point } from 'chart.js';
import { DashboardService } from '../shared/Services/DashbordService/dashboard.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';


import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonService } from '../common.service';
import * as moment from 'moment';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MMM',
  },
  display: {
    dateInput: 'MMM',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MY_FORMATS,
    },
  ],
})
export class DashboardComponent {
  technologies: any;
  chartOptions: ChartOptions;
  regions: any;
  statuses: any;
  lables: string[] = [];
  data: number[] = [];

  previousUrl: string = '';

  chartInstance: Chart<
    keyof ChartTypeRegistry,
    (number | [number, number] | Point | BubbleDataPoint)[],
    unknown
  >;
  regionChartInstance: Chart<
    keyof ChartTypeRegistry,
    (number | [number, number] | Point | BubbleDataPoint)[],
    unknown
  >;
  domainChartInstance: Chart<
    keyof ChartTypeRegistry,
    (number | [number, number] | Point | BubbleDataPoint)[],
    unknown
  >;
  selectFormControl = new FormControl('Monthly');
  chartData: ChartData;
  period: string;
  public chart: any;
  regionLables: string[] = [];
  regionData: number[] = [];
  domainLables: string[] = [];
  domainData: number[] = [];
  backgroundColours: string[] = [];
  showPieChart: boolean;
  statusCount: boolean = false;
  domainCount: boolean = false;
  regionCount: boolean = false;
  startdate: string = ""
  enddate: string = ""
  date = new FormControl(moment());
  selectedDate: moment.Moment;
  Monthlyminlimit: Date;
  Monthlymaxlimit: Date;

  constructor(private service: DashboardService, public router: Router,
    private _route: ActivatedRoute, private commonservice: CommonService, private cdr: ChangeDetectorRef) {
  }
  ngAfterViewInit() {
    // Chart creation logic here after the HTML elements are fully rendered
    if (!this.domainCount) {
      this.domainChart();
    }
  }

  ngOnInit() {
    this.period = 'Monthly';
    this.getSODashboardData();

    this.backgroundColours = [
      '#FF0000',
      '#00FF00',
      '#0000FF',
      '#FFFF00',
      '#FF00FF',
      '#00FFFF',
      '#800000',
      '#008000',
      '#000080',
      '#808000',
      '#800080',
      '#008080',
      '#808080',
      '#C0C0C0',
      '#FFA500',
      '#FFC0CB',
      '#FFFFE0',
      '#ADD8E6',
      '#90EE90',
      '#FFB6C1',
      '#FAFAD2',
      '#E0FFFF',
      '#FFE4B5',
      '#FFDAB9',
      '#F0FFF0',
      '#FFF0F5',
      '#FFFACD',
      '#F5F5DC ',
      '#F5F5F5',
    ];

  }



  selectionChange(value: string) {

    this.period = value;
    this.data.length = 0;
    this.lables.length = 0;
    this.regionData.length = 0;
    this.regionLables.length = 0;
    this.domainData.length = 0;
    this.domainLables.length = 0;
    this.getSODashboardData();

  }
  getSODashboardData() {
    this.service.GetSODashboardData(this.period).subscribe((result: any[]) => {
      console.log(result)
      this.startdate = moment(result[0].startDate).format("MMM Do");
      this.enddate = (moment(result[0].endDate).format("MMM Do"));

      this.statuses = result.filter((x: { category: string; }) => x.category == 'Status');
      for (var i in this.statuses) {
        this.lables.push(this.statuses[i].name);
        this.data.push(this.statuses[i].count);

      }
      this.statusCount = this.data.every((num) => num == 0);
      this.statusChart();

      this.technologies = result.filter((x: { category: string; }) => x.category == 'Domain');

      for (var k in this.technologies) {
        this.domainLables.push(this.technologies[k].name);
        this.domainData.push(this.technologies[k].count);
      }
      this.domainCount = this.domainData.every((num) => num == 0);

      this.domainChart();

      this.regions = result.filter((x: { category: string; }) => x.category == 'Region');

      for (var j in this.regions) {
        this.regionLables.push(this.regions[j].name);
        this.regionData.push(this.regions[j].count);
      }
      this.regionCount = this.regionData.every((num) => num == 0);
      this.regionChart();
    });
  }

  statusChart() {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
    this.cdr.detectChanges()
    this.chartInstance = new Chart<keyof ChartTypeRegistry, (number | [number, number] | Point | BubbleDataPoint)[], unknown>('pieChartStatus', {
      type: 'doughnut', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: this.lables,
        datasets: [
          {
            label: 'Candidate',
            data: this.data,
            backgroundColor: this.backgroundColours,
            hoverOffset: 4,
          },
        ],
      },
      options: {
        aspectRatio: 1,
        responsive: false,
      },
    });

  }


  regionChart() {
    if (this.regionChartInstance) {
      this.regionChartInstance.destroy();
    }

    this.regionChartInstance = new Chart<keyof ChartTypeRegistry, (number | [number, number] | Point | BubbleDataPoint)[], unknown>('pieChartRegion', {
      type: 'doughnut', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: this.regionLables,
        datasets: [
          {
            label: 'Candidates',
            data: this.regionData,
            backgroundColor: this.backgroundColours,
            hoverOffset: 4,
          },
        ],
      },
      options: {
        aspectRatio: 1,
        responsive: false,
      },
    });
  }
  domainChart() {
    if (this.domainChartInstance) {
      this.domainChartInstance.destroy();
    }

    this.domainChartInstance = new Chart<
      keyof ChartTypeRegistry,
      (number | [number, number] | Point | BubbleDataPoint)[],
      unknown
    >('pieChartDomain', {
      type: 'doughnut', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: this.domainLables,
        datasets: [
          {
            label: 'Technologies',
            data: this.domainData,
            backgroundColor: this.backgroundColours,
            hoverOffset: 4,
          },
        ],
      },
      options: {
        aspectRatio: 1,
        responsive: false,
      },
    });
  }


}
