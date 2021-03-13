import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { APP_COMPONENTS } from './components';
import { APP_DIRECTIVES } from './directives';
import { APP_SERVICES } from './services';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [...APP_COMPONENTS, ...APP_DIRECTIVES],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    FormsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    ScrollingModule,
  ],
  providers: [...APP_SERVICES],
  bootstrap: [AppComponent],
})
export class AppModule {}
