import React from "react";
import { useIntl } from "react-intl";
import { FormikProps } from "formik";
import { Button} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { IBookingSettings } from "../Types";
import { CheckField } from "../../../PSolutions.UI/Fields/CheckField";
import { SwitchField } from "../../../PSolutions.UI/Fields/SwitchField";
import { SelectField } from "../../../PSolutions.UI/Fields/SelectField";
import { PrimaryButton } from "../../../PSolutions.UI/Buttons/PrimaryButton";
import { PSFormRow } from "../../../PSolutions.UI/Form/FormLayout/PSFormRow";
import { PSFormCard } from "../../../PSolutions.UI/Form/FormLayout/PSFormCard";
import { PSFormHolder } from "../../../PSolutions.UI/Form/FormLayout/PSFormHolder";
import { PSFormFooter } from "../../../PSolutions.UI/Form/FormLayout/PSFormFooter";
import { PSCardSideBar } from "../../../PSolutions.UI/Form/FormLayout/PSCardSideBar";
import { PSFormDivider } from "../../../PSolutions.UI/Form/FormLayout/PSFormDivider";
import { getOptionsForIntervalSplit, useFutureBookingOptions, useReminderOptions, useReminderScheduleOptions, useReschedulingOptions } from "../Options";

interface Props extends FormikProps<IBookingSettings> {
}

export const BookingSettingsView = React.memo(({submitForm, isSubmitting, isValid}: Props) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const reminderOptions = useReminderOptions();
  const reschedulingOptions = useReschedulingOptions();
  const futureBookingOptions = useFutureBookingOptions();
  const reminderScheduleOptions = useReminderScheduleOptions();

  const handleBackClick = () => navigate(-1);

  const submitDisabled = isSubmitting || !isValid;
  const backTitle = intl.formatMessage({id: "generic.messages.back"});
  const update = intl.formatMessage({id: "generic.messages.update.settings"});
  const basicTitle = intl.formatMessage({id: "generic.messages.basic.settings"});
  const reminderTimeTitle = intl.formatMessage({id: "generic.messages.set.reminder"});
  const availableTimeTitle = intl.formatMessage({id: "generic.messages.available.time"});
  const bookingSettingsTitle = intl.formatMessage({id: "generic.messages.booking.settings"});
  const bookingInAdvanceTitle = intl.formatMessage({id: "generic.messages.booking.in.advance"});
  const minTimeTitle = intl.formatMessage({id: "generic.messages.minimal.time.before.reservation"});
  const reschedulingTitle = intl.formatMessage({id: "generic.messages.rescheduling.or.canceling"});
  const oneDayBeforeReminderTitle = intl.formatMessage({id: "generic.messages.one.day.before.reminder"})
  const availableTimePlaceholder = intl.formatMessage({id: "generic.messages.available.time.placeholder"});
  const reservationsOnlyWithCalls = intl.formatMessage({id: "generic.messages.reservations.only.with.calls"})
  const reservationsOnlyMyClients = intl.formatMessage({id: "generic.messages.reservations.only.my.clients"})
  const hideFirstAvailableOptions = intl.formatMessage({id: "generic.messages.hide.first.available.option"})
  const appointmentsAreAutoConfirmed = intl.formatMessage({id: "generic.messages.appointments.auto.confirmed"})
  const disableForThreeNowShows = intl.formatMessage({id: "generic.messages.reservations.disable.bookings.for.three.no.shows"})

  return (
    <PSFormHolder>
      <PSCardSideBar columns={4} className="col-xxl-4">
        <PSFormCard title={basicTitle} className="mb-3">
          <CheckField id="only-calls" name="onlyCalls" label={reservationsOnlyWithCalls}/>
          <CheckField id="only-my-clients" name="onlyMyClients" label={reservationsOnlyMyClients}/>
          <PSFormDivider/>
          <SwitchField id="hide-first-available" name="hideFirstAvailableOption" label={hideFirstAvailableOptions}/>
          <SwitchField id="disable-for-3-no-show" name="disableBookingsForClientsWith3NoShow" label={disableForThreeNowShows}/>
          <SwitchField id="auto-confirm" name="autoConfirm" label={appointmentsAreAutoConfirmed}/>
        </PSFormCard>
      </PSCardSideBar>
      <PSFormCard title={bookingSettingsTitle} columns={8} className="col-xxl-6">
        <PSFormRow>
          <SelectField
            required
            colNum={4}
            label={reschedulingTitle}
            id="reschedulingInMinutes"
            name="reschedulingInMinutes"
            options={reschedulingOptions}
          />
          <SelectField
            required
            colNum={4}
            label={minTimeTitle}
            id="bookingInAdvancedInMinutes"
            name="bookingInAdvancedInMinutes"
            options={reschedulingOptions}
          />
          <SelectField
            required
            colNum={4}
            label={bookingInAdvanceTitle}
            id="bookingForFutureInMonths"
            name="bookingForFutureInMonths"
            options={futureBookingOptions}
          />
        </PSFormRow>
        <PSFormRow>
          <SelectField
            required
            colNum={8}
            options={reminderOptions}
            label={reminderTimeTitle}
            id="defaultReminderTimeInMinutes"
            name="defaultReminderTimeInMinutes"
          />
          <SelectField
            required
            colNum={4}
            id="split-time-interval"
            name="splitTimeInterval"
            label={availableTimeTitle}
            options={getOptionsForIntervalSplit()}
            placeholder={availableTimePlaceholder}
          />
        </PSFormRow>
        <PSFormRow>
          <SelectField
            required
            colNum={4}
            id="oneDayBeforeReminderHours"
            name="oneDayBeforeReminderHours"
            label={oneDayBeforeReminderTitle}
            options={reminderScheduleOptions}
          />
        </PSFormRow>
        <PSFormFooter>
          <Button variant="falcon-outline" className="me-2" onClick={handleBackClick}>{backTitle}</Button>
          <PrimaryButton title={update} isBusy={isSubmitting} className="w-auto" onClick={submitForm} disabled={submitDisabled}/>
        </PSFormFooter>
      </PSFormCard>
    </PSFormHolder>
  );
});