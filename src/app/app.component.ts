import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { EventsService } from './events.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('calendar') calendar;
  calendarEvents: any[] = [
    { title: 'Event Now', start: new Date() },
    { title: 'Event Now', start: new Date() },
    { title: 'Event Now', start: new Date() },
    { title: 'Event Now', start: new Date() },
    { title: 'Event Now', start: new Date() },
    { title: 'Event Now', start: new Date() },
  ];
  public calendarOptions = {
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek',
    },
    events: this.calendarEvents,
    dayMaxEvents: 3,
  };

  constructor(private events: EventsService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.cd.detectChanges();
  }

  public fetchEvents(dateInfo) {
    return this.events.get(dateInfo.start, dateInfo.end).toPromise();
  }

  modifyTitle(eventIndex, newTitle) {
    console.log(eventIndex);
    let calendarEvents = this.calendarEvents.slice(); // a clone
    let singleEvent = Object.assign({}, calendarEvents[eventIndex]); // a clone
    singleEvent.title = newTitle;
   
    var result = new Date(singleEvent.start);
    result.setDate(result.getDate() + 1);
    console.log(new Date(result));
    singleEvent.start = result;
    calendarEvents[eventIndex] = singleEvent;
    this.calendarEvents = calendarEvents; // reassign the array
    this.calendarOptions.events = this.calendarEvents
  }
}
