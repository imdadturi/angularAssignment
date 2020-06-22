import { Component, OnInit } from '@angular/core';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../auth.service';
import { PasswordMatch } from '../../helpers/password-match.validator';
import { Observable } from 'rxjs/internal/Observable';
import { Observer } from 'rxjs';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit {

  pageHeader = 'Register';
  pageLoader = false;
  formSpinner = false;
  error: string = null;
  formError: string = null;
  isPassword = false;
  signupForm: FormGroup;

  loading = false;
  avatarUrl: string;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private title: Title,
    private auth: AuthService,
    private messageService: NzMessageService
  ) {
    this.title.setTitle(this.pageHeader);
  }

  async ngOnInit() {
    this.signupForm = this.formBuilder.group({
      first_name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      last_name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
      image: ['', Validators.required],

    }, {
      validator: PasswordMatch('password', 'password_confirmation')
    });

    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  public formSubmit() {
    this.formError = null;
    if (this.signupForm.invalid) {
      return false;
    }

    let formdata = this.signupForm.value;


    this.formSpinner = true;
    this.auth.register(formdata).subscribe((resp: any) => {
      setTimeout(() => {
        this.messageService.success('Registration Successful. Use your email and password to login');
        this.router.navigate(['auth/login']);
      }, 2000);
    }, (error: any) => {
      this.formError = error.message;
      this.formSpinner = false;
    });
  }

  beforeUpload = (file: File) => {
    return new Observable((observer: Observer<boolean>) => {
      const isJPG = file.type === 'image/jpeg';
      if (!isJPG) {
        this.messageService.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.messageService.error('Image must smaller than 2MB!');
        observer.complete();
        return;
      }
      // check height
      this.checkImageDimension(file).then(dimensionRes => {
        if (!dimensionRes) {
          this.messageService.error('Image only 300x300 or above');
          observer.complete();
          return;
        }

        observer.next(isJPG && isLt2M && dimensionRes);
        observer.complete();
      });
    });
  }

  private checkImageDimension(file: File): Promise<boolean> {
    return new Promise(resolve => {
      const img = new Image(); // create image
      img.src = window.URL.createObjectURL(file);
      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        window.URL.revokeObjectURL(img.src!);
        resolve(width === height && width >= 300);
      };
    });
  }

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  handleChange(info: { file: UploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
          this.avatarUrl = img;
          this.signupForm.get('image').setValue(info.file.name);
        });
        break;
      case 'error':
        this.messageService.error('Network error');
        this.loading = false;
        break;
    }
  }
}
