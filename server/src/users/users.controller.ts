import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guard/JwtAuth.guard';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
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

  @Put('update/:userId')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async updateUser(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: Request,
  ) {
    // if User found
    const oldUser = await this.usersService.findOne({ id: userId });
    if (!oldUser) {
      throw new BadRequestException([`User with id: ${userId} not found`]);
    }
    // test role and same user
    const user: any = req.user;
    if (user.role !== 'SUPER_ADMIN' && user.id !== userId) {
      throw new BadRequestException([
        `You don't have proems to update this user`,
      ]);
    }

    // if new email taken
    const userWithEmail = await this.usersService.findOne({
      email: updateUserDto.email,
    });
    if (userWithEmail) {
      if (userWithEmail.email != oldUser.email) {
        throw new BadRequestException(['email is already taken']);
      }
    }

    await this.usersService.updateUser(updateUserDto, oldUser);

    return { message: 'User Updated', status: HttpStatus.OK };
  }
}
