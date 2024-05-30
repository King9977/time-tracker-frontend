export class TimeEntry {
    id!: number; 
    date: Date; 
    hours: number;
    description: string;
    projectId: number;
    taskId: number;

    constructor(
        id: number,
        date: Date,
        hours: number,
        description: string,
        projectId: number,
        taskId: number
    ) {
        this.id = id;
        this.date = date;
        this.hours = hours;
        this.description = description;
        this.projectId = projectId;
        this.taskId = taskId;
    }
}
