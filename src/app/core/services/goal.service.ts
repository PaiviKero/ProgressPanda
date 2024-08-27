import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


export interface Goal {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class GoalService {
  private apiUrl = 'http://localhost:3000/api/goals'; // Adjust the URL according to your backend

  constructor(private http: HttpClient) {}

  getAllGoals(): Observable<Goal[]> {
    console.log("get all goals", this.apiUrl)
    return this.http.get<Goal[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getGoalById(id: number): Observable<Goal> {
    console.log("get one goal", `${this.apiUrl}/${id}`)
    return this.http.get<Goal>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Error handling
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      console.error('An error occurred:', error.error.message);
    } else {
      // Backend error
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError('Something went wrong; please try again later.');
  }
}
