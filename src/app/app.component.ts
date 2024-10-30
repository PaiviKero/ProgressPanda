import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GoalListComponent } from './features/goal-list/goal-list.component';
import { GoalComponent } from './features/goal/goal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GoalListComponent, GoalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent {
  title = 'ProgressPanda';
}
