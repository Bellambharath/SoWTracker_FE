import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../shared/Services/AuthService/auth.service';
import { MatDrawer } from '@angular/material/sidenav';
import { AuthGuard } from '../auth/auth.guard';
import { Location } from '@angular/common';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  UserName: string = "USER_NAME"
  User: any;
  IsfirstLogin: boolean = true;
  isAdmin: boolean = false;
  isTPM: boolean = false;
  isRecruiter: boolean = false;
  showheader: boolean = false;

  dashboard: boolean = false;
  login: boolean = false;
  mapping: boolean = false;
  sow: boolean = false;
  candidatedetails: boolean = false;
  admin: boolean = false;
  ChangePW: boolean = false;
  roleName: string = "";

  @ViewChild('drawer', { static: false }) drawer!: MatDrawer;

  constructor(private router: Router, public authservice: AuthService,
    private route: ActivatedRoute, private authGuard: AuthGuard, private location: Location) { }
  ngOnInit(): void {

    if (this.authservice.loggedIn()) {
      this.IsfirstLogin = this.authservice.IsFirstLogin() ? true : false;
      this.User = JSON.parse(sessionStorage.getItem("userData") as string);
      this.UserName = this.User.LoginName;
      this.roleName = this.User.RoleName;
    }

    this.loggedIn();

  }



  logout() {
    sessionStorage.clear();
    this.loggedIn();

    this.router.navigate(["/login"]).then(() => {
      window.location.reload();
    });


  }
  // RouteToChangePassword() {
  //   this.router.navigate(["/ChangePassword"], {
  //     queryParams: { firstLogin: 'true' },
  //   });
  // }

  loggedIn() {

    this.User = JSON.parse(sessionStorage.getItem("userData") as string);
    if (
      sessionStorage.getItem("userData") != null ||
      sessionStorage.getItem("userData") != undefined
    ) {
      this.login = true;
      this.dashboard = true;
      let data = sessionStorage.getItem("userData");
      let resData = data ? JSON.parse(data) : null;
      let ScreenNames = resData.ScreenNames.split(",");



      for (let i = 0; i < ScreenNames.length; i++) {
        if (ScreenNames[i].toLowerCase() == "sow") {

          this.sow = true;
        }
        else if (ScreenNames[i].toLowerCase() == "candidatedetails") {
          this.candidatedetails = true;
        }
        else if (ScreenNames[i].toLowerCase() == "mapping") {
          this.mapping = true;
        }

        else if (ScreenNames[i].toLowerCase() == "changepassword") {
          this.ChangePW = true;
        }

        else if (ScreenNames[i].toLowerCase() == "admin") {
          this.isAdmin = true;
        }
        else if (ScreenNames[i].toLowerCase() == "usttpm") {
          this.isTPM = true;
        }
        

      }




    }

  }




}
