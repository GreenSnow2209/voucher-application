import { Injectable } from '@nestjs/common';

@Injectable()
export class VoucherService {
  private vouchers = [];

  findAll() {
    return this.vouchers;
  }

  findOne(id: string) {
    return this.vouchers.find((voucher) => voucher.id === id);
  }

  update(id: string, voucherUpdate: { code?: string }) {
    this.vouchers = this.vouchers.map(voucher => {
      if (voucher.id === id) {
        return {...voucher, ...voucherUpdate};
      }
      return voucher;
    });
    return this.findOne(id);
  }

  delete(id: string) {
    this.vouchers = this.vouchers.filter((voucher) => voucher.id !== id);
    return id;
  }
}
