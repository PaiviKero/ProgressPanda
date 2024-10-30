import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGoalComponent } from './add-goal.component';
import { newMockGoal } from '../../../../backend/src/services/mockData';
import { GoalService } from '../../core/services/goal.service';
import { of } from 'rxjs';

describe('AddGoalComponent', () => {
  let component: AddGoalComponent;
  let fixture: ComponentFixture<AddGoalComponent>;
  let spiedFunction: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddGoalComponent],
      providers: [GoalService],
    }).compileComponents();

    spiedFunction = spyOn(GoalService.prototype, 'addGoal');

    fixture = TestBed.createComponent(AddGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(spiedFunction).toHaveBeenCalledTimes(0);
  });

  it('input should update the newGoal', () => {
    const goalName = 'New test goal';

    expect(component.newGoal).withContext('empty string first').toBe('');

    const inputField: HTMLInputElement =
      fixture.debugElement.nativeElement.querySelector('input');
    expect(inputField).toBeTruthy();
    inputField.value = goalName;
    inputField.dispatchEvent(new Event('input'));
    expect(inputField.value).toBe(goalName);
    fixture.detectChanges();

    expect(component.newGoal)
      .withContext('component to have the goal name after setting field')
      .toBe(goalName);
  });

  it('should add new goal', () => {
    const goalName = newMockGoal.name;

    const inputField: HTMLInputElement =
      fixture.debugElement.nativeElement.querySelector('input');
    inputField.value = goalName;
    inputField.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.newGoal).toBe(goalName);

    spiedFunction.and.callFake(() => {
      return of(newMockGoal);
    });

    spyOn(component.goalAdded, 'emit');

    const button = fixture.debugElement.nativeElement.querySelector('button');
    expect(button).toBeTruthy();
    button.click();
    fixture.detectChanges();

    expect(component.goalAdded.emit).toHaveBeenCalled();
    expect(component.goalAdded.emit).toHaveBeenCalledWith(newMockGoal);

    expect(component.newGoal)
      .withContext(
        'component to have resetted the goal name after new goal has been added'
      )
      .toBe('');

    expect(spiedFunction).toHaveBeenCalledTimes(1);
  });
});
