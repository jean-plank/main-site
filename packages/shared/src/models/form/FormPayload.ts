import * as t from 'io-ts'
import { nonEmptyArray } from 'io-ts-types/lib/nonEmptyArray'
import { optionFromNullable } from 'io-ts-types/lib/optionFromNullable'

import { FormTranslationKeyAnswer } from './FormTranslationKey'

export type FormPayload = t.TypeOf<typeof FormPayload.codec>

export namespace FormPayload {
  export const codec = t.strict({
    answers: nonEmptyArray(FormTranslationKeyAnswer.codec),
    freeMsg: optionFromNullable(t.string)
  })
}
