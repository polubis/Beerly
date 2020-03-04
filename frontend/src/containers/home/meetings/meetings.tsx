import React, { useMemo } from 'react';

import MeetingsFacade from './meetings-facade';

import classes from './meetings.scss';

const Meetings = () =>
  useMemo(
    () => (
      <MeetingsFacade>
        {({ meetings, isLoading }, loadMoreMeetings) => (
          <section className={classes.meetings}>
            <div className={classes.images}>
              {meetings.map(({ id, gridClass, style }) => (
                <figure
                  key={id}
                  style={{
                    background: style.background,
                    backgroundImage: style.backgroundImage,
                    animationDelay: style.animationDelay
                  }}
                  className={classes[gridClass]}
                />
              ))}
            </div>
            {meetings.length > 0 && (
              <button disabled={isLoading} onClick={loadMoreMeetings} className={classes.more}>
                LOAD MORE
              </button>
            )}
          </section>
        )}
      </MeetingsFacade>
    ),
    []
  );

export default Meetings;
