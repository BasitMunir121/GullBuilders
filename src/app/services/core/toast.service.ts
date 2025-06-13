import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
    providedIn: 'root'
})
export class NotifyService  {
    constructor(private _snackBar: MatSnackBar)
{
    
}

showToast(data: string, isError?:boolean)
{
  if(isError)
  {
    this._snackBar.open(data,'x',{panelClass:'danger-snackbar'});

  }else
  {
  this._snackBar.open(data,'x',);
  }
}

}
