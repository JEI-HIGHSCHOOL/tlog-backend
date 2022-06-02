import { HttpException } from '@/exceptions/HttpException';
import { RequestWithUser } from '@/interfaces/auth.interface';
import multer from 'multer';

const ImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/');
  },

  filename: (req: RequestWithUser, file, cb) => {
    cb(null, `${req.user.id}_${Date.now()}.jpg`);
  },
});

export const imageUpload = multer({
  storage: ImageStorage,
  limits: { fileSize: 10 * 1024 * 1024 }
});
