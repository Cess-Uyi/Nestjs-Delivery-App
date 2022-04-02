import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { NextOfKin } from './NextOfKin.entity';
import { TrakkRegistration } from './TrakkRegistration.entity';
import { Vehicle } from './Vehicle.entity';

@Entity('Rider')
export class Rider extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  zebrraId: string;
  //get from users in TrakkRegistration entity

  @OneToOne(() => TrakkRegistration, (user) => user.rider, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  user: TrakkRegistration;

  @Column()
  avatar: string;

  @Column()
  dateOfBirth: string;

  @Column()
  stateOfOrigin: string;

  @Column()
  stateOfResidence: string;

  @Column()
  residentialAddress: string;

  @Column({ unique: true })
  phone: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @OneToOne(() => Vehicle, (vehicle) => vehicle.rider)
  vehicle: Vehicle;

  @OneToOne(() => NextOfKin, (nextOfKin) => nextOfKin.rider)
  nextOfKin: NextOfKin;
}
