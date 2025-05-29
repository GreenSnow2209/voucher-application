import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VoucherModule } from './voucher/voucher.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [VoucherModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
