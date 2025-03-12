import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { LogoutDto } from './dto/logout.dto';


@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('login')
  login(@Payload() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @MessagePattern('logout')
  logout(@Payload() logoutDto: LogoutDto) {
    return this.authService.logout(logoutDto);
  }

  @MessagePattern('register')
  register(@Payload() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
