import * as t from 'io-ts'
import { DateFromISOString } from 'io-ts-types/lib/DateFromISOString'
import { nonEmptyArray } from 'io-ts-types/lib/nonEmptyArray'
import { optionFromNullable } from 'io-ts-types/lib/optionFromNullable'

import { FormTranslationKeyAnswer } from 'main-site-shared/lib/models/form/FormTranslationKey'

export type ContactForm = t.TypeOf<typeof ContactForm.codec>

export namespace ContactForm {
  export const codec = t.strict({
    date: DateFromISOString,
    ip: t.string,
    answers: nonEmptyArray(FormTranslationKeyAnswer.codec),
    freeMsg: optionFromNullable(t.string)
  })
}
