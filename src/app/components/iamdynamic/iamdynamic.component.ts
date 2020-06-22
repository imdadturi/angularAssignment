import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-iamdynamic',
  templateUrl: './iamdynamic.component.html',
  styleUrls: ['./iamdynamic.component.less']
})
export class IamdynamicComponent implements OnInit {

  constructor() { }

  @Input() details: any;
  ngOnInit() {
  }

}
