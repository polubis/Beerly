import { Entity, Column } from 'typeorm';

import { Base } from './Base';

@Entity('PendingAccount')
export class PendingAccount extends Base {
  @Column({
    length: 20
  })
  public username: string;

  @Column({
    length: 100
  })
  public email: string;

  @Column({
    length: 200
  })
  public password: string;

  @Column({
    nullable: true
  })
  public confirmationLink: string;

  @Column()
  public dateOfBirth: Date;
}
