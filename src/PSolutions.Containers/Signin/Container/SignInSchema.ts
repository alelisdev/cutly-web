import { PSolutionsValidation } from "../../../PSolutions.Providers/Validation";

export const SignInSchema = PSolutionsValidation.object().shape({
  email: PSolutionsValidation.string().email().required(),
  password: PSolutionsValidation.string().required().min(6),
});
