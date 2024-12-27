import {
  ComponentFixture,
  inject,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';

import { GoalListComponent } from './goal-list.component';
import { mockGoals, newMockGoal } from '../../../../testdata/mockData';
import { GoalService } from '../../core/services/goal.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { GoalComponent } from '../goal/goal.component';
import { AddGoalComponent } from '../add-goal/add-goal.component';

describe('GoalListComponent', () => {
  let component: GoalListComponent;
  let fixture: ComponentFixture<GoalListComponent>;
  let spiedFunction: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalListComponent, GoalComponent, AddGoalComponent],
      providers: [GoalService],
    }).compileComponents();

    spiedFunction = spyOn(GoalService.prototype, 'getAllGoals');
    spiedFunction.and.callFake(() => {
      return of(mockGoals);
    });

    fixture = TestBed.createComponent(GoalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(spiedFunction).toHaveBeenCalledTimes(1);
  });

  it('should call server-call testCall()', waitForAsync(
    inject([GoalService], (goalService: GoalService) => {
      goalService.getAllGoals().subscribe((returnGoals) => {
        expect(returnGoals).toBe(mockGoals);
        expect(spiedFunction).toHaveBeenCalled();
      });
    })
  ));

  it('should fetch goals from the service', () => {
    expect(component.goals.length).toBe(mockGoals.length);
    mockGoals.forEach((mockGoal, index) => {
      expect(component.goals[index].name).toBe(mockGoal.name);
    });
  });

  it('should render the list of goals', () => {
    // Assert: Check that there are mockGoals.length list items rendered
    const listItems = fixture.debugElement.queryAll(By.css('ul li'));
    expect(listItems.length).toBe(mockGoals.length);

    // Assert: Check that each `app-goal` component has the correct input
    listItems.forEach((item, index) => {
      const appGoalComponent = item.query(By.directive(GoalComponent));
      expect(appGoalComponent).toBeTruthy(); // Ensure app-goal is present
      const goalInstance = appGoalComponent.componentInstance as GoalComponent;
      expect(goalInstance.goal).toBe(mockGoals[index]); // Ensure correct goal is passed
    });
  });

  it('should render empty list when there are no goals', () => {
    component.goals = [];
    fixture.detectChanges();

    // Assert: No list items should be rendered
    const listItems = fixture.debugElement.queryAll(By.css('ul li'));
    expect(listItems.length).toBe(0); // No goals to display
  });

  it('should update list when new goal is added', () => {
    component.onGoalAdded(newMockGoal);
    fixture.detectChanges();

    const listItems = fixture.debugElement.queryAll(By.css('ul li'));
    expect(listItems.length)
      .withContext('rendered listems length to equal')
      .toBe(mockGoals.length);
    expect(component.goals.length)
      .withContext('component goallist length to equal')
      .toBe(mockGoals.length);

    expect(component.goals[component.goals.length - 1]).toEqual(newMockGoal);
    const appGoalComponent = listItems[listItems.length - 1].query(
      By.directive(GoalComponent)
    );
    expect(appGoalComponent).toBeTruthy(); // Ensure app-goal is present
    const goalInstance = appGoalComponent.componentInstance as GoalComponent;
    expect(goalInstance.goal).toBe(newMockGoal); // Ensure correct goal is passed
  });
});
