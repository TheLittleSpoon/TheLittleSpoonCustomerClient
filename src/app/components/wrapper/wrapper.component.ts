import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../types/user';
import {AuthenticationService} from '../../services/authentication.service';
import {Socket} from 'ngx-socket-io';
import {map} from 'rxjs/operators';

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
    this.socket.fromEvent('joined').pipe(map((users: any) => this.connectedUsers = users.length));
    this.socket.fromEvent('disconnectedUser').pipe(map((users: any) => this.connectedUsers = users.length));
  }

  logout(): void {
    this.authenticationService.logout();
    this.socket.disconnect();
    this.router.navigate(['/login']);
  }
}
