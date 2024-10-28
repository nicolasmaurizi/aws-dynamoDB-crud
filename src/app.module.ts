import { Module } from '@nestjs/common';
//import { AppController } from './app.controller.js';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import 'dotenv/config';


@Module({
  imports: [ UsersModule],
//  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
