import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { SimulationService } from './simulation.service';
import { SendPhishingDto } from './dto/simulation.dto';

@Controller('phishing')
export class SimulationController {
  constructor(private readonly simulationService: SimulationService) {}

  // Endpoint to send a phishing email
  @Post('send')
  async sendPhishingEmail(@Body() sendPhishingDto: SendPhishingDto) {
    return await this.simulationService.sendPhishingEmail(sendPhishingDto);
  }

  // Endpoint that is triggered when the phishing link is clicked
  @Get('click')
  async handlePhishingClick(@Query('id') id: string) {
    return await this.simulationService.handlePhishingClick(id);
  }
}
