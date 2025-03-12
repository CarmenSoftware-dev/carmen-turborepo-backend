import { ConsoleLogger, Inject, Injectable, Logger } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { LogoutDto } from './dto/logout.dto';
import { SupabaseClient } from '@repo/supabase-shared';
import { PrismaClient_SYSTEM } from '@repo/prisma-shared-schema-platform';

@Injectable()
export class AuthService {

  private logger = new ConsoleLogger('AuthService');

  constructor(
    @Inject('PRISMA_SYSTEM') private readonly prisma: typeof PrismaClient_SYSTEM,
    @Inject('SUPABASE') private readonly supabase: typeof SupabaseClient,
  ) {}

  login(loginDto: LoginDto) {
    return this.supabase.auth.signInWithPassword(loginDto);
  }

  register(registerDto: RegisterDto) {
    return this.supabase.auth.signUp(registerDto);
  }

  logout(logoutDto: LogoutDto) {
    return this.supabase.auth.signOut();
  }
}
