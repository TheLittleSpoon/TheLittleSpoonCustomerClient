import {Component, OnInit} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'the-little-spoon-customer-client';

  constructor(private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) {
    this.initIconsRegistry();
  }

  ngOnInit(): void {
    this.initIconsRegistry();
  }

  initIconsRegistry(): void {
    this.matIconRegistry.addSvgIcon('the_little_spoon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/the_little_spoon.svg'));
  }
}
