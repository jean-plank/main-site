import { ReactNode } from 'react'

import { Maybe, NonEmptyArray } from 'main-site-shared/lib/fp'
import { FormTranslation } from 'main-site-shared/lib/models/form/FormTranslation'
import { FormTranslationKeyAnswer } from 'main-site-shared/lib/models/form/FormTranslationKey'

type TranslToString = (transl: FormTranslation) => string
type TranslToNode = (transl: FormTranslation) => ReactNode

export interface Question {
  _tag: 'Question'
  value: TranslToString
  answers: NonEmptyArray<Answer>
}

export const Question = (
  value: TranslToString,
  answer: Answer,
  ...answers: Answer[]
): Question => ({
  _tag: 'Question',
  value,
  answers: [answer, ...answers]
})

export interface Answer {
  label: TranslToString
  value: FormTranslationKeyAnswer
  leadsTo: Maybe<AnswerNext>
}

export const Answer = (value: FormTranslationKeyAnswer, leadsTo?: AnswerNext): Answer => ({
  label: _ => _[value],
  value,
  leadsTo: Maybe.fromNullable(leadsTo)
})

export type AnswerNext = Question | EndOutput
export namespace AnswerNext {
  export const isEndOutput = (a: AnswerNext): a is EndOutput => !isQuestion(a)

  export const isQuestion = (a: AnswerNext): a is Question => a._tag === 'Question'
  export const isLink = (a: AnswerNext): a is Link => a._tag === 'Link'
  export const isMessage = (a: AnswerNext): a is Message => a._tag === 'Message'
  export const isMessageLink = (a: AnswerNext): a is MessageLink => a._tag === 'MessageLink'
  export const isFreeMsg = (a: AnswerNext): a is FreeMsg => a._tag === 'FreeMsg'
}

export type EndOutput = Link | DisplayableEndOutput
export namespace EndOutput {
  export const isDisplayable = (e: EndOutput): e is DisplayableEndOutput => e._tag !== 'Link'
}

export interface Link {
  _tag: 'Link'
  value: string
}
export const Link = (value: string): Link => ({ _tag: 'Link', value })

export type DisplayableEndOutput = Message | MessageLink | FreeMsg

export interface Message {
  _tag: 'Message'
  value: TranslToNode
}
export const Message = (value: TranslToNode): Message => ({
  _tag: 'Message',
  value
})

export interface MessageLink {
  _tag: 'MessageLink'
  link: string
  label: TranslToString
}
export const MessageLink = (link: string, label: TranslToString): MessageLink => ({
  _tag: 'MessageLink',
  link,
  label
})

export interface FreeMsg {
  _tag: 'FreeMsg'
  message: Maybe<TranslToNode>
}
export const FreeMsg = (message?: TranslToNode): FreeMsg => ({
  _tag: 'FreeMsg',
  message: Maybe.fromNullable(message)
})
