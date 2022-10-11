import { PSolutionsValidation } from "../../../PSolutions.Providers/Validation";

export const CategorySchema = PSolutionsValidation.object().shape({
  name: PSolutionsValidation.string().required(),
});
