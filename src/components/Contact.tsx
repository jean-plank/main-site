/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import * as A from 'fp-ts/lib/Array'
import * as NA from 'fp-ts/lib/NonEmptyArray'
import * as O from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import {
    ChangeEvent,
    Fragment,
    FunctionComponent,
    ReactNode,
    useState
} from 'react'

interface Choice {
    value: string
    label: string
    others: O.Option<NA.NonEmptyArray<Choice>>
}

const choice = (label: string, others?: NA.NonEmptyArray<Choice>): Choice => {
    const value = Math.random()
        .toString(36)
        .substring(2)
    return { value, label, others: O.fromNullable(others) }
}

export const Contact: FunctionComponent = () => (
    <div css={styles.container}>
        <Select
            choices={[
                choice('choix 1'),
                choice('choix 2', [
                    choice('choix 2 - 1'),
                    choice('choix 2 - 2', [
                        choice('choix 2 - 2 - 1'),
                        choice('choix 2 - 2 - 2')
                    ])
                ])
            ]}
        />
    </div>
)

const NONE = 'none'

interface Props {
    choices: NA.NonEmptyArray<Choice>
}

const Select: FunctionComponent<Props> = ({ choices }) => {
    const [selected, setSelected] = useState<O.Option<Choice>>(O.none)

    pipe(
        selected,
        O.fold(
            () => console.log('none'),
            _ => console.log('some(', _, ')')
        )
    )

    const value = pipe(
        selected,
        O.fold(
            () => NONE,
            _ => _.value
        )
    )
    const others: ReactNode = pipe(
        selected,
        O.chain(_ => _.others),
        O.fold(
            () => null,
            _ => <Select choices={_} />
        )
    )
    return (
        <Fragment>
            <select value={value} onChange={select}>
                <option value={NONE} />
                {choices.map(choice => (
                    <option key={choice.value} value={choice.value}>
                        {choice.label}
                    </option>
                ))}
            </select>
            {others}
        </Fragment>
    )

    function select(e: ChangeEvent<HTMLSelectElement>) {
        setSelected(
            pipe(
                choices,
                A.findFirst(_ => _.value === e.target.value)
            )
        )
    }
}

const styles = {
    container: css({
        height: '100%',
        width: '100%',
        paddingTop: '5em'
    })
}
