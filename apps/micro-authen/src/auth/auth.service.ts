import {
  ConsoleLogger,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { LogoutDto } from './dto/logout.dto';
import { SupabaseClient } from '@repo/supabase-shared';
import { PrismaClient_SYSTEM } from '@repo/prisma-shared-schema-platform';
import { Http2ServerRequest } from 'http2';
import { async } from 'rxjs';
import { ForgotPasswordDto } from './dto/forgotpassword.dto';

@Injectable()
export class AuthService {
  private logger = new ConsoleLogger('AuthService');

  constructor(
    @Inject('PRISMA_SYSTEM')
    private readonly prisma: typeof PrismaClient_SYSTEM,
    @Inject('SUPABASE') private readonly supabase: typeof SupabaseClient,
  ) {}

  async login(loginDto: LoginDto, version: string) {
    const data = {
      email: loginDto.email,
      password: loginDto.password,
    };

    const {
      data: { session },
      error,
    } = await this.supabase.auth.signInWithPassword(data);

    this.logger.log({
      file: AuthService.name,
      function: this.login.name,
      loginDto: loginDto,
      version: version,
      data: data,
      error: error,
    });

    if (error) {
      return {
        response: { status: HttpStatus.UNAUTHORIZED, message: error.message },
      };
    }

    return {
      data: session,
      response: { status: HttpStatus.OK, message: 'Login successful' },
    };
  }

  async logout(logoutDto: LogoutDto, version: string) {

    const { error } = await this.supabase.auth.signOut();

    this.logger.log({
      file: AuthService.name,
      function: this.logout.name,
      logoutDto: logoutDto,
      version: version,
      error: error,
    });

    if (error) {
      return {
        response: {
          status: HttpStatus.BAD_REQUEST,
          message: error.message,
        },
      };
    }
    return {
      response: { status: HttpStatus.OK, message: 'Logout successful' },
    };
  }

  async register(registerDto: RegisterDto, version: string) {
    const { data, error } = await this.supabase.auth.signUp(registerDto);

    this.logger.log({
      file: AuthService.name,
      function: this.register.name,
      registerDto: registerDto,
      version: version,
      data: data,
      error: error,
    });

    if (error) {
      return {
        response: { status: HttpStatus.BAD_REQUEST, message: error.message },
      };
    }

    return {
      data: data,
      response: { status: HttpStatus.CREATED, message: 'Register successful' },
    };
  }

  async refreshToken(refreshTokenDto: any, version: string) {
    const { data, error } = await this.supabase.auth.refreshSession(refreshTokenDto);

    this.logger.log({
      file: AuthService.name,
      function: this.refreshToken.name,
      refreshTokenDto: refreshTokenDto,
      version: version,
    });

    if (error) {
      return {
        response: { status: HttpStatus.BAD_REQUEST, message: error.message },
      };
    }

    return {
      data: data,
      response: { status: HttpStatus.OK, message: 'Refresh token successful' },
    };
  }

  // async verifyToken(verifyTokenDto: any, version: string) {
  //   const { data, error } = await this.supabase.auth.verifyOtp({
  //     email: verifyTokenDto.email,
  //     token: verifyTokenDto.token,
  //   });

  //   this.logger.log({
  //     file: AuthService.name,
  //     function: this.verifyToken.name,
  //     verifyTokenDto: verifyTokenDto,
  //     version: version,
  //   });

  //   if (error) {
  //     return {
  //       response: { status: HttpStatus.BAD_REQUEST, message: error.message },
  //     };
  //   }

  //   return {
  //     data: data,
  //     response: { status: HttpStatus.OK, message: 'Verify token successful' },
  //   };
  // }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto, version: string) {
    const { data, error } = await this.supabase.auth.resetPasswordForEmail(forgotPasswordDto.email, {
      redirectTo: forgotPasswordDto.redirectTo,
    });

    this.logger.log({
      file: AuthService.name,
      function: this.forgotPassword.name,
      forgotPasswordDto: forgotPasswordDto,
      version: version,
    });

    if (error) {
      return {
        response: { status: HttpStatus.BAD_REQUEST, message: error.message },
      };
    }

    return {
      data: data,
      response: { status: HttpStatus.OK, message: 'Forgot password successful' },
    };
  }

  // async resetPassword(resetPasswordDto: ResetPasswordDto, version: string) {
  //   const { data, error } = await this.supabase.auth.resetPasswordForEmail(resetPasswordDto.email, {
  //     redirectTo: resetPasswordDto.redirectTo,
  //   });

  //   this.logger.log({
  //     file: AuthService.name,
  //     function: this.resetPassword.name,
  //     resetPasswordDto: resetPasswordDto,
  //     version: version,
  //   });

  //   if (error) {
  //     return {
  //       response: { status: HttpStatus.BAD_REQUEST, message: error.message },
  //     };
  //   }

  //   return {
  //     data: data,
  //     response: { status: HttpStatus.OK, message: 'Reset password successful' },
  //   };
  // }

  async changePassword(changePasswordDto: any, version: string) {
    const { data, error } = await this.supabase.auth.updateUser({
      password: changePasswordDto.password,
    });

    this.logger.log({
      file: AuthService.name,
      function: this.changePassword.name,
      changePasswordDto: changePasswordDto,
      version: version,
    });

    if (error) {
      return {
        response: { status: HttpStatus.BAD_REQUEST, message: error.message },
      };
    }

    return {
      data: data,
      response: { status: HttpStatus.OK, message: 'Change password successful' },
    };
  }

  async changeEmail(changeEmailDto: any, version: string) {
    const { data, error } = await this.supabase.auth.updateUser({
      email: changeEmailDto.email,
    });

    this.logger.log({
      file: AuthService.name,
      function: this.changeEmail.name,
      changeEmailDto: changeEmailDto,
      version: version,
    });

    if (error) {
      return {
        response: { status: HttpStatus.BAD_REQUEST, message: error.message },
      };
    }

    return {
      data: data,
      response: { status: HttpStatus.OK, message: 'Change email successful' },
    };
  }

}
