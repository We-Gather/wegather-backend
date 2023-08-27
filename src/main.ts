import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { LifeCycleService } from '@app/core/lifeCycle/LifeCycleService';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO에 없는 값은 거르고 에러 메시지 출력
      forbidNonWhitelisted: true, // DTO에 존재하지 않는 값이 들어오면 에러 메시지 출력
      transform: true, // param으로 넘어오는 값을 전부 string으로 받아오기 때문에 transform을 true로 해줘야 자동으로 타입 변환해줌.
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const config = new DocumentBuilder()
    .setTitle('Wegather API Docs')
    .setDescription('List of APIs')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.get(LifeCycleService).startService();
  await app.listen(3000);
}
bootstrap();
