import { ActionType, getType } from 'typesafe-actions';

import * as actions from "../actions";

type Action = ActionType<typeof actions>;

export interface ExampleState {
    readonly ready: boolean;
}

const initialState = {
    ready: false,
};

export const exampleReducer = (state: ExampleState = initialState, action: Action): ExampleState => {
    switch (action.type) {
        case getType(actions.exampleActionSuccess):
            return { ...state, ready: true };

        default:
            return state;
    }
};