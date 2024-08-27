import { Component, Input } from '@angular/core';

import { Goal } from '../../core/services/goal.service';

@Component({
  selector: 'app-goal',
  standalone: true,
  imports: [],
  templateUrl: './goal.component.html',
  styleUrl: './goal.component.less'
})
export class GoalComponent {
  @Input() goal = {} as Goal;
}
