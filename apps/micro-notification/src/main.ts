import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConsoleLogger, Logger } from '@nestjs/common';


export class microNotificationConfig {

  host: string;
  port: number;

  constructor() {
    this.host = process.env.NOTIFICATION_SERVICE_HOST ?? '0.0.0.0';
    this.port = this.getPort();
  }

  getPort() : number {
   if(process.env.NOTIFICATION_SERVICE_PORT){
     return parseInt(process.env.NOTIFICATION_SERVICE_PORT, 5006);
   }else{
     return 5006;
   }
 }
}


async function bootstrap() {

  const logger = new ConsoleLogger('NotificationService');

  const app = await NestFactory.create(AppModule);
  const config = new microNotificationConfig();

  logger.log(`host: ${config.host}`);
  logger.log(`port: ${config.port}`);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: config.host,
      port: config.port,
    },
  });

  await app.startAllMicroservices();
  await app.listen(config.port);

  logger.log(`NotificationService is running on ${config.host}:${config.port}`);
}

bootstrap();
