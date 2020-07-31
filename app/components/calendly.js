import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class CalendlyComponent extends Component {
  @service calendly;
  @tracked selectedDate;
  @tracked monthAndYear;
  @tracked calendarRows;

  currentDay;
  currentMonth;
  currentYear;
  months;

  constructor() {
    super(...arguments);
    this.calendarRows = [];
    this.currentDay = this.calendly.getCurrentDay(); // set current day
    this.currentMonth = this.calendly.getCurrentMonth(); // set current month
    this.currentYear = this.calendly.getCurrentYear(); // set current year
    this.selectedDate = this.currentDay; // set selected date to current date
    this.months = this.calendly.months; // get the calendar months
    this.initCalendar(this.currentMonth, this.currentYear, this.currentDay); // initialize calendar
  }

  // goto next month
  @action next() {
    this.currentYear = (this.currentMonth === 11) ? this.currentYear + 1 : this.currentYear;
    this.currentMonth = (this.currentMonth + 1) % 12;
    this.initCalendar(this.currentMonth, this.currentYear);
  }

  // goto previous month
  @action previous() {
    this.currentYear = (this.currentMonth === 0) ? this.currentYear - 1 : this.currentYear;
    this.currentMonth = (this.currentMonth === 0) ? 11 : this.currentMonth - 1;
    this.initCalendar(this.currentMonth, this.currentYear);
  }

  // set selected date
  @action setDate(evt) {
    const dayValue = evt.target.outerText;
    if (dayValue !== "") {
      this.initCalendar(this.currentMonth, this.currentYear, dayValue);
    }
  }

  // initialize calendar
  initCalendar(month, year, day) {
    this.calendarRows = []; // reset calendar rows
    if (day) {
      this.selectedDate = new Date(year, month, day);
    }
    else if(
      month === this.selectedDate.getMonth() &&
      year === this.selectedDate.getFullYear()
    ) {
      day = this.selectedDate.getDate();
    }
    this.monthAndYear = this.months[month] + " " + year; // set the header date
    this.calendarRows = this.calendly.getCalendarRows(month, year, day); // get the calendar rows
  }
  
}
