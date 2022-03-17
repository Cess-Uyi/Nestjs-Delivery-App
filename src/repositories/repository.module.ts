import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestModel } from 'src/models/test.model';

@Module({
  imports: [TypeOrmModule.forFeature([TestModel])],
  exports: [TypeOrmModule],
})
export class RepositoryModule {}
