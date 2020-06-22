import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  today: any;
  quoteNum: any = 1;

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.today = new Date();

  }

  public generateQuote() {
    this.quoteNum = Math.floor((Math.random() * 10) + 1);
    console.log(this.quoteNum);
  }

  public logout() {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }

}
