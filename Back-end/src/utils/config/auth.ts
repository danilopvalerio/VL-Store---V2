import { StringValue } from 'ms';

const expiresIn: StringValue = '24h'; // Default expiration time for JWT tokens

export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'default_secret_for_development_only',
  expiresIn: expiresIn,
};
