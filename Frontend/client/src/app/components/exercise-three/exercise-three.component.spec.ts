import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseThreeComponent } from './exercise-three.component';

describe('ExerciseThreeComponent', () => {
  let component: ExerciseThreeComponent;
  let fixture: ComponentFixture<ExerciseThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExerciseThreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExerciseThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
