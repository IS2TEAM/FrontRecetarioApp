import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRecipesComponent } from './view-recipes.component';

describe('ViewRecipesComponent', () => {
  let component: ViewRecipesComponent;
  let fixture: ComponentFixture<ViewRecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRecipesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
