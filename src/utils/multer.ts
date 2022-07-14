import { HttpException } from '@/exceptions/HttpException';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { S3 } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { ACCESS_KEY_ID, SECREST_ACCESS_KEY, REGION } from "@/config"

const s3 = new S3({
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECREST_ACCESS_KEY
  },
  region: REGION
})
const ImageStorage = multerS3({
  s3: s3,
  bucket: "tlogcdn",
  contentType: multerS3.AUTO_CONTENT_TYPE,
  acl: 'public-read',
  key: function(req: RequestWithUser, file, cb) {
    cb(null, `images/${req.user.id}_${Date.now()}.jpg`);  
  },
  metadata: function(req, file, cb) {
    cb(null, {
      fieldName: file.fieldname,
      fileOriginalName: file.originalname
    })
  },
})

export const imageUpload = multer({
  storage: ImageStorage,
  limits: { fileSize: 10 * 1024 * 1024 }
});
