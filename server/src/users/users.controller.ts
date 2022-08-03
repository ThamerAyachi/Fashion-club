import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guard/JwtAuth.guard';
import { CreateUserDto } from './dto/CreateUser.dto';
import { SerializedUser } from './SerializedUser';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async getUsers() {
    const users = await this.usersService.getAllUsers();
    if (!users[0]) {
      throw new HttpException('Users is null', HttpStatus.BAD_REQUEST);
    }

    return users;
  }

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  async createUser(@Body() createUserDto: CreateUserDto) {
    const ifUserFound = await this.usersService.findOne({
      email: createUserDto.email,
    });

    if (ifUserFound) {
      throw new BadRequestException(['email is already taken!']);
    }
    const user = await this.usersService.createUser(createUserDto);

    return new SerializedUser(user);
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  getUser(@Req() req: Request) {
    return req.user;
  }
}
