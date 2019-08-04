import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

export class Service {
  protected simulate = <T>(data: any): Observable<T> => of(data).pipe(delay(1500));
}
