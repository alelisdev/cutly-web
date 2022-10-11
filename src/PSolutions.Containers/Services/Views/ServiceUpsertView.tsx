import { useIntl } from "react-intl";
import { FormikProps } from "formik";
import React, { useRef } from "react";
import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IService } from "../Types";
import { usePriceTypeOptions } from "../Options";
import { IEmployee } from "../../Employees/Types";
import { IRootState } from "../../../PSolutions.State";
import { ServiceBanner } from "../Components/ServiceBanner";
import { SidebarServiceDelete } from "../Components/ServiceDelete";
import ServiceEmployeeItem from "../Components/ServiceEmployeeItem";
import { InputField } from "../../../PSolutions.UI/Fields/InputField";
import { SelectField } from "../../../PSolutions.UI/Fields/SelectField";
import { TextAreaField } from "../../../PSolutions.UI/Fields/TextAreaField";
import { PSFormRow } from "../../../PSolutions.UI/Form/FormLayout/PSFormRow";
import { ServiceUpsertFooter } from "../Components/Footer/ServiceUpsertFooter";
import { PSFormCard } from "../../../PSolutions.UI/Form/FormLayout/PSFormCard";
import { PSFormHolder } from "../../../PSolutions.UI/Form/FormLayout/PSFormHolder";
import { deleteServiceAsync, getServiceAsync, uploadServiceAvatarAsync } from "../Redux/Actions";

interface Props extends FormikProps<IService> {
}

export const ServiceUpsertView = React.memo(({submitForm, isSubmitting, isValid, values}: Props) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleBackClick = () => navigate(-1);
  const scrollRef = useRef<HTMLDivElement>(null);

  const employees = useSelector((state: IRootState) => state.employee.data);
  const isDeleting = useSelector((state: IRootState) => state.services.isDeleting);
  const currentLocation = useSelector((state: IRootState) => state.currentLocation.location);
  const selectedEmployees = useSelector((state: IRootState) => state.services?.selectedItem?.employees || []);

  async function uploadAvatarAsync(base64: string) {
    await dispatch(uploadServiceAvatarAsync(values.id, base64));
    if (!!values.id) await dispatch(getServiceAsync(values.id));
  }

  async function m_deleteServicesAsync() {
    const deleted = await dispatch(deleteServiceAsync(values.id))
    if (!!deleted) handleBackClick();
  }

  const submitDisabled = isSubmitting || !isValid;
  const showPriceTo = values.priceTypeEnum !== 0;
  const currency = values.currency ? values.currency : currentLocation.currency;

  return (
    <React.Fragment>
      <ServiceBanner service={values} uploadImageAsync={uploadAvatarAsync} disabled={!values.id}/>
      <PSFormHolder>
        <Col xl={8}>
          <PSFormCard className="mb-3" title={intl.formatMessage({id: "generic.messages.profile.settings"})}>
            <PSFormRow>
              <InputField
                type="text"
                colNum={4}
                required={true}
                id="serviceName"
                name="serviceName"
                label={intl.formatMessage({id: 'generic.messages.service.name.title'})}
                placeholder={intl.formatMessage({id: 'generic.messages.service.name.placeholder'})}
              />
              <InputField
                type="text"
                colNum={4}
                required={false}
                id="englishTranslation"
                name="englishTranslation"
                label={intl.formatMessage({id: 'services.service.service.name.title.english'})}
                placeholder={intl.formatMessage({id: 'services.service.service.name.placeholder.english'})}
              />
              <InputField
                colNum={4}
                type="number"
                id="estimatedDuration"
                name="estimatedDuration"
                required={true}
                suffix="min"
                label={intl.formatMessage({id: 'generic.messages.service.est.duration.title'})}
                placeholder={intl.formatMessage({id: 'generic.messages.service.est.duration.placeholder'})}
              />
            </PSFormRow>
            <PSFormRow>
              <SelectField
                required
                colNum={4}
                id="priceTypeEnum"
                name="priceTypeEnum"
                options={usePriceTypeOptions()}
                label={intl.formatMessage({id: 'generic.messages.service.price.type.title'})}
                placeholder={intl.formatMessage({id: 'generic.messages.service.price.type.placeholder'})}
              />
              <InputField
                colNum={4}
                id="price"
                name="price"
                type="text"
                required={true}
                suffix={currency}
                label={intl.formatMessage({id: 'generic.messages.service.price.title'})}
                placeholder={intl.formatMessage({id: 'generic.messages.service.price.placeholder'})}
              />
              <InputField
                colNum={4}
                id="priceTo"
                name="priceTo"
                type="text"
                required={false}
                suffix={currency}
                hide={!showPriceTo}
                label={intl.formatMessage({id: 'generic.messages.service.price.to.title'})}
                placeholder={intl.formatMessage({id: 'generic.messages.service.price.to.placeholder'})}
              />
            </PSFormRow>
            <PSFormRow>
              <TextAreaField
                rows={5}
                colNum={12}
                id="description"
                name="description"
                required={false}
                label={intl.formatMessage({id: 'generic.messages.service.description.title'})}
                placeholder={intl.formatMessage({id: 'generic.messages.service.description.placeholder'})}
              />
            </PSFormRow>
          </PSFormCard>
          <PSFormCard title={intl.formatMessage({id: "generic.messages.employees"})} bodyRef={scrollRef}>
            {employees.map((e: IEmployee, i: number) => <ServiceEmployeeItem key={i} employee={e} selectedEmployees={selectedEmployees} values={values} index={e.orderingNumber}/>)}
            <ServiceUpsertFooter disabled={submitDisabled} iSubmitting={isSubmitting} onSubmit={submitForm} onBackClick={handleBackClick}/>
          </PSFormCard>
        </Col>
        <SidebarServiceDelete onDeleteServiceAsync={m_deleteServicesAsync} isBusy={isDeleting} disabled={!values.id}/>
      </PSFormHolder>
    </React.Fragment>
  );
});