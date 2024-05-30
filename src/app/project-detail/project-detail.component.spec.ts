import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectDetailComponent } from './project-detail.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ProjectService } from '../service/project.service';
import { FormBuilder } from '@angular/forms';

describe('ProjectDetailComponent', () => {
  let component: ProjectDetailComponent;
  let fixture: ComponentFixture<ProjectDetailComponent>;
  let mockActivatedRoute: any;
  let mockRouter: any;
  let mockProjectService: jasmine.SpyObj<ProjectService>;

  beforeEach(async () => {
    mockActivatedRoute = {
      snapshot: { paramMap: { get: () => '1' } }
    };

    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    mockProjectService = jasmine.createSpyObj('ProjectService', ['get', 'update', 'create']);

    await TestBed.configureTestingModule({
      declarations: [ ProjectDetailComponent ],
      imports: [ ReactiveFormsModule ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
        { provide: ProjectService, useValue: mockProjectService },
        FormBuilder
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDetailComponent);
    component = fixture.componentInstance;
    mockProjectService.get.and.returnValue(of({ id: 1, name: 'Test Project', description: 'Test Description' }));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
