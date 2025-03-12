import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConsoleLogger, Logger } from '@nestjs/common';
import { microAuthenConfig } from '@repo/env-config-shared';

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
