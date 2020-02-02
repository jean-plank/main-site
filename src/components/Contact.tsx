/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import * as A from 'fp-ts/lib/Array'
import * as NA from 'fp-ts/lib/NonEmptyArray'
import * as O from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import { ChangeEvent, FunctionComponent, ReactNode, useState } from 'react'

interface Choice {
    label: string
    options: NA.NonEmptyArray<ChoiceOption>
}

interface ChoiceOption {
    label: string
    value: string
    leadsTo: O.Option<Choice>
}

const choice = (
    label: string,
    options: NA.NonEmptyArray<ChoiceOption>
): Choice => ({
    label,
    options
})

const option = (label: string, leadsTo?: Choice): ChoiceOption => {
    const value = Math.random()
        .toString(36)
        .substring(2)
    return { value, label, leadsTo: O.fromNullable(leadsTo) }
}

export const Contact: FunctionComponent = () => (
    <div css={styles.container}>
        <Select
            choice={choice('Premier choix :', [
                option('option 1'),
                option(
                    'option 2',
                    choice('Deuxième choix :', [
                        option('option 2 - 1'),
                        option(
                            'option 2 - 2',
                            choice('Troisième choix :', [
                                option('option 2 - 2 - 1'),
                                option('option 2 - 2 - 2')
                            ])
                        )
                    ])
                )
            ])}
        />
    </div>
)

const NONE = 'none'

interface Props {
    choice: Choice
}

const Select: FunctionComponent<Props> = ({ choice }) => {
    const [selected, setSelected] = useState<O.Option<ChoiceOption>>(O.none)

    pipe(
        selected,
        O.fold(
            () => console.log(choice.label, 'none'),
            _ => console.log(choice.label, 'some(', _.label, ')')
        )
    )

    const value = pipe(
        selected,
        O.fold(
            () => NONE,
            _ => _.value
        )
    )
    const leadsTo: ReactNode = pipe(
        selected,
        O.chain(_ => _.leadsTo),
        O.fold(
            () => null,
            _ => <Select choice={_} />
        )
    )
    return (
        <label>
            {choice.label}
            <select value={value} onChange={select}>
                <option value={NONE} />
                {choice.options.map(choice => (
                    <option key={choice.value} value={choice.value}>
                        {choice.label}
                    </option>
                ))}
            </select>
            {leadsTo}
        </label>
    )

    function select(e: ChangeEvent<HTMLSelectElement>) {
        setSelected(
            pipe(
                choice.options,
                A.findFirst(_ => _.value === e.target.value)
            )
        )
    }
}

const styles = {
    container: css({
        height: '100%',
        width: '100%',
        paddingTop: '5em',
        color: 'white'
    })
}
