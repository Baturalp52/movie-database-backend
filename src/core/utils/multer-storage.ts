import { extname, join } from 'path';
import { diskStorage } from 'multer';

export const MulterStorage = (subfolder = '') =>
  diskStorage({
    destination: join('uploads', subfolder),
    filename: function (req, file, cb) {
      const fn = crypto.randomUUID();

      cb(null, fn + extname(file.originalname));
    },
  });
