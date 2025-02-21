import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { StatusEnum } from '../../common/enums';

export type AttemptDocument = Attempt & Document;

@Schema()
export class Attempt {
  @Prop({ required: true })
  campaignName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: false })
  description: string;

  @Prop({ default: StatusEnum.Pending })
  status: StatusEnum;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: null, required: false })
  updatedAt?: Date;
}

export const AttemptSchema = SchemaFactory.createForClass(Attempt);
