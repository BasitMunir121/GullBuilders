import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'datetimeDifference'
})
export class DatetimeDifferencePipe implements PipeTransform {
  transform(expireAt: string): string {
    const expireDate = moment(new Date(expireAt));
    var currentDate = Date.now();
    var isExpired = expireDate < moment(currentDate);
    var lifeTime = expireDate > moment("9999-12-30");
    let result = '';
    if (lifeTime) {
      result = 'Never';
    }
    else if (!isExpired) {
      var duration = moment.duration(expireDate.diff(currentDate));
      var years = duration.years();
      var months = duration.months();
      var days = duration.days();
      var hours = duration.hours();


      if (years != 0) {
        var label = years == 1 || years == -1 ? ' year' : ' years';
        result += years + label + ' '
      }

      if (months != 0) {
        var label = months == 1 || months == -1 ? ' month' : ' months';
        result += months + label + ' '
      }

      if (years == 0) {
        if (days != 0) {
          var label = days == 1 || days == -1 ? ' day' : ' days';
          result += days + label + ' '
        }
      }
      if (months == 0) {
        if (days <= 7)
          if (hours != 0) {
            var label = hours == 1 || hours == -1 ? ' hour' : ' hours';
            result += hours + label + ' '
          }
      }
      if (years != 0) {
        result += '≈';
      } else if (months != 0) {
        result += '≈';
      } else if(days > 7){
        result += '≈';
      }
      if (result == "" && !isExpired) {
        result = '< 1 hour';
      }

    }
    else {
      result = 'Expired';
    }
    // if (days == 0) {
    //   if (minutes != 0) {
    //     var label = minutes == 1 || minutes == 1 ? ' minute' : ' minutes';
    //     result += minutes + label + ' '
    //   }
    // }



    return result.trim();
  }
}
