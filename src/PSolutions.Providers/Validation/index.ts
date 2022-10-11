import * as PSolutionsValidation from 'yup';

PSolutionsValidation.setLocale({
  mixed: {
    notType: ({path}: any) => ({key: "validation.messages.not.type", values: {path}}),
    default: ({path}: any) => ({key: "validation.messages.invalid", values: {path}}),
    defined: ({path}: any) => ({key: "validation.messages.defined", values: {path}}),
    required: ({path}: any) => ({key: "validation.messages.required.field", values: {path}}),
    oneOf: ({path, values}: any) => ({key: "validation.messages.one.of", values: {path, values}}),
    notOneOf: ({path, values}: any) => ({key: "validation.messages.not.one.of", values: {path, values}}),
  },
  string: {
    trim: ({path}: any) => ({key: "validation.messages.not.trimmed", values: {path}}),
    url: ({path}: any) => ({key: "validation.messages.url.not.valid", values: {path}}),
    uuid: ({path}: any) => ({key: "validation.messages.uuid.not.valid", values: {path}}),
    email: ({path}: any) => ({key: "validation.messages.email.not.valid", values: {path}}),
    lowercase: ({path}: any) => ({key: "validation.messages.not.lowercase", values: {path}}),
    uppercase: ({path}: any) => ({key: "validation.messages.not.uppercase", values: {path}}),
    min: ({min, path}: any) => ({key: "validation.messages.minimal.characters", values: {min, path}}),
    max: ({max, path}: any) => ({key: "validation.messages.maximum.characters", values: {max, path}}),
    length: ({length, path}: any) => ({key: "validation.messages.exact.length", values: {length, path}}),
    matches: ({regex, path}: any) => ({key: "validation.messages.match.regex", values: {regex, path}}),
  },
  number: {
    integer: ({path}: any) => ({key: "validation.messages.not.integer", values: {path}}),
    negative: ({path}: any) => ({key: "validation.messages.not.negative", values: {path}}),
    positive: ({path}: any) => ({key: "validation.messages.not.positive", values: {path}}),
    max: ({max, path}: any) => ({key: "validation.messages.less.or.equal", values: {max, path}}),
    min: ({min, path}: any) => ({key: "validation.messages.greater.or.equal", values: {min, path}}),
    lessThan: ({less, path}: any) => ({key: "validation.messages.less.than", values: {less, path}}),
    moreThan: ({more, path}: any) => ({key: "validation.messages.more.than", values: {more, path}}),
  },
  date: {
    min: ({min, path}: any) => ({key: "validation.messages.later.than", values: {min, path}}),
    max: ({max, path}: any) => ({key: "validation.messages.earlier.than", values: {max, path}}),
  },
  boolean: {
    isValue: ({path, value}: any) => ({key: "validation.messages.not.boolean", values: {value, path}}),
  },
  object: {
    noUnknown: ({path, unknown}: any) => ({key: "validation.messages.not.specified", values: {path, unknown}})
  },
  array: {
    min: ({min, path}: any) => ({key: "validation.messages.sequence.minimum.elements", values: {min, path}}),
    max: ({max, path}: any) => ({key: "validation.messages.sequence.maximum.elements", values: {max, path}}),
    length: ({length, path}: any) => ({key: "validation.messages.sequence.exact.length", values: {length, path}}),
  }
});

export { PSolutionsValidation };