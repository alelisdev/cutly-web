import { PSolutionsValidation } from "../../../PSolutions.Providers/Validation";

export const ForgotPasswordSchema = PSolutionsValidation.object().shape({
  email: PSolutionsValidation.string().email().required(),
});