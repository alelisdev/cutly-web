import { useIntl } from "react-intl";
import { ISelectOption } from "../../../PSolutions.Contracts/Common";

/**
 *
 */
export function getOptionsForIntervalSplit(): Array<ISelectOption> {
  return [
    {
      value: 15,
      label: "15 min"
    },
    {
      value: 20,
      label: "20 min"
    },
    {
      value: 30,
      label: "30 min"
    },
    {
      value: 40,
      label: "40 min"
    },
    {
      value: 45,
      label: "45 min"
    },
    {
      value: 60,
      label: "60 min"
    },
  ]
}


export function useFutureBookingOptions(): Array<ISelectOption> {
  const intl = useIntl();

  return [
    {
      value: 1,
      label: intl.formatMessage({id: "generic.messages.month.in.future"}, {month: 1})
    },
    {
      value: 2,
      label: intl.formatMessage({id: "generic.messages.months.in.future"}, {month: 2})
    },
    {
      value: 3,
      label: intl.formatMessage({id: "generic.messages.months.in.future"}, {month: 3})
    },
    {
      value: 4,
      label: intl.formatMessage({id: "generic.messages.months.in.future"}, {month: 4})
    },
    {
      value: 5,
      label: intl.formatMessage({id: "generic.messages.months.in.future"}, {month: 5})
    },
    {
      value: 6,
      label: intl.formatMessage({id: "generic.messages.months.in.future"}, {month: 6})
    },
    {
      value: 7,
      label: intl.formatMessage({id: "generic.messages.months.in.future"}, {month: 7})
    },
    {
      value: 8,
      label: intl.formatMessage({id: "generic.messages.months.in.future"}, {month: 8})
    },
    {
      value: 9,
      label: intl.formatMessage({id: "generic.messages.months.in.future"}, {month: 9})
    },
    {
      value: 10,
      label: intl.formatMessage({id: "generic.messages.months.in.future"}, {month: 10})
    },
    {
      value: 11,
      label: intl.formatMessage({id: "generic.messages.months.in.future"}, {month: 11})
    },
    {
      value: 12,
      label: intl.formatMessage({id: "generic.messages.months.in.future"}, {month: 12})
    },
  ]
}


export function useReschedulingOptions(): Array<ISelectOption> {
  const intl = useIntl();

  return ([
      {
        value: 0,
        label: intl.formatMessage({id: "noTimeRestriction"}),
      },
      {
        value: 15,
        label: intl.formatMessage({id: "noLessThan15minInAdvance"}),
      },
      {
        value: 30,
        label: intl.formatMessage({id: "noLessThan30minInAdvance"}),
      },
      {
        value: 60,
        label: intl.formatMessage({id: "noLessThan1hourInAdvance"}),
      },
      {
        value: 120,
        label: intl.formatMessage({id: "noLessThan2hourInAdvance"}),
      },
      {
        value: 180,
        label: intl.formatMessage({id: "noLessThan3hourInAdvance"}),
      },
      {
        value: 60 * 4,
        label: intl.formatMessage({id: "noLessThan4hourInAdvance"}),
      },
      {
        value: 60 * 5,
        label: intl.formatMessage({id: "noLessThan5hourInAdvance"}),
      },
      {
        value: 60 * 6,
        label: intl.formatMessage({id: "noLessThan6hourInAdvance"}),
      },
      {
        value: 60 * 12,
        label: intl.formatMessage({id: "noLessThan12hourInAdvance"}),
      },
      {
        value: 60 * 24,
        label: intl.formatMessage({id: "noLessThan1DayInAdvance"}),
      },
      {
        value: 60 * 24 * 2,
        label: intl.formatMessage({id: "noLessThan2DayInAdvance"}),
      },
      {
        value: 60 * 24 * 3,
        label: intl.formatMessage({id: "noLessThan3DayInAdvance"})
      },
      {
        value: 60 * 24 * 4,
        label: intl.formatMessage({id: "noLessThan4DayInAdvance"}),
      },
      {
        value: 60 * 24 * 5,
        label: intl.formatMessage({id: "noLessThan5DayInAdvance"}),
      },
      {
        value: 60 * 24 * 6,
        label: intl.formatMessage({id: "noLessThan6DayInAdvance"}),
      },
      {
        value: 60 * 24 * 7,
        label: intl.formatMessage({id: "noLessThan7DayInAdvance"}),
      },
    ]
  );
}


export function useReminderOptions(): Array<ISelectOption> {
  const intl = useIntl();

  return [
    {
      value: 30,
      label: intl.formatMessage({id: "generic.messages.reminder.time"}, {minutes: 30})
    },
    {
      value: 60,
      label: intl.formatMessage({id: "generic.messages.reminder.time"}, {minutes: 60})
    },
    {
      value: 90,
      label: intl.formatMessage({id: "generic.messages.reminder.time"}, {minutes: 90})
    },
    {
      value: 120,
      label: intl.formatMessage({id: "generic.messages.reminder.time"}, {minutes: 120})
    },
    {
      value: 150,
      label: intl.formatMessage({id: "generic.messages.reminder.time"}, {minutes: 150})
    },
    {
      value: 180,
      label: intl.formatMessage({id: "generic.messages.reminder.time"}, {minutes: 180})
    }
  ]
}


export function useReminderScheduleOptions(): Array<ISelectOption> {
  const intl = useIntl();

  return [
    {
      value: "",
      label: intl.formatMessage({id: "generic.messages.no.reminder.one.day.before"}),
    },
    {
      value: "15:00:00",
      label: "15:00"
    },
    {
      value: "16:00:00",
      label: "16:00"
    },
    {
      value: "17:00:00",
      label: "17:00"
    },
    {
      value: "18:00:00",
      label: "15:00"
    },
    {
      value: "18:00:00",
      label: "18:00"
    },
    {
      value: "19:00:00",
      label: "19:00"
    },
    {
      value: "20:00:00",
      label: "20:00"
    },
  ]
}

