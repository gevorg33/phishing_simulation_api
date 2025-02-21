import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SendPhishingDto } from './dto/simulation.dto';
import * as nodemailer from 'nodemailer';
import { StatusEnum } from '../common/enums';
import { Attempt, AttemptDocument } from '../attempts/schemas/attempt.schema';

@Injectable()
export class SimulationService {
  constructor(
    @InjectModel(Attempt.name) private attemptModel: Model<AttemptDocument>,
  ) {}

  // Send a phishing email and create a record in the DB
  async sendPhishingEmail(sendPhishingDto: SendPhishingDto): Promise<Attempt> {
    // Create a new simulation record with status 'sent'

    const updatedAttempt = await this.attemptModel.findByIdAndUpdate(
      sendPhishingDto.id,
      { status: StatusEnum.Sent, updatedAt: new Date() },
    )

    // Construct the phishing link using the record's unique ID
    const phishingLink = `http://localhost:3000/phishing/click?id=${sendPhishingDto.id}`;

    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email', // e.g., smtp.gmail.com
      port: 587, // or 465 for secure
      secure: false, // use true if port is 465
      auth: {
        user: 'josefa28@ethereal.email',
        pass: '2wUs39dbsRjrykJuWd',
      },
    });

    // Define email options
    const mailOptions = {
      from: 'josefa28@ethereal.email',
      to: sendPhishingDto.email,
      subject: `Phishing Simulation: ${sendPhishingDto.campaignName}`,
      text: `Please click the following link to participate in the phishing simulation: ${phishingLink}`,
      html: `<p>Please click the following link to participate in the phishing simulation:</p>
             <a href="${phishingLink}">${phishingLink}</a>`,
    };

    // Send the email
    const messageInfo = await transporter.sendMail(mailOptions);

    console.log("Message sent: %s", messageInfo.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(messageInfo));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    return updatedAttempt as Attempt;
  }

  // Handle the phishing link click and update the DB status to 'clicked'
  async handlePhishingClick(id: string): Promise<Attempt> {
    const updatedAttempt = await this.attemptModel.findByIdAndUpdate(
      id,
      { status: StatusEnum.Clicked, updatedAt: new Date() },
    );
    return updatedAttempt as Attempt;
  }
}
