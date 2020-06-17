import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMachineTypeComponent } from './create-machine-type.component';

describe('CreateMachineTypeComponent', () => {
  let component: CreateMachineTypeComponent;
  let fixture: ComponentFixture<CreateMachineTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMachineTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMachineTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
