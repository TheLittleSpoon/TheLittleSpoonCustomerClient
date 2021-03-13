import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../types/user';
import {AuthenticationService} from '../../services/authentication.service';
import {Socket} from "ngx-socket-io";

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css']
})
export class WrapperComponent implements OnInit {
  currentUser: any;

  constructor(private router: Router, private authenticationService: AuthenticationService, private socket: Socket) {
    this.authenticationService.currentUser.subscribe((user: User | null) => this.currentUser = user);
  }

  logout(): void {
    this.authenticationService.logout();
    this.socket.disconnect();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
  }

  navigate(): void {

  }
}
