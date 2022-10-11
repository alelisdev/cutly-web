import React, { useRef } from "react";
import { useIntl } from "react-intl";
import { FormikProps } from "formik";
import { Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { List, AutoSizer, WindowScroller,  } from "react-virtualized";
import { IEmployee } from "../Types";
import { IRootState } from "../../../PSolutions.State";
import { EmployeeBanner } from "../Components/EmployeeBanner";
import EmployeeServiceItem from "../Components/EmployeeServiceItem";
import { InputField } from "../../../PSolutions.UI/Fields/InputField";
import { RadioField } from "../../../PSolutions.UI/Fields/RadioField";
import { PrimaryButton } from "../../../PSolutions.UI/Buttons/PrimaryButton";
import PasswordContainer from "../../Password/Container/PasswordContainer";
import { PSFormRow } from "../../../PSolutions.UI/Form/FormLayout/PSFormRow";
import { PSFormCard } from "../../../PSolutions.UI/Form/FormLayout/PSFormCard";
import { getEmployeeAsync, uploadEmployeeAvatarAsync } from "../Redux/Actions";
import { PSFormHolder } from "../../../PSolutions.UI/Form/FormLayout/PSFormHolder";
import { PSFormFooter } from "../../../PSolutions.UI/Form/FormLayout/PSFormFooter";
import { PSCardSideBar } from "../../../PSolutions.UI/Form/FormLayout/PSCardSideBar";

interface Props extends FormikProps<IEmployee> {
}

interface ListRowProps {
  style: any;
  key: string;
  index: number;
  isScrolling: boolean;
}

export const EmployeeUpsertView = React.memo(({submitForm, isSubmitting, isValid, values}: Props) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleBackClick = () => navigate(-1);
  const scrollRef = useRef<HTMLDivElement>(null);

  const services = useSelector((state: IRootState) => state.services.data);
  const selectedServices = useSelector((state: IRootState) => state.employee?.selectedItem?.services || []);

  async function uploadAvatarAsync(base64: string) {
    await dispatch(uploadEmployeeAvatarAsync(values.id, base64));
    if (!!values.id) await dispatch(getEmployeeAsync(values.id));
  }

  const submitDisabled = isSubmitting || !isValid;
  const save = intl.formatMessage({id: "generic.messages.save"});
  const backTitle = intl.formatMessage({id: "generic.messages.back"});
  const emailTitle = intl.formatMessage({id: 'generic.messages.email'});
  const jobTitle = intl.formatMessage({id: 'generic.messages.job.title'});
  const title = intl.formatMessage({id: "generic.messages.profile.settings"});
  const servicesTitle = intl.formatMessage({id: "generic.messages.services"});
  const phoneNumberTitle = intl.formatMessage({id: "generic.messages.phone.number"});
  const lastNameTitle = intl.formatMessage({id: 'generic.messages.last.name.title'});
  const passwordChange = intl.formatMessage({id: 'generic.messages.password.change'});
  const firstNameTitle = intl.formatMessage({id: 'generic.messages.first.name.title'});
  const bookingSettings = intl.formatMessage({id: "generic.messages.booking.settings"});
  const emailPlaceholder = intl.formatMessage({id: 'generic.messages.email.placeholder'});
  const lastNamePlaceholder = intl.formatMessage({id: 'generic.messages.last.name.placeholder'})
  const jobTitlePlaceholder = intl.formatMessage({id: 'generic.messages.job.title.placeholder'});
  const firstNamePlaceholder = intl.formatMessage({id: 'generic.messages.first.name.placeholder'});
  const phoneNumberPlaceholder = intl.formatMessage({id: "generic.messages.phone.number.placeholder"});
  const onlineReservationsEnabled = intl.formatMessage({id: 'generic.messages.online.reservations.enabled'});
  const onlineReservationsDisabled = intl.formatMessage({id: 'generic.messages.online.reservations.disabled'});
  const bookingSettingsDescription = intl.formatMessage({id: "generic.messages.online.reservations.description"});

  const dangerZone = intl.formatMessage({id: 'generic.messages.danger.zone'});
  const dangerZoneDelete = intl.formatMessage({id: "generic.messages.danger.zone.delete"});
  const dangerZoneTransfer = intl.formatMessage({id: "generic.messages.danger.zone.transfer"});
  const dangerZoneDeleteDesc = intl.formatMessage({id: "generic.messages.danger.zone.delete.desc"});
  const dangerZoneDeleteTitle = intl.formatMessage({id: "generic.messages.danger.zone.delete.title"});
  const dangerZoneTransferDesc = intl.formatMessage({id: "generic.messages.danger.zone.transfer.desc"});
  const dangerZoneTransferTitle = intl.formatMessage({id: "generic.messages.danger.zone.transfer.title"});

  const renderRow = ({ index, key, style } : ListRowProps) => {
    return(
      <div key={key} style={style}>
        <EmployeeServiceItem service={services[index]} key={index} index={index} selectedServices={selectedServices}/>
      </div>
    );
  }

  return (
    <React.Fragment>
      <EmployeeBanner employee={values} uploadImageAsync={uploadAvatarAsync}/>
      <PSFormHolder>
        <Col xl={8}>
          <PSFormCard className="mb-3" title={title}>
            <PSFormRow>
              <InputField
                type="text"
                colNum={4}
                id="firstName"
                name="firstName"
                required={true}
                label={firstNameTitle}
                placeholder={firstNamePlaceholder}
              />
              <InputField
                type="text"
                colNum={4}
                id="lastName"
                name="lastName"
                required={true}
                label={lastNameTitle}
                placeholder={lastNamePlaceholder}
              />
              <InputField
                type="text"
                colNum={4}
                id="phoneNumber"
                name="phoneNumber"
                required={true}
                label={phoneNumberTitle}
                placeholder={phoneNumberPlaceholder}
              />
            </PSFormRow>
            <PSFormRow>
              <InputField
                type="text"
                colNum={6}
                id="title"
                name="title"
                required={false}
                label={jobTitle}
                placeholder={jobTitlePlaceholder}
              />
              <InputField
                disabled
                type="email"
                colNum={6}
                id="email"
                name="email"
                required={true}
                label={emailTitle}
                placeholder={emailPlaceholder}
              />
            </PSFormRow>
          </PSFormCard>
          <PSFormCard title={servicesTitle} bodyRef={scrollRef}>
            <WindowScroller scrollElement={scrollRef?.current || window}>
              {({height, registerChild}) => (
                <AutoSizer disableHeight>
                  {({width}) => (
                    <div ref={registerChild}>
                      <List
                        width={width}
                        rowHeight={80}
                        height={height}
                        autoHeight={true}
                        overscanRowCount={3}
                        rowRenderer={renderRow}
                        rowCount={services.length}
                      />
                    </div>
                  )}
                </AutoSizer>
              )}
            </WindowScroller>
            <PSFormFooter>
              <Button variant="falcon-outline" className="me-2" onClick={handleBackClick}>{backTitle}</Button>
              <PrimaryButton title={save} isBusy={isSubmitting} className="w-auto" onClick={submitForm} disabled={submitDisabled}/>
            </PSFormFooter>
          </PSFormCard>
        </Col>
        <PSCardSideBar columns={4}>
          <PSFormCard title={bookingSettings}>
            <h6 className="fw-bold">{bookingSettingsDescription}</h6>
            <div className="ps-2 pt-2 mb-2">
              <RadioField
                defaultValue={true}
                name="canOnlineBook"
                id="online-reservations-option-1"
                label={onlineReservationsEnabled}
              />
              <RadioField
                defaultValue={false}
                name="canOnlineBook"
                id="online-reservations-option-2"
                label={onlineReservationsDisabled}
              />
            </div>
          </PSFormCard>
          <PSFormCard title={passwordChange} className="mt-3">
            <PasswordContainer employeeId={values.id}/>
          </PSFormCard>
          <PSFormCard className="mt-3" title={dangerZone}>
            <div className="mb-0 mt-0">
              <h5 className="mb-0">{dangerZoneTransferTitle}</h5>
              <p className="fs--1">{dangerZoneTransferDesc}</p>
              <Button className="w-100 btn btn-falcon-warning">{dangerZoneTransfer}</Button>
            </div>
            <div className="mb-0 mt-0">
              <div className="border-dashed-bottom my-4"/>
              <h5 className="mb-0">{dangerZoneDeleteTitle}</h5>
              <p className="fs--1">{dangerZoneDeleteDesc}</p>
              <Button className="w-100 btn btn-falcon-danger">{dangerZoneDelete}</Button>
            </div>
          </PSFormCard>
        </PSCardSideBar>
      </PSFormHolder>
    </React.Fragment>
  );
});