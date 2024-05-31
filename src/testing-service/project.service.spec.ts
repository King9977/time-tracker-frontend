import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ProjectService } from '../app/service/project.service';

describe('ProjectService', () => {
  let service: ProjectService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProjectService]
    });
    service = TestBed.inject(ProjectService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all projects', () => {
    const dummyProjects = [{ id: 1, name: 'Project 1' }, { id: 2, name: 'Project 2' }];

    service.getAll().subscribe(projects => {
      expect(projects.length).toBe(2);
      expect(projects).toEqual(dummyProjects);
    });

    const req = httpMock.expectOne('http://localhost:9090/api/project');
    expect(req.request.method).toBe('GET');
    req.flush(dummyProjects);
  });

  it('should create a project', () => {
    const newProject = { name: 'New Project' };

    service.create(newProject).subscribe(project => {
      expect(project.name).toEqual('New Project');
    });

    const req = httpMock.expectOne('http://localhost:9090/api/project');
    expect(req.request.method).toBe('POST');
    req.flush(newProject);
  });

  it('should get a project by ID', () => {
    const dummyProject = { id: 1, name: 'Project 1' };

    service.get(1).subscribe(project => {
      expect(project).toEqual(dummyProject);
    });

    const req = httpMock.expectOne('http://localhost:9090/api/project/1');
    expect(req.request.method).toBe('GET');
    req.flush(dummyProject);
  });

  it('should update a project', () => {
    const updatedProject = { id: 1, name: 'Updated Project' };

    service.update(1, updatedProject).subscribe(project => {
      expect(project).toEqual(updatedProject);
    });

    const req = httpMock.expectOne('http://localhost:9090/api/project/1');
    expect(req.request.method).toBe('PUT');
    req.flush(updatedProject);
  });

  it('should delete a project by ID', () => {
    const dummyResponse = { status: 'success' };

    service.delete(1).subscribe(response => {
      expect(response.status).toEqual(200);
    });

    const req = httpMock.expectOne('http://localhost:9090/api/project/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(dummyResponse);
  });
});
