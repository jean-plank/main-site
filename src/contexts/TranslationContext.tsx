import * as A from 'fp-ts/lib/Array'
import { eqString } from 'fp-ts/lib/Eq'
import * as O from 'fp-ts/lib/Option'
import React, { ReactNode } from 'react'

export type Language = 'fr' | 'en'
export const languages: Language[] = ['fr', 'en']
const isLanguage = (lang: string): lang is Language =>
    A.elem(eqString)(lang, languages)

export type Translation = {
    preTitle: string
    advisory: string
    advisoryAlready: string
    notOutYet: string
    launch: string
    dl: string
} & Record<GameId, GameTranslation>

export type GameId = 'jp1' | 'jp2' | 'jp3' | 'jp3b' | 'jp4'

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
        preTitle: 'La véritable histoire de',
        advisory: '(déconseillé aux moins de 18 ans)',
        advisoryAlready: '(déjà déconseillé aux moins de 18 ans)',
        notOutYet: 'pas encore sorti',
        launch: 'Jouer sur navigateur',
        dl: 'Télécharger le jeu',
        jp1: {
            title: 'The Story',
            summary: 'Jean Plank fait une escale pour se ravitailler.',
            links: O.some({
                launch: 'fr/thestory',
                dl:
                    'https://dl.blbl.ch/jean-plank/fr/Jean Plank I - The Story.zip'
            })
        },
        jp2: {
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
                    'https://dl.blbl.ch/jean-plank/fr/Jean Plank II - Naissance des Flammes de la Vengeance.zip'
            })
        },
        jp3: {
            title: 'Le Vrai Visage de la Vengeance',
            summary: (
                <>
                    <i>Suite de la première fin de Jean Plank II</i>
                    <br />
                    <br />
                    Jean Plank, déformé par Saint Gède, part en quête de son
                    visage.
                </>
            ),
            links: O.some({
                launch: 'fr/levraivisagedelavengeance',
                dl:
                    'https://dl.blbl.ch/jean-plank/fr/Jean Plank III - Le Vrai Visage de la Vengeance.zip'
            })
        },
        jp3b: {
            title: 'Valhalla Ouakbar',
            summary: (
                <>
                    <i>Suite de la deuxième fin de Jean Plank II</i>
                </>
            ),
            links: O.none
        },
        jp4: {
            title: 'Tout le Monde doit Payer',
            summary: '',
            links: O.none
        }
    },
    en: {
        preTitle: 'The true story of',
        advisory: '(not recommended under 18)',
        advisoryAlready: '(already not recommended under 18)',
        notOutYet: 'not out yet',
        launch: 'Play in your browser',
        dl: 'Download the game',
        jp1: {
            title: 'The Story',
            summary: 'Jean Plank makes a stop to refuel.',
            links: O.some({
                launch: 'en/thestory',
                dl:
                    'https://dl.blbl.ch/jean-plank/en/Jean Plank I - The Story.zip'
            })
        },
        jp2: {
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
                    'https://dl.blbl.ch/jean-plank/en/Jean Plank II - Birth of the Flames of Revenge.zip'
            })
        },
        jp3: {
            title: 'The True Face of Revenge',
            summary: (
                <>
                    <i>Sequel to the first ending of Jean Plank II</i>
                    <br />
                    <br />
                    Jean Plank, deformed by Saint Gède, seeks his lost face.
                </>
            ),
            links: O.some({
                launch: 'en/thetruefaceofrevenge',
                dl:
                    'https://dl.blbl.ch/jean-plank/en/Jean Plank III - The True Face of Revenge.zip'
            })
        },
        jp3b: {
            title: 'Valhalla Ouakbar',
            summary: (
                <>
                    <i>Sequel to the second ending of Jean Plank II</i>
                </>
            ),
            links: O.none
        },
        jp4: {
            title: 'Everyone Pays',
            summary: '',
            links: O.none
        }
    }
}

const lang = navigator.language.split('-')[0]
export const defaultLanguage: Language = isLanguage(lang) ? lang : 'en'

export default React.createContext<Translation>(translations[defaultLanguage])
