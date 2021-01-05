import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BigRecipeListComponent } from './big-recipe-list.component';

describe('BigRecipeListComponent', () => {
  let component: BigRecipeListComponent;
  let fixture: ComponentFixture<BigRecipeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BigRecipeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BigRecipeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
