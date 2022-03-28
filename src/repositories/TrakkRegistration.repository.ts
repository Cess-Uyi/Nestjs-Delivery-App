import { TrakkRegistration } from 'src/entities/TrakkRegistration.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(TrakkRegistration)
export class TrakkRegistrationRepository extends Repository<TrakkRegistration> {}
