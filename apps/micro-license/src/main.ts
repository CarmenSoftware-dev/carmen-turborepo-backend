import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConsoleLogger, Logger } from '@nestjs/common';


export class microLicenseConfig {

  host: string;
  port: number;

  constructor() {
    this.host = process.env.LICENSE_SERVICE_HOST ?? '0.0.0.0';
    this.port = this.getPort();
  }

  getPort() : number {
   if(process.env.LICENSE_SERVICE_PORT){
     return parseInt(process.env.LICENSE_SERVICE_PORT, 5003);
   }else{
     return 5003;
   }
 }
}


async function bootstrap() {

  const logger = new ConsoleLogger('LicenseService');

  const app = await NestFactory.create(AppModule);
  const config = new microLicenseConfig();

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

  logger.log(`LicenseService is running on ${config.host}:${config.port}`);
}

bootstrap();
