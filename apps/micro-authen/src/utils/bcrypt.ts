import * as bcrypt from 'bcrypt';

// export const hashPassword = (password: string) => {
//   const salt = bcrypt.genSaltSync(10);
//   return bcrypt.hashSync(password, salt);
// };

// export const comparePassword = (password: string, hash: string) => {
//   return bcrypt.compareSync(password, hash);
// };

export const hashPasswordAsync = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePasswordAsync = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

