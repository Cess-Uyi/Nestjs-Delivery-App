import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Rider } from './RiderRegistration.entity';

@Entity('NextOfKin')
export class NextOfKin extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  riderId: string;
  //get from rider

  @OneToOne(() => Rider, (rider) => rider.nextOfKin, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  rider: Rider;

  @Column()
  NOKfullName: string;

  @Column()
  NOKaddress: string;

  @Column()
  NOKphone: string;

  @Column()
  email: string;
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
}
