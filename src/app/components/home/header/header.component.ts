import {Component, Input, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {AuthenticationService} from '../../../services/authentication.service';

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
    this.authenticationService.currentUser.subscribe(value => this.isAdmin = value?.isAdmin ?? false);
  }

  ngOnInit(): void {
  }

  onBurgerClicked($event: MouseEvent): void {
    this.burgerClick.next();
    $event.stopPropagation();
  }

   isIFrame = (input: HTMLElement | null): input is HTMLIFrameElement =>
    input !== null && input.tagName === 'IFRAME';

  adminRedirect(): void {
    const postMsg = JSON.parse(localStorage.getItem('currentUser') as string).token;
    const frame = document.getElementById('ifr');
    if (this.isIFrame(frame) && frame.contentWindow) {
      frame.contentWindow.postMessage(postMsg, 'http://localhost:3000/');
    }
    window.open('http://localhost:3000/', '_self' );
  }
}
