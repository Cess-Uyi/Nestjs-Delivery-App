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
import { Vehicle } from './Vehicle.entity';

@Entity('VehicleDocuments')
export class VehicleDocuments extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  vehicleId: number;
  //get from vehicle

  @OneToOne(() => Vehicle, (vehicle) => vehicle.vehicleDocuments, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  vehicle: Vehicle;

  @Column()
  documentName: string;

  @Column({ unique: true })
  documentUrl: string;

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
