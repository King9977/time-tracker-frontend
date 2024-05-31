export class TimeEntry {
    constructor(
      public id: number,
      public date: Date,
      public startTime: string,
      public endTime: string,
      public taskId: number = 0,
      public userId: number = 0
    ) {}
  }
  