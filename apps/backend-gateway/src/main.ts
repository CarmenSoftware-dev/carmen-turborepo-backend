import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { patchNestJsSwagger } from 'nestjs-zod';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});

  patchNestJsSwagger();

  const config = new DocumentBuilder()
    .setTitle('CarmenSoftware')
    .setDescription('CarmenSoftware API Gateway')
    .setVersion('1.0')
    .addServer(
      `http://localhost:${process.env.GATEWAY_PORT || 4000}`,
      "local environment",
    )
    .addBearerAuth({
      type: "http",
      scheme: "bearer",
      in: "header",
    })
    .build();

  const document = SwaggerModule.createDocument(app as any, config);
  SwaggerModule.setup('swagger', app as any, document);

  await app.listen(process.env.GATEWAY_PORT ?? 4000);
}
bootstrap();
