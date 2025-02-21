import { Module } from '@nestjs/common';
import { SimulationController } from './simulation.controller';
import { SimulationService } from './simulation.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Attempt, AttemptSchema } from '../attempts/schemas/attempt.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Attempt.name, schema: AttemptSchema }])],
  controllers: [SimulationController],
  providers: [SimulationService],
})
export class SimulationModule {}
