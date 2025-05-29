import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      "user_id": "583c3ac3f38e84297c002546",
      "email": "test@test.com",
      "nickname": "test",
    },
    {
      "user_id": "583c5484cb79a5fe593425a9",
      "email": "test1@test.com",
      "nickname": "test1",
    },
    {
      "user_id": "583c57672c7686377d2f66c9",
      "email": "aaa@aaa.com",
      "nickname": "aaa",
    },
    {
      "user_id": "5840b954da0529cd293d76fe",
      "email": "a@a.com",
      "nickname": "a",
    }
  ];

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    return this.users.find(user => user.user_id === id);
  }

  update(id: string, userUpdate: { email?: string, nickname?: string }) {
    this.users = this.users.map(user => {
      if (user.user_id === id) {
        return {...user, ...userUpdate};
      }
      return user;
    })
    return this.findOne(id);
  }

  delete(id: string) {
    this.users = this.users.filter(user => user.user_id !== id);
  }
}
