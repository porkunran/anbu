import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/common.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;


  // tslint:disable-next-line:max-line-length
  constructor(private formBuilder: FormBuilder, private apiService: CommonService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  onSubmit() {
    console.log(this.form.value, '9999');
    if (this.form.valid) {

      this.apiService.loginData(this.form.value).subscribe(data => {
        const a = data;
        localStorage.setItem('token', data.token);
      });
    }
  }
}
