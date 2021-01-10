import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { throwError, Subject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  url = 'https://intellizetech.in/anbuTrade/';
  //  url = 'http://localhost:8080/anbutrade/';
  firstName: any;
  name: string;
  orderId: any;
  subject: any ;
  editSubject: any ;
  loggedData: boolean;

  constructor(private httpClient: HttpClient) { }
  formSubmitted(value) {

    return this.httpClient.post(this.url + 'order.php', value).pipe(
      retry(3),
      catchError(this.handleError) // then handle the error

    );

  }
  editSubmitted(value) {

    return this.httpClient.post(this.url + 'edit_update.php', value).pipe(
      retry(3),
      catchError(this.handleError) // then handle the error

    );

  }
  getLiveorder() {
    return this.httpClient.get(this.url + 'live_order.php').pipe(
      retry(3),
      catchError(this.handleError) // then handle the error

    );
  }
  completeOrder(val) {
    return this.httpClient.post(this.url + 'complete_order.php', val).pipe(
      retry(3),
      catchError(this.handleError) // then handle the error

    );
  }
  priorityOrder(val) {
    return this.httpClient.post(this.url + 'priority.php', val).pipe(
      retry(3),
      catchError(this.handleError) // then handle the error

    );
  }

  cancelOrder(val) {
    return this.httpClient.post(this.url + 'cancel_order.php', val).pipe(
      retry(3),
      catchError(this.handleError) // then handle the error

    );
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      error.error.message);
  }
  setOrder(val) {
    console.log(val, 'subject');
    this.subject = val;

  }
  getOrder(): Observable<any> {
    console.log(this.subject.asObservable());
    return this.subject.asObservable();
  }
  clearOrder() {
    this.subject.next();
  }



  setEditorder(val) {
    this.editSubject.next(val);

  }
  getEditorder(): Observable<any> {
    return this.editSubject.asObservable();
  }
  clearEditorder() {
    this.editSubject.next();
  }
  viewOrder(val) {
    return this.httpClient.post(this.url + 'view_order.php', val).pipe(
      retry(3),
      catchError(this.handleError) // then handle the error

    );
  }
  reportOrder() {
    return this.httpClient.get(this.url + 'report_order.php').pipe(
      retry(3),
      catchError(this.handleError) // then handle the error

    );
  }
  editOrder(val) {
    return this.httpClient.post(this.url + 'edit_order.php', val).pipe(
      retry(3),
      catchError(this.handleError) // then handle the error

    );
  }
filterData(val) {
  return this.httpClient.post(this.url + 'report_order.php', val).pipe(
    retry(3),
    catchError(this.handleError) // then handle the error

  );
}

loginData(val) {
  return this.httpClient.post(this.url + 'login.php', val).pipe(
    retry(3),
    catchError(this.handleError) // then handle the error

  );
}
loggedIn(): boolean {
  const lastname = sessionStorage.getItem('loginDetails');
  if (lastname === null || lastname === undefined) {
    this.loggedData = false;
    return false;
  } else {
    this.loggedData = true;
    return true;
  }

}
getPriceList() {
  return this.httpClient.get(this.url + 'priceDetails.php').pipe(
    retry(3),
    catchError(this.handleError) // then handle the error

  );
}
}
