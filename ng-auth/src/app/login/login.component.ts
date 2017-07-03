import { Component, OnInit } from '@angular/core';

interface Credentials {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
