import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTableActionsComponent } from './app-table-actions.component';

describe('AppTableActionsComponent', () => {
  let component: AppTableActionsComponent;
  let fixture: ComponentFixture<AppTableActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppTableActionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppTableActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
