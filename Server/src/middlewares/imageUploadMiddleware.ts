/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import multer from 'multer';
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';

const storage = multer.diskStorage({
  destination(
    req: Express.Request,
    file: Express.Multer.File,
    callback: (error: Error | null, destination: string) => void,
  ) {
    callback(null, 'src/upload');
  },
  filename(
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, filename: string) => void,
  ) {
    const extArray = file.mimetype.split('/');
    const extension = extArray[extArray.length - 1];
    callback(null, `${req.user.userName + uuidv4()}.${extension}`);
  },
});

const upload = multer({
  storage,
});

export default upload;
