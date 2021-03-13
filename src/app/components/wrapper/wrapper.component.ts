import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../types/user';
import {AuthenticationService} from '../../services/authentication.service';
import {Socket} from 'ngx-socket-io';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css']
})
export class WrapperComponent {
  currentUser: any;
  connectedUsers: number = 0;

  constructor(private router: Router, private authenticationService: AuthenticationService, private socket: Socket) {
    this.authenticationService.currentUser.subscribe((user: User | null) => this.currentUser = user);
    this.socket.emit('login', [{data: 1}]);
    this.socket.on('joined', (users: User[]) => this.connectedUsers = users.length);
    this.socket.on('disconnectedUser', (users: User[]) => this.connectedUsers = users.length);
  }

  logout(): void {
    this.authenticationService.logout();
    this.socket.disconnect();
    this.router.navigate(['/login']);
  }
}
