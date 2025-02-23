import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Attempt, AttemptDocument } from './schemas/attempt.schema';
import { CreateAttemptDto } from './dto/attemts.dto'
import { firstValueFrom } from 'rxjs';
import { StatusEnum } from '../common/enums';
import { API_URL } from '../config';

@Injectable()
export class AttemptsService {
  constructor(
    @InjectModel(Attempt.name) private attemptModel: Model<AttemptDocument>,
    private httpService: HttpService,
  ) {}

  async findAll(): Promise<Attempt[]> {
    return this.attemptModel.find().exec();
  }

  async sendPhishingAttempt(createAttemptDto: CreateAttemptDto) {
    // Create a record with initial status 'pending'
    const attempt = new this.attemptModel({
      ...createAttemptDto,
      status: StatusEnum.Pending,
      createdAt: new Date(),
    });
    const savedAttempt = await attempt.save();

    // Prepare payload for the simulation server
    const simulationPayload = {
      campaignName: attempt.campaignName,
      description: attempt.description,
      email: attempt.email,
      id: attempt._id
    };

    // Call the Simulation server endpoint
    const simulationUrl = `${API_URL}/phishing/send`;
    try {
      const response = await firstValueFrom(
        this.httpService.post(simulationUrl, simulationPayload), // "publish" event
      );
      return { attempt: savedAttempt, simulationResponse: response.data };
    } catch (error) {
      // Handle error, log it, update status if needed
      return { error: error.message };
    }
  }
}
