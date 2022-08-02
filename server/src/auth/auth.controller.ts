import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { comparePassword } from 'src/utils/bcrypt';
import { SignInDto } from './dto/SignIn.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Post('login')
  async login(@Body() signInDto: SignInDto) {
    const email = signInDto.email;
    const user = await this.usersService.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('invalid credentials');
    }

    if (!(await comparePassword(signInDto.password, user.password))) {
      throw new UnauthorizedException('invalid credentials');
    }

    const token = await this.jwtService.signAsync({
      id: user.id,
      email: user.email,
    });

    return {
      massage: 'Login Succuss!',
      status: HttpStatus.CREATED,
      token: token,
    };
  }
}
