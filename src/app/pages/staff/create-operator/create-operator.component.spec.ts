import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOperatorComponent } from './create-operator.component';

describe('CreateOperatorComponent', () => {
  let component: CreateOperatorComponent;
  let fixture: ComponentFixture<CreateOperatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOperatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
