import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { VoucherService } from './voucher.service';

@Controller('voucher')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  @Get()
  findAll(): any {
    try {
      return this.voucherService.findAll();
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: error.message
      }, HttpStatus.BAD_REQUEST, {
        cause: error.cause,
      });
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return this.voucherService.findOne(id);
  }

  @Post()
  create(): string {
    return 'Voucher Created';
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateVoucher: { code?: string }): string {
    return this.voucherService.update(id, updateVoucher);
  }

  @Delete(':id')
  remove(@Param('id') id: string): string {
    return this.voucherService.delete(id);
  }
}
