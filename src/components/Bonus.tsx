/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { FunctionComponent, useContext } from 'react'

import jpgs from '../../img/*.jpg'

import AppContext from '../contexts/AppContext'
import fadeIn from '../utils/css/fadeIn'
import { fontFamily } from '../utils/css/fonts'
import Game from './Game'

const Bonus: FunctionComponent = () => {
    const transl = useContext(AppContext).translation
    return (
        <div css={styles.container}>
            <div css={styles.jp1Container}>
                <Game
                    gameId={'thestory'}
                    jpTitle={'Jean Plank'}
                    image={jpgs.jp1}
                    style={{ container: styles.game }}
                />
                <div css={styles.label}>{transl.thestoryLabel}</div>
            </div>
        </div>
    )
}
export default Bonus

const styles = {
    container: css({
        height: '100%',
        width: '100%',
        background: `url('${jpgs.old_background}')`,
        backgroundSize: 'cover',
        animation: fadeIn('0.75s')
    }),

    jp1Container: css({
        height: '100%',
        width: '100%',
        paddingTop: '2.1em',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        animation: fadeIn('1.5s'),
        position: 'relative'
    }),

    game: css({
        minHeight: 'auto',
        margin: 0
    }),

    label: css({
        background: `url('${jpgs.label}')`,
        backgroundSize: 'cover',
        padding: '0.5em 1em 0.3em',
        border: '5px solid #8e6400',
        boxShadow: '0 0 10px black',
        fontSize: '0.9em',

        '& h4': {
            fontFamily: fontFamily.yarr,
            fontSize: '1.1em',
            marginBottom: '0.33em'
        }
    })
}
