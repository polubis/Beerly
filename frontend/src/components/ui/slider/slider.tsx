import React, { createRef } from 'react';
import { Subject, fromEvent } from 'rxjs';
import { tap, switchMap, takeUntil } from 'rxjs/operators';

import classes from './slider.scss';

type SliderProps = {
  items: any[];
  renderComponent: (item: any) => JSX.Element;
};

type SliderState = {
  clientX: number;
};

class Slider extends React.Component<SliderProps, SliderState> {
  state: SliderState = {
    clientX: 0
  };

  private scrollRef = createRef<HTMLDivElement>() as any;

  scrollStarted = new Subject<React.MouseEvent<HTMLDivElement>>();

  scrollStarted$ = this.scrollStarted
    .asObservable()
    .pipe(
      tap(({ clientX }) => this.setState({ clientX })),
      switchMap(() =>
        fromEvent<MouseEvent>(window, 'mousemove').pipe(
          tap(({ clientX }) => {
            const refNode = this.scrollRef.current;
            refNode.scrollLeft = refNode.scrollLeft - clientX + this.state.clientX;
          }),
          takeUntil(this.scrollFinished$)
        )
      ),
      switchMap(() =>
        fromEvent<MouseEvent>(window, 'mouseup').pipe(
          tap(() => {
            this.scrollFinished.next();
          })
        )
      )
    )
    .subscribe();

  scrollFinished = new Subject<void>();

  scrollFinished$ = this.scrollFinished
    .asObservable()
    .pipe(tap(() => this.setState({ clientX: 0 })));

  shouldComponentUpdate = ({ items }: SliderProps, prevState: SliderState) =>
    prevState !== this.state || items !== this.props.items;

  componentWillUnmount() {
    this.scrollStarted$.unsubscribe();
  }

  onMouseDown = (e: React.MouseEvent<HTMLDivElement>): void => {
    this.scrollStarted.next(e);
  };

  render() {
    const { clientX } = this.state;

    return (
      <div className={classes['slider-wrapper']}>
        <div
          className={[classes.slider, clientX ? classes.grabbing : ''].join(' ')}
          onMouseDown={this.onMouseDown}
          ref={this.scrollRef}
        >
          {this.props.items.map(this.props.renderComponent)}
          <div className={classes.placeholder} />
        </div>
      </div>
    );
  }
}

export default Slider;
