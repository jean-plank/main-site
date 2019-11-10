/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Fragment, FunctionComponent, useContext } from 'react'

import jpgs from '../../img/*.jpg'

import AppContext from '../contexts/AppContext'
import fadeIn from '../utils/css/fadeIn'
import { fontFamily } from '../utils/css/fonts'
import * as parallax from '../utils/css/parallax'
import params from '../utils/css/params'
import BonusBg from './BonusBg'
import Game from './Game'

const Bonus: FunctionComponent = () => {
    const transl = useContext(AppContext).translation
    return (
        <Fragment>
            <BonusBg />

            <div css={[parallax.group, styles.group]}>
                <div css={[parallax.layerBack, styles.thestoryContainer]}>
                    <Game
                        gameId={'thestory'}
                        jpTitle={'Jean Plank'}
                        image={jpgs.jp1}
                        style={{ container: styles.thestory }}
                    />
                    <div css={styles.label}>{transl.thestoryLabel}</div>
                </div>

                <div css={[parallax.layerBase, styles.tutorialContainer]}>
                    <img src={transl.tutorialImg} css={styles.tutorial} />
                </div>
            </div>
        </Fragment>
    )
}
export default Bonus

const styles = {
    group: css({
        height: '200vh'
    }),

    thestoryContainer: css({
        height: '100vh',
        width: '100vw',
        paddingTop: '2.1em',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        animation: fadeIn('1.5s'),
        position: 'relative'
    }),

    thestory: css({
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
    }),

    tutorialContainer: css({
        top: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `url('${jpgs.bg_not_found}')`,
        backgroundSize: 'cover',
        boxShadow: '0 0 10px black'
    }),

    tutorial: css({
        maxWidth: '1920px',
        maxHeight: '90%',
        border: `5px solid ${params.game.border.color}`
    })
}
