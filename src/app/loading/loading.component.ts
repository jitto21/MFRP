import { Component, OnInit } from '@angular/core';
import { HttpCounterService } from '../services/http-counter.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  constructor(private httpCounterService: HttpCounterService) { }

  public showLoading = false;

  ngOnInit(): void {
    this.httpCounterService.getHttpCounterObs().subscribe(isLoading => this.showLoading = isLoading !== 0);
  }

}
