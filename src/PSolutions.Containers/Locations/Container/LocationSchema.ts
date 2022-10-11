import { PSolutionsValidation } from "../../../PSolutions.Providers/Validation";

export const LocationSchema = PSolutionsValidation.object().shape({
  name: PSolutionsValidation.string().required(),
  city: PSolutionsValidation.string().required(),
  street: PSolutionsValidation.string().required(),
  country: PSolutionsValidation.string().required(),
  zipCode: PSolutionsValidation.number().required(),
  phoneNumber: PSolutionsValidation.string().required(),
  streetNumber: PSolutionsValidation.number().required(),
});
