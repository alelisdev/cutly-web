import { PSolutionsValidation } from "../../../PSolutions.Providers/Validation";

export const PasswordSchema = PSolutionsValidation.object().shape({
  oldPassword: PSolutionsValidation.string().email().required(),
  newPassword: PSolutionsValidation.string().required().min(6),
  repeatPassword: PSolutionsValidation.string().required().min(6),
});
