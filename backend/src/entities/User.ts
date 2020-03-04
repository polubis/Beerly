import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public modificationDate: Date;

  @Column()
  public dateOfBirth: Date;

  @Column({
    nullable: true
  })
  public avatar: string;
}
