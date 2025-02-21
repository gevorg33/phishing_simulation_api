import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AttemptsService } from './attempts.service';
import { CreateAttemptDto } from './dto/attemts.dto';
import { AuthGuard } from "../user/guards/auth.guard";
import { Attempt } from './schemas/attempt.schema';

@Controller('attempts')
export class AttemptsController {
  constructor(private readonly attemptsService: AttemptsService) {}

  // retrieve all phishing attempts
  @Get()
  @UseGuards(AuthGuard)
  async findAll(): Promise<Attempt[]> {
    return await this.attemptsService.findAll();
  }

  // trigger sending a phishing attempt via Simulation server
  @Post('send')
  @UseGuards(AuthGuard)
  async sendAttempt(@Body() createAttemptDto: CreateAttemptDto) {
    return await this.attemptsService.sendPhishingAttempt(createAttemptDto);
  }
}
