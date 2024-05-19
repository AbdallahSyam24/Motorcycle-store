import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  token: String | null;

  constructor() {
    this.token = localStorage.getItem('token');
  }

  handleLogout(): void {
    localStorage.removeItem('token');
    window.location.reload();
  }
}
