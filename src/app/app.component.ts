import { Component, ViewChild } from '@angular/core';
import { EventsService } from './events.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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
      right: 'dayGridMonth,dayGridWeek'
    },
    events: this.calendarEvents,
    dayMaxEvents: 3 
  };

  constructor(private events: EventsService) {}

  public fetchEvents(dateInfo) {
    return this.events.get(dateInfo.start, dateInfo.end).toPromise();
  }

  modifyTitle(eventIndex, newTitle) {
    let calendarEvents = this.calendarEvents.slice(); // a clone
    let singleEvent = Object.assign({}, calendarEvents[eventIndex]); // a clone
    singleEvent.title = newTitle;
    console.log(singleEvent.start.toLocaleString());
    var result = new Date(singleEvent.start.toLocaleString());
    result.setDate(result.getDate() + 1);
    singleEvent.start = result;
    calendarEvents[eventIndex] = singleEvent;
    this.calendarEvents = calendarEvents; // reassign the array
    this.calendarOptions.events = calendarEvents

  }
}
