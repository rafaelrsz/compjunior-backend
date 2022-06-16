import { Router } from "express";
import multer from "multer";

import { CreateUserController } from "../../../../app/useCases/User/createUser/CreateUserController";
import { DeleteUserController } from "../../../../app/useCases/User/deleteUser/DeleteUserController";
import { ImportCategoryController } from "../../../../app/useCases/User/importUser/ImportUserController";
import { UpdateUserAvatarController } from "../../../../app/useCases/User/updateUserAvatar/UpdateUserAvatarController";
import uploadConfig from "../../../../config/upload";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const deleteUserController = new DeleteUserController();
const importCategoryController = new ImportCategoryController();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const userRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

userRoutes.post("/", createUserController.handle);

userRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);

userRoutes.delete(
  "/delete/:id",
  ensureAuthenticated,
  deleteUserController.handle
);

userRoutes.post(
  "/import",
  upload.single("file"),
  ensureAuthenticated,
  importCategoryController.handle
);

export { userRoutes };
