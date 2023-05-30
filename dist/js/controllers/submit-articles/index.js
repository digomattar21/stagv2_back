"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.articleSubmission = void 0;
const cloudinary_1 = require("cloudinary");
const articleSubmission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //verify the things in req.body
        config();
        console.log(req.body);
        console.log(req.file.originalname);
        if (req.file) {
            const response = yield new Promise((resolve, reject) => {
                const uploadStream = cloudinary_1.v2.uploader.upload_stream({ resource_type: "auto" }, (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(result);
                    }
                });
                uploadStream.end(req.file.buffer);
            });
            console.log(response);
        }
        //verify upload, get the secure_url from response and save to mongo
        res.status(200).json({ success: true });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ error: error });
    }
});
exports.articleSubmission = articleSubmission;
const config = () => {
    return cloudinary_1.v2.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_KEY_SECRET,
    });
};
