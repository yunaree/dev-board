import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
    const config = new DocumentBuilder()
    .setTitle('Task Management API')
    .setDescription('Документація для DevBoard API')
    .setVersion('1.0')
    .addBearerAuth() 
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.enableCors({
    origin: 'http://localhost:3001',  // Дозволити доступ лише з цього домену
    credentials: true,                // Дозволити передавати cookies та інші креденшіали
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
