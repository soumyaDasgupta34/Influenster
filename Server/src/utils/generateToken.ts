/* eslint-disable implicit-arrow-linebreak */
import { sign, Secret } from 'jsonwebtoken';

const generateAccessToken = (id: string) =>
  sign({ id }, process.env.JWT_SECRET as Secret, {
    expiresIn: '90m',
  });

export default generateAccessToken;
