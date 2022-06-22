import { Router } from "express";

import { ResetPasswordUserController } from "../../../../app/useCases/User/resetPasswordUser/ResetPasswordUserController";
import { SendForgotPasswordMailController } from "../../../../app/useCases/User/sendForgotPasswordMail/SendForgotPasswordMailController";

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordController = new ResetPasswordUserController();

passwordRoutes.post("/forgot", sendForgotPasswordMailController.handle);
passwordRoutes.post("/reset", resetPasswordController.handle);

export { passwordRoutes };
