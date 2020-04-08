/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import * as A from 'fp-ts/lib/Array'
import * as NA from 'fp-ts/lib/NonEmptyArray'
import * as O from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import {
    ChangeEvent,
    createRef,
    forwardRef,
    FunctionComponent,
    ReactNode,
    RefObject,
    useImperativeHandle,
    useState
} from 'react'

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

export const Contact: FunctionComponent = () => {
    const optionsGetable: RefObject<OptionsGetable> = createRef()

    return (
        <div css={styles.container}>
            <Select
                ref={optionsGetable}
                i={0}
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

            <button onClick={submitForm}>Envoyer</button>
        </div>
    )

    function submitForm() {
        const res = pipe(
            O.fromNullable(optionsGetable.current),
            O.fold(
                () => [],
                _ => _.getOptions()
            )
        ).map(_ =>
            pipe(
                _,
                O.map(opt => [opt.value, opt.label])
            )
        )
        console.table(res)
    }
}

const NONE = 'none'

interface OptionsGetable {
    getOptions: () => O.Option<ChoiceOption>[]
}

interface Props {
    i: number
    choice: Choice
}

const Select = forwardRef<OptionsGetable, Props>(({ i, choice }, ref) => {
    useImperativeHandle(ref, () => ({ getOptions }))

    const optionsGetable: RefObject<OptionsGetable> = createRef()

    const [selected, setSelected] = useState<O.Option<ChoiceOption>>(O.none)

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
            _ => <Select ref={optionsGetable} i={i + 1} choice={_} />
        )
    )
    return (
        <label>
            {choice.label}
            <select value={value} onChange={onChange}>
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

    function onChange(e: ChangeEvent<HTMLSelectElement>) {
        const newChoice = pipe(
            choice.options,
            A.findFirst(_ => _.value === e.target.value)
        )
        setSelected(newChoice)
    }

    function getOptions(): O.Option<ChoiceOption>[] {
        const tail = pipe(
            O.fromNullable(optionsGetable.current),
            O.map(_ => _.getOptions()),
            O.getOrElse(() => [])
        )
        return [selected, ...tail]
    }
})

const styles = {
    container: css({
        height: '100%',
        width: '100%',
        paddingTop: '5em',
        color: 'white'
    })
}
