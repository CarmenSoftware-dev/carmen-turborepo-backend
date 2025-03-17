import {
  Injectable,
  Inject,
  ConsoleLogger,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { authAxios } from 'src/common/helpers/requests/axios.helper';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';
import { IInviteUser, ILogin, IRegisterConfirm } from './dto/auth.dto';
// import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private authAxios: AxiosInstance;
  private logger = new ConsoleLogger(AuthService.name);
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
  ) {
    this.authAxios = authAxios();
  }

  /**
   * Login function
   * @param loginDto
   * @param version
   * @returns
   */
  async login(loginDto: ILogin, version: string) {
    const res: Observable<any> = this.authService.send(
      { cmd: 'login', service: 'auth' },
      { data: loginDto, version: version },
    );

    const response = await firstValueFrom(res);

    this.logger.log({
      file: AuthService.name,
      function: this.login.name,
      res: response,
    });

    if (response.response.status !== HttpStatus.OK) {
      throw new HttpException(response.response, response.response.status);
    }

    return response.data;
  }

  async logout(logoutDto: any, version: string) {
    const res: Observable<any> = this.authService.send(
      { cmd: 'logout', service: 'auth' },
      { data: logoutDto, version: version },
    );

    const response = await firstValueFrom(res);

    this.logger.log({
      file: AuthService.name,
      function: this.logout.name,
      res: response,
    });

    if (response.response.status !== HttpStatus.OK) {
      throw new HttpException(response.response, response.response.status);
    }

    return response;
  }

  async register(registerDto: any, version: string) {
    const res: Observable<any> = this.authService.send(
      { cmd: 'register', service: 'auth' },
      { data: registerDto, version: version },
    );

    const response = await firstValueFrom(res);

    this.logger.log({
      file: AuthService.name,
      function: this.register.name,
      res: response,
    });

    if (response.response.status !== HttpStatus.CREATED) {
      throw new HttpException(response.response, response.response.status);
    }

    return response.data;
  }

  async inviteUser(inviteUserDto: IInviteUser, version: string) {
    const res: Observable<any> = this.authService.send(
      { cmd: 'invite-user', service: 'auth' },
      { data: inviteUserDto, version: version },
    );

    const response = await firstValueFrom(res);

    this.logger.log({
      file: AuthService.name,
      function: this.inviteUser.name,
      res: response,
    });

    if (response.response.status !== HttpStatus.OK) {
      throw new HttpException(response.response, response.response.status);
    }

    return response.data;
  }

  async registerConfirm(registerConfirmDto: IRegisterConfirm, version: string) {
    const res: Observable<any> = this.authService.send(
      { cmd: 'register-confirm', service: 'auth' },
      { data: registerConfirmDto, version: version },
    );

    const response = await firstValueFrom(res);

    this.logger.log({
      file: AuthService.name,
      function: this.registerConfirm.name,
      res: response,
    });

    if (response.response.status !== HttpStatus.CREATED) {
      throw new HttpException(response.response, response.response.status);
    }

    return response.data;
  }

  async refreshToken(refreshTokenDto: any, version: string) {
    return await this.authAxios.post(`/refresh-token`, refreshTokenDto, {
      params: { version },
    });
  }

  async verifyToken(verifyTokenDto: any, version: string) {
    return await this.authAxios.post(`/verify-token`, verifyTokenDto, {
      params: { version },
    });
  }

  async forgotPassword(forgotPasswordDto: any, version: string) {
    return await this.authAxios.post(`/forgot-password`, forgotPasswordDto, {
      params: { version },
    });
  }

  async resetPassword(resetPasswordDto: any, version: string) {
    return await this.authAxios.post(`/reset-password`, resetPasswordDto, {
      params: { version },
    });
  }

  async changePassword(changePasswordDto: any, version: string) {
    return await this.authAxios.post(`/change-password`, changePasswordDto, {
      params: { version },
    });
  }

  async changeEmail(changeEmailDto: any, version: string) {
    return await this.authAxios.post(`/change-email`, changeEmailDto, {
      params: { version },
    });
  }
}
