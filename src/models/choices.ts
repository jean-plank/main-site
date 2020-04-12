import * as O from 'fp-ts/lib/Option'
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { Option } from 'fp-ts/lib/Option'
import { ReactNode } from 'react'

export interface Question {
  _tag: 'Question'
  label: string
  answers: NonEmptyArray<Answer>
}

export const Question = (label: string, answer: Answer, ...answers: Answer[]): Question => ({
  _tag: 'Question',
  label,
  answers: [answer, ...answers]
})

export interface Answer {
  label: string
  value: string
  leadsTo: Option<AnswerNext>
}

export const Answer = (label: string, leadsTo?: AnswerNext): Answer => {
  const value = Math.random().toString(36).substring(2)
  return { label, value, leadsTo: O.fromNullable(leadsTo) }
}

export type AnswerNext = Question | EndOutput
export namespace AnswerNext {
  export const isMessage = (a: AnswerNext): a is Message => a._tag === 'Message'
  export const isMessageLink = (a: AnswerNext): a is MessageLink => a._tag === 'MessageLink'
  export const isQuestion = (a: AnswerNext): a is Question => a._tag === 'Question'
  export const isEndOutput = (a: AnswerNext): a is EndOutput => !isQuestion(a)
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
  value: ReactNode
}
export const Message = (value: ReactNode): Message => ({ _tag: 'Message', value })

export interface MessageLink {
  _tag: 'MessageLink'
  link: string
  label: string
}
export const MessageLink = (link: string, label: string): MessageLink => ({
  _tag: 'MessageLink',
  link,
  label
})

export interface FreeMsg {
  _tag: 'FreeMsg'
  message: Option<string>
}
export const FreeMsg = (message?: string): FreeMsg => ({
  _tag: 'FreeMsg',
  message: O.fromNullable(message)
})
