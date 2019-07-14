import React from 'react';

import AppRoutes from './AppRoutes';
import { ActionType } from 'typesafe-actions';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from "../store/actions";

import { RootState } from "../store/reducers";

type Action = ActionType<typeof actions>;

interface OwnProps {
}

const mapStateToProps = (state: RootState) => ({
  ready: !state.example.ready
});

const mapDispatchToProps = (dispatch: Dispatch<Action>, props: OwnProps) => bindActionCreators({
  exampleAction: () => actions.exampleAction()
}, dispatch);


class App extends React.Component<any, any> {
  componentDidMount() {
    const { exampleAction } = this.props;
    exampleAction();
  }
  render() {
    return <AppRoutes />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);