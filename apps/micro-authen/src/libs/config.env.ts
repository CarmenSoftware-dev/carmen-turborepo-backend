import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
    JWT_EXPIRES_IN: dotenv.config().parsed.JWT_EXPIRES_IN ?? '1d',
    JWT_REFRESH_EXPIRES_IN: dotenv.config().parsed.JWT_REFRESH_EXPIRES_IN ?? '7d',
}