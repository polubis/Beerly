import { Epic } from "redux-observable";
import { filter, map, tap } from 'rxjs/operators';
import { ActionType, isActionOf } from 'typesafe-actions';

import * as actions from "../actions";

type Action = ActionType<typeof actions>;

import { RootState } from "../reducers";

const exampleEpic: Epic<Action, Action, RootState> = (action$, store) =>
    action$.pipe(
        filter(isActionOf(actions.exampleAction)),
        map(actions.exampleActionSuccess),
        tap(() => {
            console.log('EXAMPLE EPIC ACTION!');
        })
    );

export default [
    exampleEpic
];