import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { LogoutDto } from './dto/logout.dto';
import { ForgotPasswordDto } from './dto/forgotpassword.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'login', service: 'auth' })
  login(@Payload() payload: any) {
    const version: string = payload.version ?? 1;
    const loginDto: LoginDto = payload.data;
    return this.authService.login(loginDto, version);
  }

  @MessagePattern({ cmd: 'logout', service: 'auth' })
  logout(@Payload() payload: any) {
    const version: string = payload.version ?? 1;
    const logoutDto: LogoutDto = payload.data;

    return this.authService.logout(logoutDto, version);
  }

  @MessagePattern({ cmd: 'register', service: 'auth' })
  register(@Payload() payload: any) {
    const version: string = payload.version ?? 1;
    const registerDto: RegisterDto = payload.data;
    return this.authService.register(registerDto, version);
  }

  @MessagePattern({ cmd: 'refresh-token', service: 'auth' })
  refreshToken(@Payload() payload: any) {
    const version: string = payload.version ?? 1;
    const refreshTokenDto: any = payload.data;
    return this.authService.refreshToken(refreshTokenDto, version);
  }

  // @MessagePattern({ cmd: 'verify-token', service: 'auth' })
  // verifyToken(@Payload() payload: any) {
  //   const version: string = payload.version ?? 1;
  //   const verifyTokenDto: any = payload.data;
  //   return this.authService.verifyToken(verifyTokenDto, version);
  // }

  @MessagePattern({ cmd: 'forgot-password', service: 'auth' })
  forgotPassword(@Payload() payload: any) {
    const version: string = payload.version ?? 1;
    const forgotPasswordDto: ForgotPasswordDto = payload.data;
    return this.authService.forgotPassword(forgotPasswordDto, version);
  }

  // @MessagePattern({ cmd: 'reset-password', service: 'auth' })
  // resetPassword(@Payload() payload: any) {
  //   const version: string = payload.version ?? 1;
  //   const resetPasswordDto: ResetPasswordDto = payload.data;
  //   return this.authService.resetPassword(resetPasswordDto, version);
  // }

  // @MessagePattern({ cmd: 'change-password', service: 'auth' })
  // changePassword(@Payload() payload: any) {
  //   const version: string = payload.version ?? 1;
  //   const changePasswordDto: ChangePasswordDto = payload.data;
  //   return this.authService.changePassword(changePasswordDto, version);
  // }

  // @MessagePattern({ cmd: 'change-email', service: 'auth' })
  // changeEmail(@Payload() payload: any) {
  //   const version: string = payload.version ?? 1;
  //   const changeEmailDto: ChangeEmailDto = payload.data;
  //   return this.authService.changeEmail(changeEmailDto, version);
  // }
}
