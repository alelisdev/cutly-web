import React from "react";
import { useIntl } from "react-intl";
import { FormikProps } from "formik";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ICategory } from "../Types";
import { InputField } from "../../../PSolutions.UI/Fields/InputField";
import { PSFormRow } from "../../../PSolutions.UI/Form/FormLayout/PSFormRow";
import { PrimaryButton } from "../../../PSolutions.UI/Buttons/PrimaryButton";
import { PSFormCard } from "../../../PSolutions.UI/Form/FormLayout/PSFormCard";
import { TextAreaField } from "../../../PSolutions.UI/Fields/TextAreaField";
import { PSFormHolder } from "../../../PSolutions.UI/Form/FormLayout/PSFormHolder";
import { PSFormFooter } from "../../../PSolutions.UI/Form/FormLayout/PSFormFooter";

interface Props extends FormikProps<ICategory> {
}

export const CategoryUpsertView = React.memo(({submitForm, isSubmitting, isValid}: Props) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const handleBackClick = () => navigate(-1);

  const submitDisabled = isSubmitting || !isValid;
  const save = intl.formatMessage({id: "generic.messages.save"});
  const backTitle = intl.formatMessage({id: "generic.messages.back"});

  const title = intl.formatMessage({id: "generic.messages.service.category"});
  const nameTitle = intl.formatMessage({id: 'generic.messages.service.category.title'});
  const descriptionTitle = intl.formatMessage({id: 'generic.messages.description.title'});
  const namePlaceholder = intl.formatMessage({id: 'generic.messages.service.category.placeholder'})
  const descriptionPlaceholder = intl.formatMessage({id: 'generic.messages.description.placeholder'});

  return (
    <PSFormHolder>
      <PSFormCard title={title} columns={7}>
        <PSFormRow>
          <InputField
            type="text"
            colNum={12}
            id="name"
            name="name"
            required={true}
            label={nameTitle}
            placeholder={namePlaceholder}
          />
          <TextAreaField
            rows={5}
            colNum={12}
            id="description"
            name="description"
            required={false}
            label={descriptionTitle}
            placeholder={descriptionPlaceholder}
          />
        </PSFormRow>
        <PSFormFooter>
          <Button variant="falcon-outline" className="me-2" onClick={handleBackClick}>{backTitle}</Button>
          <PrimaryButton title={save} isBusy={isSubmitting} className="w-auto" onClick={submitForm} disabled={submitDisabled}/>
        </PSFormFooter>
      </PSFormCard>
    </PSFormHolder>
  );
});