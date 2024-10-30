import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface Goal {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class GoalService {
  private static apiEndPoint = 'goals';

  constructor(private http: HttpClient) {}

  public static getApiPoint(): string {
    return environment.apiUrl + this.apiEndPoint;
  }

  public getAllGoals(): Observable<Goal[]> {
    return this.http
      .get<Goal[]>(GoalService.getApiPoint())
      .pipe(retry(3), catchError(this.handleError));
  }

  getGoalById(id: number): Observable<Goal> {
    return this.http
      .get<Goal>(`${GoalService.getApiPoint()}/${id}`)
      .pipe(catchError(this.handleError));
  }

  addGoal(name: string): Observable<Goal> {
    return this.http
      .post<Goal>(`${GoalService.getApiPoint()}/`, { name })
      .pipe(catchError(this.handleError));
  }

  // Error handling
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // Client-side error
      console.error('An error occurred:', error.message);
    } else {
      // Backend error
      console.error(
        `Backend returned code ${error.status}, ` +
          `body was: ${JSON.stringify(error.error)}`
      );
    }
    return throwError(() => error);
  }
}
