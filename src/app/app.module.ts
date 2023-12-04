
import { ExcelService } from 'src/app/shared/Services/ExcelService/excel.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from './header/header.component';
import { SecurityComponent } from './security/security.component';
import { ServerDownComponent } from './server-down/server-down.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CandidateDetailsComponent } from './candidate/candidate-details/candidate-details.component';
import { SoDetailsComponent } from './so/so-details/so-details.component';
import { SoListComponent } from './so/so-list/so-list.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './shared/Services/LoginService/login.service';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CandidateMappingComponent } from './candidate-mapping/candidate-mapping.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';

import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CandidateListComponent } from './candidate/candidate-list/candidate-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort'
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from "@angular/material/card";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTreeModule } from '@angular/material/tree';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatNativeDateModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { UserSelectedQuestionsComponent } from './user-selected-questions/user-selected-questions.component';
import { NgChartsModule } from 'ng2-charts';
import { BillingComponent } from './billing/billing.component';
import { BillinglistComponent } from './billinglist/billinglist.component';
import { TPMComponent } from './tpm/tpm.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ScreeningComponent } from './ScreeningE/screening/screening.component';
import { ScreeningEditComponent } from './ScreeningE/screening-edit/screening-edit.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SecurityComponent,
    ServerDownComponent,
    CandidateDetailsComponent,
    CandidateListComponent,
    SoDetailsComponent,
    SoListComponent,
    LoginComponent,
    AdminComponent,
    DashboardComponent,
    ServerDownComponent,
    CandidateMappingComponent,
    ChangePasswordComponent,
    EmailVerificationComponent,
    UserSelectedQuestionsComponent,
    BillingComponent,
    BillinglistComponent,
    TPMComponent,
    ScreeningComponent,
    ScreeningEditComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, BrowserAnimationsModule, MatFormFieldModule, MatSortModule,
    MatPaginatorModule, MatTableModule, MatSlideToggleModule, MatInputModule, HttpClientModule, MatButtonModule,
    ReactiveFormsModule, MatRadioModule, MatSelectModule, MatTreeModule, MatGridListModule,MatSnackBarModule,
    MatListModule, MatListModule, MatSidenavModule, MatIconModule, MatIconModule, MatCardModule, MatTabsModule,
    MatToolbarModule, MatExpansionModule, MatMenuModule, MatCheckboxModule, FormsModule, MatStepperModule,
    MatProgressBarModule, MatDatepickerModule, MatTooltipModule, MatNativeDateModule, MatButtonToggleModule, 
    MatMenuModule, MatDialogModule,NgChartsModule,MatAutocompleteModule
  ],
  providers: [ExcelService, LoginService],
  bootstrap: [AppComponent],
})
export class AppModule { }



