import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateAttemptDto {
  @IsNotEmpty()
  readonly campaignName: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly description: string;
}
