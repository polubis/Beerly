import axios, { AxiosResponse } from 'axios';
import { of, Observable, from } from 'rxjs';
import { delay } from 'rxjs/operators';

export class Service {
  private instance = axios.create({
    baseURL: 'http://localhost:8080/api/',
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' }
  });

  protected simulate = <T>(data: any): Observable<T> => of(data).pipe(delay(1500));

  protected postRawJSON<P, R>(url: string, payload: P) {
    return from(this.instance.post<P, AxiosResponse<R>>(url, payload));
  }

  protected putRawJSON<P, R>(url: string, payload: P) {
    return from(this.instance.put<P, AxiosResponse<R>>(url, payload));
  }
}
