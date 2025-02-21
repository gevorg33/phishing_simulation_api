export class CreateSimulationDto {
  readonly campaignName: string;
  readonly description: string;
  // Include additional properties as needed
}

export class SendPhishingDto {
  readonly id: string;
  readonly campaignName: string;
  readonly description: string;
  readonly email: string;
}
