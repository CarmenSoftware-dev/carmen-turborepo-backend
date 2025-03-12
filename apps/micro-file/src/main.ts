import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConsoleLogger, Logger } from '@nestjs/common';


export class microFileConfig {

  host: string;
  port: number;

  constructor() {
    this.host = process.env.FILE_SERVICE_HOST ?? '0.0.0.0';
    this.port = this.getPort();
  }

  getPort() : number {
   if(process.env.FILE_SERVICE_PORT){
     return parseInt(process.env.FILE_SERVICE_PORT, 5007);
   }else{
     return 5007;
   }
 }
}


async function bootstrap() {

  const logger = new ConsoleLogger('FileService');

  const app = await NestFactory.create(AppModule);
  const config = new microFileConfig();

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

  logger.log(`FileService is running on ${config.host}:${config.port}`);
}

bootstrap();
