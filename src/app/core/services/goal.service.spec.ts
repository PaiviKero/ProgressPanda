import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { GoalService } from './goal.service';
import { mockGoals, newMockGoal } from '../../../../testdata/mockData';
import { HttpErrorResponse } from '@angular/common/http';

describe('GoalService', () => {
  let service: GoalService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GoalService],
    });
    service = TestBed.inject(GoalService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding HTTP calls
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch goals from the service', () => {
    service.getAllGoals().subscribe((goals) => {
      expect(goals).toEqual(mockGoals);
    });

    const req = httpMock.expectOne(GoalService.getApiPoint());
    expect(req.request.method).toBe('GET');

    req.flush(mockGoals);
  });

  it('should fetch goal from the service with id 1', () => {
    const goalId = 1;
    const goalIndex = 0;

    service.getGoalById(goalId).subscribe((goal) => {
      expect(goal).toEqual(mockGoals[goalIndex]);
    });

    const req = httpMock.expectOne(GoalService.getApiPoint() + '/' + goalId);
    expect(req.request.method).toBe('GET');

    req.flush(mockGoals[goalIndex]);
  });

  it('should return added goal 2', () => {
    service.addGoal(newMockGoal.name).subscribe((goal) => {
      expect(goal).toEqual(newMockGoal);
    });

    const req = httpMock.expectOne(GoalService.getApiPoint() + '/');

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ name: newMockGoal.name });

    req.flush(newMockGoal);
  });

  it('should handle error when backend returns 404', () => {
    const goalId = -66;
    const errorMessage = 'Error';

    service.getGoalById(goalId).subscribe({
      next: () => fail('should have failed with 404'),
      error: (error: HttpErrorResponse) => {
        expect(error.status).withContext('status').toEqual(404);
        expect(error.error).withContext('message').toEqual(errorMessage);
      },
    });

    const req = httpMock.expectOne(GoalService.getApiPoint() + '/' + goalId);
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });

  it('should handle error on clientside', () => {
    const goalId = -99;
    const errorMessage = 'Error';

    service.getGoalById(goalId).subscribe({
      next: () => fail('should have failed with error'),
      error: (error: HttpErrorResponse) => {
        jasmine.debugLog('error ' + JSON.stringify(error));
        expect(error.status).withContext('status').toEqual(0);
        expect(error.statusText)
          .withContext('message')
          .toEqual('Unknown Error');
      },
    });

    const req = httpMock.expectOne(GoalService.getApiPoint() + '/' + goalId);
    expect(req.request.method).toBe('GET');

    req.error(new ProgressEvent(errorMessage));
  });
});
