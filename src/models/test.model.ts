import { Column, Entity } from 'typeorm';
import { BaseModel } from './base.model';

@Entity('TestModelTable')
export class TestModel extends BaseModel {
  @Column()
  name: string;
}
