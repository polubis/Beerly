import { Entity, Column } from 'typeorm';

import { Base } from './Base';

@Entity('User')
export class User extends Base {
  @Column({
    length: 50
  })
  public username: string;

  @Column({
    length: 100
  })
  public email: string;

  @Column({
    length: 200
  })
  public passwordHash: string;
}
