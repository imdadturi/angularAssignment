import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  oac: any;
  pageHeader = 'Login';
  ref: string = null;
  backUrl: string = null;
  pageLoader = false;
  formSpinner = false;
  error: string = null;
  formError: string = null;
  isPassword = false;

  loginForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private auth: AuthService,
    private formBuilder: FormBuilder,
  ) {
    this.ref = this.route.snapshot.queryParamMap.get('ref');
    this.backUrl = this.ref || '';
    this.title.setTitle(this.pageHeader);
  }

  async ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.pageLoader = true;
    setTimeout(() => {
      this.pageLoader = false;
    }, 2000);

  }

  public formSubmit() {
    this.formError = null;
    if (this.loginForm.invalid) {
      return false;
    }

    let formdata = this.loginForm.value;
    this.formSpinner = true;
    this.auth.login(formdata).subscribe((resp: any) => {
      console.log(resp);
      setTimeout(() => {
        if ((resp.username && formdata.username === resp.username)
          && (resp.password && formdata.password === resp.password)) {
          this.auth.setSession(resp);
          this.router.navigate(['/home']);
        } else {
          this.formError = 'Invalid username or password';
        }
        this.formSpinner = false;
      }, 2000);
      // this.auth.setSession(resp.record);

    }, (error: any) => {
      this.formError = error.message;
      this.formSpinner = false;
    });
  }

}
