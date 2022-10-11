import { PSolutionsValidation } from "../../../PSolutions.Providers/Validation";

export const ServiceValidationSchema = PSolutionsValidation.object().shape({
  employees: PSolutionsValidation.array().min(1),
  serviceName: PSolutionsValidation.string().required().min(2),
  estimatedDuration: PSolutionsValidation.number().required().positive(),
  priceTypeEnum: PSolutionsValidation.number().oneOf([0, 1, 2,]).required(),

  price: PSolutionsValidation.number().transform((value: string) => parseFloat(value)).required().positive(),
  priceTo: PSolutionsValidation.number().when("priceTypeEnum", {
    is: (priceTypeEnum: number) => priceTypeEnum !== 0,
    then: PSolutionsValidation.number().transform((value: string) => parseFloat(value)).required().positive()
  })
});
