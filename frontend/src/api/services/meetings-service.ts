import { Service } from '.';
import { Meeting } from 'models/meeting';
import { meetings } from 'src/__mocks__/meetings';

class MeetingsService extends Service {
  constructor() {
    super('meetings');
  }
  getMeetings = () => this.simulate<Meeting[]>(meetings);
}

export default new MeetingsService();
