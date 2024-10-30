import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalComponent } from './goal.component';
import { mockGoals } from '../../../../backend/src/services/mockData';

describe('GoalComponent', () => {
  let component: GoalComponent;
  let fixture: ComponentFixture<GoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render goal name', () => {
    const component = fixture.componentInstance;
    component.goal = mockGoals[0];
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p')?.textContent).toContain(
      component.goal.name
    );
    expect(compiled.querySelector('p')?.textContent).toContain(
      mockGoals[0].name
    );
  });
});
