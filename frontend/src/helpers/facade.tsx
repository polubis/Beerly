import React, { useState, useEffect, useCallback } from 'react';
import { Observable } from 'rxjs';

export class FacadeState<T = unknown> {
  constructor(public data: T | null | [], public isLoading = true, public error = '') {}
}

export interface FacadeProps<T = unknown> {
  initData: T | [] | null;
  getData: Observable<T>;
}

export const useFacade = <T extends any>({
  initData,
  getData
}: FacadeProps<T>): [FacadeState<T>, Function, Function] => {
  const [state, setState] = useState<FacadeState<T>>(new FacadeState<T>(initData));

  const handleGetData = useCallback(() => {
    state.isLoading || setState(new FacadeState<T>(initData));

    getData.subscribe(
      data => {
        setState(new FacadeState<T>(data, false));
      },
      err => {
        setState(new FacadeState<T>(initData, false, err));
      }
    );
  }, []);

  useEffect(() => {
    handleGetData();
  }, []);

  return [state, setState, state.isLoading ? () => {} : handleGetData];
};
