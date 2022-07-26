import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User as UserEntity } from 'src/typeorm/User';
import { encodePassword } from 'src/utils/bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/CreateUser.dto';
import { SerializedUser } from './SerializedUser';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const password = encodePassword(createUserDto.password);
    const imgUrl = `https://robohash.org/${new Date().getTime()}.png`;
    const createAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const updateAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const user = await this.userRepository.create({
      ...createUserDto,
      password,
      imgUrl,
      createAt,
      updateAt,
    });

    return await this.userRepository.save(user);
  }

  async getAllUsers() {
    const users = await this.userRepository.find();
    return users.map((user) => new SerializedUser(user));
  }

  async findOne(condition: any) {
    return this.userRepository.findOneBy(condition);
  }
}
