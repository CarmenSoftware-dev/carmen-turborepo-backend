import {
  ConsoleLogger,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { IInviteUser, IRegisterConfirm, RegisterDto } from './dto/register.dto';
import { LogoutDto } from './dto/logout.dto';
import { SupabaseClient } from '@repo/supabase-shared';
import {
  PrismaClient_SYSTEM,
  tb_user,
} from '@repo/prisma-shared-schema-platform';
import { ForgotPasswordDto } from './dto/forgotpassword.dto';
import { JwtService } from '@nestjs/jwt';
import { hashPassword } from '../utils/bcrypt';

@Injectable()
export class AuthService {
  private logger = new ConsoleLogger('AuthService');

  constructor(
    @Inject('PRISMA_SYSTEM')
    private readonly prisma: typeof PrismaClient_SYSTEM,
    @Inject('SUPABASE')
    private readonly supabase: typeof SupabaseClient,

    private readonly jwtService: JwtService,
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

    const userInfo = await this.prisma.tb_user_profile.findFirst({
      where: {
        user_id: session.user.id,
      },
      select: {
        firstname: true,
        middlename: true,
        lastname: true,
      },
    });

    const userBusinessUnit = await this.prisma.tb_user_tb_business_unit
    .findMany({
      where: {
        user_id: session.user.id,
        is_active: true,
      },
      select: {
        is_default: true,
        tb_business_unit: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })
    .then((res) => {
      return res.map((item) => {
        return {
          id: item.tb_business_unit.id,
          name: item.tb_business_unit.name,
          is_default: item.is_default,
        };
      });
    });

    // const access_token = this.jwtService.sign(
    //   { email: loginDto.email },
    //   { expiresIn: '1h' },
    // );

    // const refresh_token = this.jwtService.sign(
    //   { email: loginDto.email },
    //   { expiresIn: '1d' },
    // );

    return {
      data: {
        user_id: session.user.id,
        email: session.user.email,
        access_token: session.access_token,
        refresh_token: session.refresh_token,
        user_info: userInfo,
        business_unit: userBusinessUnit,
      },
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

  async inviteUser(inviteUserDto: IInviteUser, version: string) {
    const findUser = await this.prisma.tb_user.findFirst({
      where: { email: inviteUserDto.email },
    });

    if (findUser) {
      return {
        response: {
          status: HttpStatus.CONFLICT,
          message: 'User already exists',
        },
      };
    }

    const { ...payload }: object = {
      type: 'invite',
      username: inviteUserDto.email,
      email: inviteUserDto.email,
    };

    const token = this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_INVITE_EXPIRES_IN || '1d',
    });

    return {
      data: { token: token },
      response: { status: HttpStatus.OK, message: 'Invite user successful' },
    };
  }

  async registerConfirm(registerConfirmDto: IRegisterConfirm, version: string) {
    const payload = await this.jwtService.verify(
      registerConfirmDto.email_token,
    );

    if (payload.type !== 'invite') {
      return {
        response: { status: HttpStatus.UNAUTHORIZED, message: 'Invalid token' },
      };
    }

    if (
      payload.email !== registerConfirmDto.email ||
      payload.username !== registerConfirmDto.username
    ) {
      return {
        response: { status: HttpStatus.UNAUTHORIZED, message: 'Invalid token' },
      };
    }

    const findUsername = await this.prisma.tb_user.findFirst({
      where: { username: registerConfirmDto.username },
    });

    if (findUsername) {
      return {
        response: {
          status: HttpStatus.CONFLICT,
          message: 'Username already exists',
        },
      };
    }

    const findEmail = await this.prisma.tb_user.findFirst({
      where: { email: registerConfirmDto.email },
    });

    if (findEmail) {
      return {
        response: {
          status: HttpStatus.CONFLICT,
          message: 'Email already exists',
        },
      };
    }

    const { data, error } = await this.supabase.auth.signUp({
      email: registerConfirmDto.email,
      password: registerConfirmDto.password,
    });

    if (error) {
      return {
        response: { status: HttpStatus.BAD_REQUEST, message: error.message },
      };
    }

    const createUser = await this.prisma.tb_user.create({
      data: {
        username: registerConfirmDto.username,
        email: registerConfirmDto.email,
        is_active: true,
      },
    });

    const hashedPassword = await hashPassword(registerConfirmDto.password);
    console.log(hashedPassword, 'password');

    await this.prisma.tb_password.create({
      data: {
        user_id: createUser.id,
        hash: registerConfirmDto.password,
        is_active: true,
      },
    });

    await this.prisma.tb_user_profile.create({
      data: {
        user_id: createUser.id,
        firstname: registerConfirmDto.user_info.first_name,
        middlename: registerConfirmDto.user_info.middle_name,
        lastname: registerConfirmDto.user_info.last_name,
      },
    });

    return {
      data: { id: createUser.id },
      response: {
        status: HttpStatus.CREATED,
        message: 'Register successful',
      },
    };
  }

  async refreshToken(refreshTokenDto: any, version: string) {
    const { data, error } =
      await this.supabase.auth.refreshSession(refreshTokenDto);

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
    const { data, error } = await this.supabase.auth.resetPasswordForEmail(
      forgotPasswordDto.email,
      {
        redirectTo: forgotPasswordDto.redirectTo,
      },
    );

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
      response: {
        status: HttpStatus.OK,
        message: 'Forgot password successful',
      },
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
      response: {
        status: HttpStatus.OK,
        message: 'Change password successful',
      },
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
