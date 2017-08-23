import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from 'app/shared/services';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  currentUser: User;

  constructor(
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.userService.currentUser.subscribe((user) => this.currentUser = user);
  }

  logout() {
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }

}
