import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    length: 50
  })
  public username: string;

  @Column()
  public modificationDate: Date;

  @Column({
    nullable: true
  })
  public dateOfBirth: Date;

  @Column({
    nullable: true
  })
  public avatar: string;
}
