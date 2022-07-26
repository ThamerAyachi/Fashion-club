import { Exclude } from 'class-transformer';

export class SerializedUser {
  id: number;
  username: string;
  email: string;
  imgUrl: string;
  createAt: Date;
  updateAt: Date;
  role: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<SerializedUser>) {
    Object.assign(this, partial);
  }
}
