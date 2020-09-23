import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalProductivityComponent } from './global-productivity.component';

describe('GlobalProductivityComponent', () => {
  let component: GlobalProductivityComponent;
  let fixture: ComponentFixture<GlobalProductivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalProductivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalProductivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
