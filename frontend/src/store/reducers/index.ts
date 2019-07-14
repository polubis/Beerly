import { combineReducers } from "redux";

import {exampleReducer, ExampleState} from './exampleReducer';

export type RootState = {
    example: ExampleState
};

const reducers = combineReducers({
    example: exampleReducer
});

export default reducers;