import React from 'react';
import { Subject } from 'rxjs';
import { tap, switchMap, debounceTime } from 'rxjs/operators';

import meetingsService from 'services/meetings-service';
import { colors } from 'src/constants';
import { Meeting } from 'models/meeting';

export type StyledMeeting = {
  id: number;
  gridClass: string;
  style: {
    background?: string;
    backgroundImage?: string;
    animationDelay?: string;
  };
};

type MeetingsFacadeProps = {
  children: (meetings: StyledMeeting[], loadMore: () => void, isLoading: boolean) => JSX.Element;
};

type MeetingsFacadeState = {
  meetings: StyledMeeting[];
  isLoading: boolean;
};

export default class MeetingsFacade extends React.Component<
  MeetingsFacadeProps,
  MeetingsFacadeState
> {
  createLoaders = (lastMeetingId: number): StyledMeeting[] => {
    const gridClasses = ['size1', 'size2'];
    const colorsAsArray = Object.values(colors);

    return Array.from({ length: 20 }, (_, i) => i).map(i => {
      const random = Math.random();
      return {
        id: i + lastMeetingId + 1,
        gridClass: gridClasses[i % 2],
        style: {
          background: colorsAsArray[Math.floor(random * (colorsAsArray.length - 1))],
          animationDelay: `${random.toFixed(1)}s`
        }
      };
    });
  };

  mergeMeetings = (meetings: Meeting[]): StyledMeeting[] => {
    let acc = 0;
    return this.state.meetings.map(m => {
      if (m.style.backgroundImage) {
        return m;
      }

      const newMeeting: StyledMeeting = {
        ...m,
        style: {
          backgroundImage: `url(${meetings[acc].picture})`
        }
      };
      acc++;

      return newMeeting;
    });
  };

  onGetMeetings = meetingsService.getMeetings().pipe(
    tap(meetings => {
      this.setState({ meetings: this.mergeMeetings(meetings), isLoading: false });
    })
  );

  clicked = new Subject<React.MouseEvent<any>>();
  clicked$ = this.clicked
    .asObservable()
    .pipe(
      debounceTime(150),
      tap(() => {
        this.setState({
          isLoading: true,
          meetings: [...this.state.meetings, ...this.createLoaders(this.state.meetings.length)]
        });
      }),
      switchMap(() => this.onGetMeetings)
    )
    .subscribe();

  state: MeetingsFacadeState = { meetings: this.createLoaders(0), isLoading: true };

  componentDidMount() {
    this.onGetMeetings.subscribe();
  }

  shouldComponentUpdate = (_, prevState: MeetingsFacadeState) => prevState !== this.state;

  componentWillUnmount() {
    this.clicked$.unsubscribe();
  }

  loadMore = (): void => {
    if (!this.state.isLoading) {
      this.clicked.next();
    }
  };

  render() {
    return this.props.children(this.state.meetings, this.loadMore, this.state.isLoading);
  }
}
