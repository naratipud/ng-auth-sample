import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../services';
import { User } from '../models/user.model';

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  currentUser: User;

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.currentUser.subscribe((user) => this.currentUser = user);
  }

  logout() {
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }

}
