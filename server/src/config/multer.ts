import multer from "multer";
import path from 'path';
import crypto from "crypto";

export default {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, "..", "images"),
        filename: (request, file, callBack) => {
            const originalName = file.originalname;

            const body = request.body;
            const hash = crypto.randomBytes(6).toString('hex');
            const fileName = `${hash}-${body.title.toLowerCase().replace(/\s+/g, '_')}${originalName?.slice(originalName.length - 4)}`;

            callBack(null, fileName);
        }
    })
}