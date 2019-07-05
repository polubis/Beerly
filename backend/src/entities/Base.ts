import { PrimaryGeneratedColumn, Column } from 'typeorm';

export abstract class Base {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public creationDate: string;

  @Column()
  public modificationDate: string;
}
