import * as O from 'fp-ts/lib/Option'
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { Option } from 'fp-ts/lib/Option'
import { ReactNode } from 'react'
import { FormTranslation } from '../contexts/translation'

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
  value: string
  leadsTo: Option<AnswerNext>
}

export const Answer = (label: TranslToString, leadsTo?: AnswerNext): Answer => {
  const value = Math.random().toString(36).substring(2)
  return { label, value, leadsTo: O.fromNullable(leadsTo) }
}

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
  message: Option<TranslToNode>
}
export const FreeMsg = (message?: TranslToNode): FreeMsg => ({
  _tag: 'FreeMsg',
  message: O.fromNullable(message)
})
