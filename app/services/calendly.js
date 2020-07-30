import Service from '@ember/service';

export default class CalendlyService extends Service {
  /*
   * Months in the calendar
   */
  months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  /*
   * Gets the current date
   */
  getCurrentDay() {
    return (new Date()).getDate();
  }
  /*
   * Gets the current month
   */
  getCurrentMonth() {
    return (new Date()).getMonth();
  }
  /*
   * Gets the current year
   */
  getCurrentYear() {
    return (new Date()).getFullYear();
  }
  /*
   * Gets the days in the specified month and year
   */
  daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
  }
  /*
   * Gets the calendar rows in the specified month, year, and day
   */
  getCalendarRows(month, year, day) {
    let calendarRows = [];
    let firstDay = (new Date(year, month)).getDay();
    let _day = 0;
    for (let i = 0; i < 6; i++) {
      if (_day < this.daysInMonth(month, year)) {
        let days = [];
        for (let j = 0; j < 7; j++) {
          if (i === 0 && j < firstDay) {
            days.push({
              currentDay: false,
              dayValue: ""
            });
          }
          else if (_day < this.daysInMonth(month, year)) {
            _day++;
            if (+_day === +day) {
              days.push({
                currentDay: true,
                dayValue: _day
              });
            } else {
              days.push({
                currentDay: false,
                dayValue: _day
              });
            }
          } else {
            days.push({
              currentDay: false,
              dayValue: ""
            });
          }
        }
        calendarRows.push({
          days
        });
      }
    }
    return calendarRows;
  }
}
