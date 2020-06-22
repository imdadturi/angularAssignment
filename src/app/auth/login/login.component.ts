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

  pageHeader = 'Login';
  pageLoader = false;
  formSpinner = false;
  error: string = null;
  formError: string = null;
  isPassword = false;

  loginForm: FormGroup;

  profile: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private auth: AuthService,
    private formBuilder: FormBuilder,
  ) {
    this.title.setTitle(this.pageHeader);

  }

  async ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['imdad', Validators.required],
      password: ['123', Validators.required],
    });

    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/home']);
    }

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

    }, (error: any) => {
      this.formError = error.message;
      this.formSpinner = false;
    });
  }

}
