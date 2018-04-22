import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainsbetweenComponent } from './trainsbetween.component';

describe('TrainsbetweenComponent', () => {
  let component: TrainsbetweenComponent;
  let fixture: ComponentFixture<TrainsbetweenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainsbetweenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainsbetweenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
