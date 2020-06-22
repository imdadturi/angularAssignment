import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { IamdynamicComponent } from 'src/app/components/iamdynamic/iamdynamic.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  today: any;
  quoteNum: any = 1;
  componentRef: any;
  showHide = true;

  @ViewChild('infoContainer', { read: ViewContainerRef }) entry: ViewContainerRef;

  constructor(
    private auth: AuthService,
    private router: Router,
    private resolver: ComponentFactoryResolver
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

  public showDetail() {
    if (this.showHide) {
      this.createComponent(this.auth.getSession());
    } else {
      this.componentRef.destroy();
    }

    this.showHide = !this.showHide;
  }

  createComponent(data) {
    this.entry.clear();
    const factory = this.resolver.resolveComponentFactory(IamdynamicComponent);
    this.componentRef = this.entry.createComponent(factory);
    this.componentRef.instance.details = data;
  }

}
