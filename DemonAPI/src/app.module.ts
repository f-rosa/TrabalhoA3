
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { Pontuacao } from 'src/pontuacao.entity'; 
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'demonrun',
      entities: [Pontuacao],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Pontuacao]),
  ],
  controllers: [AppController],
})
export class AppModule {}
