import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConsoleLogger, Logger } from '@nestjs/common';
import { microTenantConfig } from '@repo/env-config-shared';

async function bootstrap() {

  const logger = new ConsoleLogger('TenantService');

  const app = await NestFactory.create(AppModule);
  const config = new microTenantConfig();

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

  logger.log(`TenantService is running on ${config.host}:${config.port}`);
}

bootstrap();
