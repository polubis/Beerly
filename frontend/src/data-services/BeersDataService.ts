import { EnhancedData } from '.';
import { Beer } from 'models/beer';
import { throwError, BehaviorSubject } from 'rxjs';
import { take, switchMap, tap, catchError } from 'rxjs/operators';
import beersService from 'services/beers-service';

class BeersDataService {
  private _beers = new BehaviorSubject(new EnhancedData<Beer[]>([]));

  private readonly _snapshot = this._beers.pipe(take(1));

  public readonly beers = this._beers.asObservable();

  public loadAllBeers = (page: number) => {
    this._snapshot
      .pipe(
        tap(({ isLoading, data }) => {
          if (!isLoading) {
            this._beers.next(new EnhancedData(data));
          }
        }),
        switchMap(({ data }) => {
          return beersService.get().pipe(
            tap(beers => {
              this._beers.next(
                new EnhancedData(
                  [...data, ...beers].map((b, idx) => ({ ...b, id: page * idx })),
                  false
                )
              );
            }),
            catchError(err => {
              this._beers.next(new EnhancedData([], false, err));
              return throwError(err);
            })
          );
        })
      )
      .subscribe();
  };
}

export default new BeersDataService();
