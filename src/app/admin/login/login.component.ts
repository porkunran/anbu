import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/common.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loginFail: string;


  // tslint:disable-next-line:max-line-length
  constructor(private formBuilder: FormBuilder, private apiService: CommonService, private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  onSubmit() {
    this.loginFail = '';
    console.log(this.form.value, '9999');
    if (this.form.valid) {
      if (this.form.value.name === 'kanna' && this.form.value.password === 'Yuvaraj@24') {
        sessionStorage.setItem('loginDetails', this.form.value.name);
        this.router.navigate(['admin/order']);
      } else {
        this.loginFail = 'Username and Password Error';
      }

      // this.apiService.loginData(this.form.value).subscribe(data => {
      //   const a = data;
      //   localStorage.setItem('token', data['token']);
      // });
    }
  }
}
