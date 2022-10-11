import { PSolutionsValidation } from "../../../PSolutions.Providers/Validation";

export const ResetPasswordSchema = PSolutionsValidation.object().shape({
  newPassword: PSolutionsValidation.string().required().min(6),
  confirmPassword: PSolutionsValidation.string().required().min(6),
});