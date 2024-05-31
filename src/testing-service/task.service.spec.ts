import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskService } from '../app/service/task.service';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService]
    });
    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all tasks from the API', () => {
    const mockTasks = [
      { id: 1, name: 'Task 1', description: 'Description 1' },
      { id: 2, name: 'Task 2', description: 'Description 2' }
    ];

    service.getAllTasks().subscribe(tasks => {
      expect(tasks.length).toBe(2);
      expect(tasks).toEqual(mockTasks);
    });

    const req = httpMock.expectOne('http://localhost:9090/api/task');
    expect(req.request.method).toBe('GET');
    req.flush(mockTasks);
  });

  it('should create a task via POST request', () => {
    const newTask = { id: 3, name: 'New Task', description: 'New Description' };

    service.create(newTask).subscribe(task => {
      expect(task).toEqual(newTask);
    });

    const req = httpMock.expectOne('http://localhost:9090/api/task');
    expect(req.request.method).toBe('POST');
    req.flush(newTask);
  });

  it('should retrieve a task by ID from the API', () => {
    const taskId = 1;
    const mockTask = { id: 1, name: 'Task 1', description: 'Description 1' };

    service.get(taskId).subscribe(task => {
      expect(task).toEqual(mockTask);
    });

    const req = httpMock.expectOne(`http://localhost:9090/api/task/${taskId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTask);
  });

  it('should update a task via PUT request', () => {
    const taskId = 1;
    const updatedTask = { id: 1, name: 'Updated Task', description: 'Updated Description' };

    service.update(taskId, updatedTask).subscribe(task => {
      expect(task).toEqual(updatedTask);
    });

    const req = httpMock.expectOne(`http://localhost:9090/api/task/${taskId}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedTask);
  });

  it('should delete a task by ID via DELETE request', () => {
    const taskId = 1;

    service.delete(taskId).subscribe(response => {
      expect(response.status).toBe(200);
    });

    const req = httpMock.expectOne(`http://localhost:9090/api/task/${taskId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null, { status: 200, statusText: 'OK' });
  });
});
