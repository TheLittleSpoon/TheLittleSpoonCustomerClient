import {Component, Input, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {AuthenticationService} from '../../../services/authentication.service';
import {User} from '../../../types/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() userName: string = 'user';
  @Output() burgerClick: Subject<void> = new Subject<void>();
  isAdmin: boolean = false;

  constructor(private authenticationService: AuthenticationService) {
    this.isAdmin = this.authenticationService.currentUserValue?.isAdmin ?? false;
  }

  ngOnInit(): void {
  }

  onBurgerClicked($event: MouseEvent): void {
    this.burgerClick.next();
    $event.stopPropagation();
  }

  adminRedirect(): void {
    window.location.href = 'http://34.68.121.245/';
  }
}
