import { FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from "@angular/common";
import { SessionService } from '../services/core/session.service';
import { Inject } from '@angular/core';
import { HSessions } from './common-constants';
import { HCResponse } from '../models/shared/PaginationModel';


export class CommonMethods {
    public static toHCDate(dateObj: any, showTime?: boolean) {
        let session: SessionService =Inject(SessionService) ;
        let datepipe: DatePipe = new DatePipe('en-US');

        let dateFormat = session.getSessionItem(HSessions.DateFormat) ?? 'dd-MMM-yyyy';

        if (showTime) {
            dateFormat += ' hh:mm';
            dateObj += 'Z';
        }

        return datepipe.transform(dateObj, dateFormat)!;
    }

    public static CapitalizeFirstLetter(value: string) {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }
    public static getResultSetForQueryName<T>(queryName: string,jsonData : any) : T{
        const response: HCResponse = jsonData as HCResponse;
          const queryIndex = jsonData.ResParam.QueryNames.indexOf(queryName);
          if (queryIndex === -1) {
              return null as T;
          }
          return jsonData.ResultSets[queryIndex] as T;
      }
}


declare global {
    // interface Array<T> {
    //     groupBy(this: any[], param: any): any;
    // }

    interface Date {
        toHCDate(this: Date, showTime?: boolean): string;
    }

    interface Number {
        toHCDecimal(this: number): number;
        toHCQty(this: number, zeroAsExcluded?: boolean): string;
    }
}

declare module '@angular/forms' {
    interface FormGroup {
        markAllAsDirty(this: FormGroup): void;
    }
}

// Array.prototype.groupBy = function (param: any): any {
//     type MapFunc<T = any> = (val: T, index?: number, arr?: T[]) => T;

//     const groupBy = <T = any>(arr: T[], fn: MapFunc<T> | string) =>
//         arr.map(typeof fn == 'string' ? (val: any) => val[fn] : fn).reduce((acc, val, i) => {
//             acc[val] = (acc[val] || []).concat(arr[i]);
//             return acc;
//         }, {});

//     return groupBy(this, param);
// };

Date.prototype.toHCDate = function (showTime?: boolean): string {
    let session = new SessionService();
    let datepipe: DatePipe = new DatePipe('en-US');

    let dateFormat = session.getSessionItem(HSessions.DateFormat);

    if (showTime)
        dateFormat += ' hh:mm';

    return datepipe.transform(this, dateFormat)!;
};

Number.prototype.toHCDecimal = function (): number {
    return Math.round((this + Number.EPSILON) * 100) / 100
};

Number.prototype.toHCQty = function (zeroAsExcluded?: boolean): string {
    if (zeroAsExcluded) zeroAsExcluded = true;

    if (this == 0 && zeroAsExcluded)
        return "Excluded";
    if (this == -1)
        return "Unlimited";

    return this.toString();
};

/**
 * Marks all the controls and their nested controls as dirty.
 * @param abstractControls - an array of controls(can be FormControls, FormGroups or FormArrays)
 */
FormGroup.prototype.markAllAsDirty = function (): void {
    Object.values(this.controls).forEach((abstractControl) => {
        (abstractControl as FormControl).markAsDirty({ onlySelf: true });
    });
};