import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Trakk registration')
    .setDescription('The Trakk registration API description')
    .setVersion('1.0')
    .addTag('trakk')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('trakk/register', app, document);

  await app.listen(3000);
}
bootstrap();
