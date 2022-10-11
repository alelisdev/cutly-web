import React from "react";
import { useIntl } from "react-intl";
import { FormikProps } from "formik";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ILocationRequest } from "../Types";
import { InputField } from "../../../PSolutions.UI/Fields/InputField";
import { PrimaryButton } from "../../../PSolutions.UI/Buttons/PrimaryButton";
import { PSFormRow } from "../../../PSolutions.UI/Form/FormLayout/PSFormRow";
import { PSFormCard } from "../../../PSolutions.UI/Form/FormLayout/PSFormCard";
import { PSFormHolder } from "../../../PSolutions.UI/Form/FormLayout/PSFormHolder";
import { PSFormFooter } from "../../../PSolutions.UI/Form/FormLayout/PSFormFooter";

interface Props extends FormikProps<ILocationRequest> {
}

export const LocationUpsertView = React.memo(({submitForm, isSubmitting, isValid}: Props) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const handleBackClick = () => navigate(-1)

  const submitDisabled = isSubmitting || !isValid;
  const cityTitle = intl.formatMessage({id: "generic.messages.city"});
  const backTitle = intl.formatMessage({id: "generic.messages.back"});
  const streetTitle = intl.formatMessage({id: "generic.messages.street"});
  const addTitle = intl.formatMessage({id: "generic.messages.add.location"});
  const countryTitle = intl.formatMessage({id: "generic.messages.country"});
  const zipCodeTitle = intl.formatMessage({id: "generic.messages.zip.code"});
  const locationName = intl.formatMessage({id: "generic.messages.location.name"});
  const streetNumberTitle = intl.formatMessage({id: "generic.messages.street.number"});
  const phoneNumberTitle = intl.formatMessage({id: "generic.messages.phone.number"});
  const newLocationTitle = intl.formatMessage({id: "generic.messages.new.location"});
  const cityTitleHolder = intl.formatMessage({id: "generic.messages.city.placeholder"});
  const streetTitleHolder = intl.formatMessage({id: "generic.messages.street.placeholder"});
  const countryTitleHolder = intl.formatMessage({id: "generic.messages.country.placeholder"});
  const zipCodeTitleHolder = intl.formatMessage({id: "generic.messages.zip.code.placeholder"});
  const streetNumberTitleHolder = intl.formatMessage({id: "generic.messages.street.number.placeholder"});
  const newLocationTitleHolder = intl.formatMessage({id: "generic.messages.location.name.placeholder"});

  return (
    <PSFormHolder>
      <PSFormCard title={newLocationTitle} columns={12} className="col-xxl-8">
        <PSFormRow>
          <InputField type="text" colNum={6} required disabled={isSubmitting} label={locationName} id="name" name="name" placeholder={locationName}/>
          <InputField type="text" colNum={6} id="phoneNumber" required name="phoneNumber" disabled={isSubmitting} label={phoneNumberTitle} placeholder={newLocationTitleHolder}/>
        </PSFormRow>
        <PSFormRow>
          <InputField type="text" colNum={6} required disabled={isSubmitting} label={countryTitle} id="country" name="country" placeholder={countryTitleHolder}/>
          <InputField type="text" colNum={6} required disabled={isSubmitting} label={cityTitle} id="city" name="city" placeholder={cityTitleHolder}/>
          <InputField type="text" colNum={6} required disabled={isSubmitting} label={streetTitle} id="street" name="street" placeholder={streetTitleHolder}/>
          <InputField type="text" colNum={3} required disabled={isSubmitting} label={streetNumberTitle} id="streetNumber" name="streetNumber" placeholder={streetNumberTitleHolder}/>
          <InputField type="text" colNum={3} required disabled={isSubmitting} label={zipCodeTitle} id="zipCode" name="zipCode" placeholder={zipCodeTitleHolder}/>
        </PSFormRow>
        <PSFormFooter>
          <Button variant="falcon-outline" className="me-2" onClick={handleBackClick}>{backTitle}</Button>
          <PrimaryButton title={addTitle} isBusy={isSubmitting} className="w-auto" onClick={submitForm} disabled={submitDisabled}/>
        </PSFormFooter>
      </PSFormCard>
    </PSFormHolder>
  );
});