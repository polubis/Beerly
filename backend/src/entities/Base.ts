import { PrimaryGeneratedColumn, Column } from 'typeorm';

export abstract class Base {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public creationDate: Date = new Date();

  @Column()
  public modificationDate: Date = new Date();
}
