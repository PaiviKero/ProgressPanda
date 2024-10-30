import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { GoalComponent } from '../goal/goal.component';
import { GoalService, Goal } from '../../core/services/goal.service';
import { AddGoalComponent } from '../add-goal/add-goal.component';

@Component({
  selector: 'app-goal-list',
  standalone: true,
  imports: [CommonModule, GoalComponent, SharedModule, AddGoalComponent],
  templateUrl: './goal-list.component.html',
  styleUrl: './goal-list.component.less',
  providers: [GoalService],
})
export class GoalListComponent implements OnInit {
  goals: Goal[] = [];

  constructor(private goalService: GoalService) {}

  ngOnInit(): void {
    this.fetchGoals();
  }

  fetchGoals(): void {
    this.goalService.getAllGoals().subscribe({
      next: (data) => {
        this.goals = data;
      },
      error: (err) => console.error(err),
    });
  }

  onGoalAdded(goal: Goal) {
    // TODO: decide if backend should return only the newly created one
    this.goals.push(goal);
  }
}
