import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConsoleLogger, Logger } from '@nestjs/common';


export class microAuthenConfig {

  host: string;
  port: number;

  constructor() {
    this.host = process.env.AUTH_SERVICE_HOST ?? '0.0.0.0';
    this.port = this.getPort();
  }

  getPort() : number {
   if(process.env.AUTH_SERVICE_PORT){
     return parseInt(process.env.AUTH_SERVICE_PORT, 5001);
   }else{
     return 5001;
   }
 }
}


async function bootstrap() {

  const logger = new ConsoleLogger('AuthenticationService');

  const app = await NestFactory.create(AppModule);
  const config = new microAuthenConfig();

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

  logger.log(`AuthenticationService is running on ${config.host}:${config.port}`);
}

bootstrap();
