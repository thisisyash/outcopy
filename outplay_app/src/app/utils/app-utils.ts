import { Injectable }                from '@angular/core'


@Injectable({
  providedIn: 'root'
})


export class Utils {

  isError(data : Object) {

    if (data['errorMsg'] || data['errorCode']) return true
  }
}