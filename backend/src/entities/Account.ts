import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';

import { Base } from './Base';
import { User } from './User';

@Entity('Account')
export class Account extends Base {
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

  @OneToOne(type => User, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  public user: User;
}
