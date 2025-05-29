import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';

@Controller('voucher')
export class VoucherController {
  @Get()
  findAll(): string {
    try {
      return 'All vouchers';
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
    return 'Voucher id: ' + id;
  }

  @Post()
  create(): string {
    return 'Voucher Created';
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateVoucher: string): string {
    return 'Voucher Updated';
  }

  @Delete(':id')
  remove(@Param('id') id: string): string {
    return 'Voucher Removed';
  }
}
