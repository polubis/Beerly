import { combineEpics } from "redux-observable";

import exampleEpic from './exampleEpic';

const epics = combineEpics(
    ...exampleEpic
);

export default epics;