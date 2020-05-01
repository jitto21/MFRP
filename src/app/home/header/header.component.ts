import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { UrlService } from '../url.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]

})
export class HeaderComponent implements OnInit {
  isLinkDisbaled: boolean = false;
  disbaleBackBtn: boolean = true;
  url: string = '';
  urlChangedSub: Subscription;
  constructor(private location: Location, private urlService: UrlService) { }

  ngOnInit(): void {
    this.urlChangedSub = this.urlService.getUrlChanged()
    .subscribe(resData=> {
      this.url = resData;
      console.log("Header",this.url);
      if(!this.url.includes('plan')) {
        console.log("Not in plan route, hence back button is enabled");
        this.disbaleBackBtn = false;
      }
      else {
        console.log("In plan route, hence button is disabled")
        this.disbaleBackBtn = true;
      }
    })
  }

  onGoBack() {
    this.location.back()    
  }

}
