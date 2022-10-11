import { useIntl } from "react-intl";
import { ISelectOption } from "../../../PSolutions.Contracts/Common";

export function usePriceTypeOptions(): Array<ISelectOption> {
  const intl = useIntl();

  return [
    {
      value: 0,
      label: intl.formatMessage({id: "services.service.price.type.fixed"})
    },
    {
      value: 1,
      label: intl.formatMessage({id: "services.service.price.type.varies"})
    },
    {
      value: 2,
      label: intl.formatMessage({id: "services.service.price.type.starts.from"})
    }
  ]
}
