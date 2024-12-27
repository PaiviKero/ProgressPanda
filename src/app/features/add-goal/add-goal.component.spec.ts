import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGoalComponent } from './add-goal.component';
import { newMockGoal } from '../../../../backend/src/sharedtestdata/mockData';
import { GoalService } from '../../core/services/goal.service';
import { of, throwError } from 'rxjs';

describe('AddGoalComponent', () => {
  let component: AddGoalComponent;
  let fixture: ComponentFixture<AddGoalComponent>;
  let goalServiceMock: jasmine.SpyObj<GoalService>;

  beforeEach(async () => {
    goalServiceMock = jasmine.createSpyObj('GoalService', ['addGoal']);

    await TestBed.configureTestingModule({
      imports: [AddGoalComponent],
      providers: [{ provide: GoalService, useValue: goalServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(AddGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(goalServiceMock.addGoal).toHaveBeenCalledTimes(0);
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

    goalServiceMock.addGoal.and.callFake(() => {
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

    expect(goalServiceMock.addGoal).toHaveBeenCalledTimes(1);
  });

  it('should handle error when addGoal fails', () => {
    const consoleSpy = spyOn(console, 'error'); // Spy on console.error
    goalServiceMock.addGoal.and.returnValue(
      throwError(() => new Error('Test Error'))
    );

    component.newGoal = 'Test Goal';
    component.addGoal();

    expect(goalServiceMock.addGoal).toHaveBeenCalledWith('Test Goal');
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error adding goal:',
      jasmine.any(Error)
    );
    expect(consoleSpy.calls.mostRecent().args[1].message).toBe('Test Error');
  });
});
