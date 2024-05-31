import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimeEntryListComponent } from './time-entry-list.component';
import { HttpClientModule } from '@angular/common/http';

describe('TimeEntryListComponent', () => {
  let component: TimeEntryListComponent;
  let fixture: ComponentFixture<TimeEntryListComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimeEntryListComponent],
      imports: [HttpClientModule]
    }).compileComponents();
  });
  

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeEntryListComponent);
    component = fixture.componentInstance;
  });

  it('should calculate duration correctly when start time is before end time', () => {
    const startTime = '08:00';
    const endTime = '10:30';

    const duration = component.calculateDuration(startTime, endTime);

    expect(duration).toBe(150);
  });

  it('should calculate duration correctly when start time is after end time', () => {
    const startTime = '12:00';
    const endTime = '10:30';

    const duration = component.calculateDuration(startTime, endTime);

    expect(duration).toBe(-90);
  });

  it('should calculate duration correctly when start time is equal to end time', () => {
    const startTime = '08:00';
    const endTime = '08:00';

    const duration = component.calculateDuration(startTime, endTime);

    expect(duration).toBe(0);
  });
});
