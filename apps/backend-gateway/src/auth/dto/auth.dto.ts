import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const InviteUserSchema = z.object({
  email: z
    .string({ required_error: 'Email field is required' })
    .email({ message: 'Invalid email address' }),
});

export type IInviteUser = z.infer<typeof InviteUserSchema>;
export class InviteUserDto extends createZodDto(InviteUserSchema) {}

export const RegisterConfirmSchema = z.object({
  username: z.string({ required_error: 'Username field is required' }),
  email: z
    .string({ required_error: 'Email field is required' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string({ required_error: 'Password field is required' })
    .min(6, { message: 'Password must be at least 6 characters long' }),
  email_token: z.string({ required_error: 'Email token field is required' }),
  user_info: z.object({
    first_name: z.string({ required_error: 'First name field is required' }),
    middle_name: z.string({ required_error: 'Middle name field is required' }),
    last_name: z.string({ required_error: 'Last name field is required' }),
  }),
});
export type IRegisterConfirm = z.infer<typeof RegisterConfirmSchema>;
export class RegisterConfirmDto extends createZodDto(RegisterConfirmSchema) {}

export const LoginSchema = z.object({
  email: z
    .string({ required_error: 'Email field is required' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string({ required_error: 'Password field is required' })
    .min(6, { message: 'Password must be at least 6 characters long' }),
});

export type ILogin = z.infer<typeof LoginSchema>;
export class LoginDto extends createZodDto(LoginSchema) {}
