import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Rider } from './RiderRegistration.entity';
import { VehicleDocuments } from './VehicleDocument.entity';

@Entity('Vehicle')
export class Vehicle extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  riderId: number;
  //get from rider

  @OneToOne(() => Rider, (rider) => rider.vehicle, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  rider: Rider;

  @Column()
  vehicleName: string;

  @Column()
  vehicleColor: string;

  @Column({ unique: true })
  vehicleNumber: string;

  @Column()
  vehicleCapacity: string;

  @Column('text', {
    array: true,
    default: [],
    nullable: false,
  })
  image: string[];

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

  @ManyToOne(
    () => VehicleDocuments,
    (vehicleDocuments) => vehicleDocuments.vehicle,
  )
  vehicleDocuments: VehicleDocuments[];
}
