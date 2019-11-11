import * as A from 'fp-ts/lib/Array'
import { eqString } from 'fp-ts/lib/Eq'
import * as O from 'fp-ts/lib/Option'
import React, { ReactNode } from 'react'

import jpgs from '../../img/*.jpg'

export const LANG_KEY = 'lang'

export type Language = 'fr' | 'en'
export const languages: Language[] = ['fr', 'en']
const isLanguage = (lang: string): lang is Language =>
    A.elem(eqString)(lang, languages)

export type Translation = {
    notFound: {
        title: string
        message: string
    }
    preTitle: string
    bonus: string
    contact: {
        title: string
        label: ReactNode
    }
    advisory: string
    advisoryAlready: string
    notOutYet: string
    launch: string
    dl: string
    thestoryLabel: ReactNode
    tutorialImg: string
} & Record<GameId, GameTranslation>

export type GameId = 'thestory' | 'jp1' | 'jp2' | 'jp2b' | 'jp3'

interface GameTranslation {
    title: string
    summary: ReactNode
    links: O.Option<{
        launch: string
        dl: string
    }>
}

export const translations: Record<Language, Translation> = {
    fr: {
        notFound: {
            title: 'Page non trouvée',
            message: `Gibier de potence, cette page n'existe pas...`
        },
        preTitle: 'La véritable histoire de',
        bonus: 'Bonus',
        contact: {
            title: 'Procès',
            label: (
                <>
                    <s>Faire un procès</s>&nbsp;Contact
                </>
            )
        },
        advisory: '(déconseillé aux moins de 18 ans)',
        advisoryAlready: '(déjà déconseillé aux moins de 18 ans)',
        notOutYet: 'pas encore sorti',
        launch: 'Jouer sur navigateur',
        dl: 'Télécharger le jeu',
        thestory: {
            title: 'The Story',
            summary: 'Jean Plank fait une escale pour se ravitailler.',
            links: O.some({
                launch: 'fr/thestory',
                dl:
                    'https://dl.blbl.ch/jean-plank/fr/Jean Plank - The Story.zip'
            })
        },
        jp1: {
            title: 'Naissance des Flammes de la Vengeance',
            summary: (
                <>
                    Les aventures de Jean Plank et de son Luchien.
                    <br />
                    Jean Plank retrouve de vieilles connaissances : Urgo et
                    Saint Gède.
                </>
            ),
            links: O.some({
                launch: 'fr/naissancedesflammesdelavengeance',
                dl:
                    'https://dl.blbl.ch/jean-plank/fr/Jean Plank I - Naissance des Flammes de la Vengeance.zip'
            })
        },
        jp2: {
            title: 'Les Flammes de la Vengeance',
            summary: (
                <>
                    <i>Suite de la première fin de Jean Plank I</i>
                    <br />
                    <br />
                    Jean Plank, déformé par Saint Gède, part en quête de son
                    visage.
                </>
            ),
            links: O.some({
                launch: 'fr/lesflammesdelavengeance',
                dl:
                    'https://dl.blbl.ch/jean-plank/fr/Jean Plank II - Les Flammes de la Vengeance.zip'
            })
        },
        jp2b: {
            title: 'Valhalla Ouakbar',
            summary: (
                <>
                    <i>Suite de la deuxième fin de Jean Plank I</i>
                    <br />
                    <br />
                    Jean Plank, trahi par son mentor et désormais décédé,
                    cherche la vengeance du haut du Valhalla.
                    {/* <br />
                    Mais comment retourner dans le Royaume des Mortels lorsqu'on
                    est mort ? */}
                </>
            ),
            links: O.none
        },
        jp3: {
            title: 'La Vengeance',
            summary: '',
            links: O.none
        },
        thestoryLabel: (
            <>
                <h4>Le saviez-vous ?</h4>
                Jean Plank The Story a été conçu en un seul après-midi dans la
                salle de pause du Castorama, merci de ne pas le dénigrer car il
                est différent des autres petits garçons.
                <br />
                Mais bon, c'est quand même de la merde hein, faut pas se mentir.
            </>
        ),
        tutorialImg: jpgs.tutorial_fr
    },
    en: {
        notFound: {
            title: 'Page not found',
            message: `Scum, this page doesn't exist...`
        },
        preTitle: 'The true story of',
        bonus: 'Bonus',
        contact: {
            title: 'Trial',
            label: (
                <>
                    <s>Sue the devs</s>&nbsp;Contact
                </>
            )
        },
        advisory: '(not recommended under 18)',
        advisoryAlready: '(already not recommended under 18)',
        notOutYet: 'not out yet',
        launch: 'Play in your browser',
        dl: 'Download the game',
        thestory: {
            title: 'The Story',
            summary: 'Jean Plank makes a stop to refuel.',
            links: O.some({
                launch: 'en/thestory',
                dl:
                    'https://dl.blbl.ch/jean-plank/en/Jean Plank - The Story.zip'
            })
        },
        jp1: {
            title: 'Birth of the Flames of Revenge',
            summary: (
                <>
                    The adventures of Jean Plank and his Lucihound.
                    <br />
                    Jean Plank meets old friends of him: Urgo and Saint Gède.
                </>
            ),
            links: O.some({
                launch: 'en/birthoftheflamesofrevenge',
                dl:
                    'https://dl.blbl.ch/jean-plank/en/Jean Plank I - Birth of the Flames of Revenge.zip'
            })
        },
        jp2: {
            title: 'The Flames of Revenge',
            summary: (
                <>
                    <i>Sequel to the first ending of Jean Plank I</i>
                    <br />
                    <br />
                    Jean Plank, deformed by Saint Gède, seeks his lost face.
                </>
            ),
            links: O.some({
                launch: 'en/theflamesofrevenge',
                dl:
                    'https://dl.blbl.ch/jean-plank/en/Jean Plank II - The Flames of Revenge.zip'
            })
        },
        jp2b: {
            title: 'Valhalla Ouakbar',
            summary: (
                <>
                    <i>Sequel to the second ending of Jean Plank I</i>
                    <br />
                    <br />
                    Jean Plank, betrayed by his mentor and now deceased, is
                    seeking revenge from the top of the Valhalla.
                    {/* <br />
                    But how do you return to the Kingdom of Mortals when you're
                    dead? */}
                </>
            ),
            links: O.none
        },
        jp3: {
            title: 'The Revenge',
            summary: '',
            links: O.none
        },
        thestoryLabel: (
            <>
                <h4>Did you know it?</h4>
                Jean Plank The Story was conceived in one afternoon in the
                HomeBase's break room. Thank you for not denigrating him because
                he is different from the other little boys.
                <br />
                But hey, it's still crap, right. Don't lie to yourself.
            </>
        ),
        tutorialImg: jpgs.tutorial_en
    }
}

const pref = localStorage.getItem(LANG_KEY)
const lang = pref === null ? navigator.language.split('-')[0] : pref
export const defaultLanguage: Language = isLanguage(lang) ? lang : 'en'
