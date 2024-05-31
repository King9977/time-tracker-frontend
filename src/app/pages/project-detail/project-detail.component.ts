import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../service/project.service';
import { Project } from '../../models/project';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  project: Project = {
    id: 0,
    name: '',
    description: ''
  };

  public projectForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl(''),
    description: new FormControl('')
  })

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      this.projectService.get(parseInt(projectId, 10)).subscribe((project: Project) => {
        this.project = project
        this.projectForm = this.formBuilder.group(this.project)

      });
    }
  }

  saveProject(formData: any) {
    this.project = Object.assign(formData)

    if (this.project.id) {
      this.projectService.update(this.project.id, this.project).subscribe({
        next: () => {
          this.back()
        }
      })
    } else {
      this.projectService.create(this.project).subscribe({
        next: () => {
          this.back()
        }
      })
    }  }

back() {
  this.router.navigate(['/projects']);

}
}
