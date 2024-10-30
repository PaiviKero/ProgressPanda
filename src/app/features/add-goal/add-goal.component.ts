import { Component, EventEmitter, Output } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { FormsModule } from '@angular/forms';
import { Goal, GoalService } from '../../core/services/goal.service';

@Component({
  selector: 'app-add-goal',
  standalone: true,
  imports: [SharedModule, FormsModule],
  templateUrl: './add-goal.component.html',
  styleUrl: './add-goal.component.less',
})
export class AddGoalComponent {
  newGoal = '';

  @Output() goalAdded = new EventEmitter<Goal>();

  constructor(private goalService: GoalService) {}

  addGoal() {
    if (this.newGoal.trim()) {
      this.goalService.addGoal(this.newGoal.trim()).subscribe({
        next: (addedGoal: Goal) => {
          this.goalAdded.emit(addedGoal);
          this.newGoal = '';
        },
        error: (error) => {
          // TODO: how to handle errors in UI ???
          console.error('Error adding goal:', error);
        },
      });
    }
  }
}
