import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AttemptsModule } from './attempts/attempts.module';
import { SimulationModule } from './simulation/simulation.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AuthMiddleware } from './user/middlewares/auth.middleware';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './common/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    MongooseModule.forRoot('mongodb+srv://gevorggasparyan33:amASh4ab9oSliIpW@cluster0.gqfsk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
    UserModule,
    AttemptsModule,
    SimulationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
