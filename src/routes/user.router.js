import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlerwares/multer.middleware.js";

const router = Router();

router.route("/register").post(
    upload.fields([
       {
        name: "avatar", //fronted field should also be same
        maxCount: 1
       }, 
       {
        name: "coverImage", //fronted field should also be same
        maxCount: 1
       }
    ]),
    registerUser
);


export default router;