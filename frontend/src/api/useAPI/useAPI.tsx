import { useState, useMemo, useEffect, useContext } from 'react';
import { AxiosResponse } from 'axios';
import { Observable, Subject, of } from 'rxjs';
import { switchMap, tap, catchError, debounceTime } from 'rxjs/operators';

import { AlertProviderState, AlertProviderContext } from 'components/ui/alert';
import { ErrorResponse } from '../models/responses/error-response';
import { parseError } from '../utils/responseParsers';
import { ParsedError } from '../models/api-errors';

export const useApi = <P extends any, R extends any>(
  serviceAsyncMethod: (payload: P) => Observable<AxiosResponse<R>>,
  onSuccess: (response: AxiosResponse<R>) => void = () => {},
  onFailure: (error: ParsedError) => void = () => {}
): {
  isSending: boolean;
  handleApiCall: (payload: P) => void;
} => {
  const [isSending, setIsSending] = useState(false);

  const sending = useMemo(() => new Subject<P>(), []);

  const sending$ = useMemo(
    () =>
      sending.asObservable().pipe(
        tap(() => setIsSending(true)),
        debounceTime(300),
        switchMap(payload =>
          serviceAsyncMethod(payload).pipe(
            tap((response: AxiosResponse<R>) => {
              setIsSending(false);
              onSuccess(response);
            }),
            catchError((error?: ErrorResponse) => {
              setIsSending(false);
              onFailure(parseError(error));
              return of(null);
            })
          )
        )
      ),
    []
  );

  const handleApiCall = (payload: P) => {
    if (!isSending) {
      sending.next(payload);
    }
  };

  useEffect(() => {
    const sub = sending$.subscribe();

    return () => {
      sub.unsubscribe();
    };
  }, []);

  return {
    isSending,
    handleApiCall
  };
};

export const useApiWithAlert = <P extends any, R extends any>(
  serviceAsyncMethod: (payload: P) => Observable<AxiosResponse<R>>,
  onSuccess: (response: AxiosResponse<R>) => void = () => {},
  onFailure: (error: ParsedError) => void = () => {}
) => {
  const { setAlertProps } = useContext<AlertProviderState>(AlertProviderContext);

  return useApi<P, R>(serviceAsyncMethod, onSuccess, (error: ParsedError) => {
    setAlertProps({
      message: error.message,
      open: true,
      onClose: () =>
        setAlertProps({
          message: '',
          open: false
        })
    });
    onFailure(error);
  });
};
