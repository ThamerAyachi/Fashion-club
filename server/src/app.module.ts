import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesModule } from './messages/messages.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import entities from './typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'bjigseq8k9fvwbrmzx5k-mysql.services.clever-cloud.com',
      port: 3306,
      username: 'uoxdfmcc0ahafmz6',
      password: 'gkzr4xEoJacvozTDnbeM',
      database: 'bjigseq8k9fvwbrmzx5k',
      entities: entities,
      synchronize: true,
    }),
    MessagesModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
