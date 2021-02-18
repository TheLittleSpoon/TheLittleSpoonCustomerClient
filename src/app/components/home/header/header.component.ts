import {Component, Input, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() userName: string = 'user';
  @Output() burgerClick: Subject<void> = new Subject<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onBurgerClicked($event: MouseEvent): void {
    this.burgerClick.next();
    $event.stopPropagation();
  }
}
