import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from 'app/shared/services';
import { User } from 'app/shared/models/user.model';
import { Error } from 'app/shared/models/error.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  authType = '';
  title = '';
  isSubmitting = false;
  authForm: FormGroup;
  stateUrl = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.url.subscribe(data => {
      // Get the last piece of the URL (it's either 'login' or 'register')
      this.authType = data[data.length - 1].path;
      // Set a title for the page accordingly
      this.title = (this.authType === 'login') ? 'Log In' : 'Sign up';
      // add form control for username if this is the register page
      if (this.authType === 'register') {
        this.authForm.addControl('username', new FormControl());
      }
    });

    // Get query params
    this.route.queryParams.subscribe(params => this.stateUrl = params['returnState'] || '/home');
  }

  submitForm() {
    this.isSubmitting = true;
    // this.errors = new Errors();

    const credentials = this.authForm.value;
    this.userService
      .attemptAuth(this.authType, credentials)
      .subscribe(data => {
        // TODO: Verify login success
        if ((<User>data).token) {
          this.router.navigateByUrl(this.stateUrl);
        } else {
          this.isSubmitting = false;
          console.warn('Login failed: ', (<Error>data).msg);
        }
      }, err => {
        // this.errors = err;
        this.isSubmitting = false;
        console.error('Login Error: ', err);
      });
  }
}
