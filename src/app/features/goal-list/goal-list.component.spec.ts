import {
  ComponentFixture,
  inject,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';

import { GoalListComponent } from './goal-list.component';
import {
  mockGoals,
  newMockGoal,
} from '../../../../backend/src/sharedtestdata/mockData';
import { Goal, GoalService } from '../../core/services/goal.service';
import { Observable, of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { GoalComponent } from '../goal/goal.component';
import { AddGoalComponent } from '../add-goal/add-goal.component';

describe('GoalListComponent', () => {
  let component: GoalListComponent;
  let fixture: ComponentFixture<GoalListComponent>;
  let getAllGoalsSpy: jasmine.Spy<() => Observable<Goal[]>>;

  beforeEach(async () => {
    getAllGoalsSpy = spyOn(GoalService.prototype, 'getAllGoals').and.callFake(
      () => {
        return of(mockGoals);
      }
    );

    await TestBed.configureTestingModule({
      imports: [GoalListComponent, GoalComponent, AddGoalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GoalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(getAllGoalsSpy).toHaveBeenCalledTimes(1);
  });

  it('should populate goals with data from getAllGoals', () => {
    expect(component.goals).toEqual(mockGoals);
  });

  it('should call server-call testCall()', waitForAsync(
    inject([GoalService], (goalService: GoalService) => {
      goalService.getAllGoals().subscribe((returnGoals) => {
        expect(returnGoals).toBe(mockGoals);
        expect(getAllGoalsSpy).toHaveBeenCalled();
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

  it('should handle error when getAllGoals fails', () => {
    const consoleSpy = spyOn(console, 'error'); // Spy on console.error
    getAllGoalsSpy.and.callFake((): Observable<Goal[]> => {
      return throwError(() => new Error('Test Error'));
    });
    component.fetchGoals();

    expect(getAllGoalsSpy).toHaveBeenCalled();

    expect(consoleSpy).toHaveBeenCalledWith(jasmine.any(Error));
    expect(consoleSpy.calls.mostRecent().args[0].message).toBe('Test Error');
  });
});
