import axios, { AxiosResponse } from 'axios';
import { of, Observable, from } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ControllersPaths } from '../models/controllers-paths';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api/',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
});

export class Service {
  constructor(private path: ControllersPaths) {}

  protected simulate = <T>(data: any): Observable<T> => of(data).pipe(delay(1500));

  protected postRawJSON = <P, R>(url: string, payload: P) =>
    from(instance.post<P, AxiosResponse<R>>(this.path + url, payload));

  protected putRawJSON = <P, R>(url: string, payload: P) =>
    from(instance.post<P, AxiosResponse<R>>(this.path + url, payload));
}
