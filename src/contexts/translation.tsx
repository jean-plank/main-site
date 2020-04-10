import * as A from 'fp-ts/lib/Array'
import { eqString } from 'fp-ts/lib/Eq'
import * as O from 'fp-ts/lib/Option'
import React, { ReactNode } from 'react'

import tutorialFrJpg from '../../img/tutorial_fr.jpg'
import tutorialEnJpg from '../../img/tutorial_en.jpg'

import { ExternalLink } from '../utils/svg'

export const LANG_KEY = 'lang'

export type Language = 'fr' | 'en'
export const languages: Language[] = ['fr', 'en']
const isLanguage = (lang: string): lang is Language => A.elem(eqString)(lang, languages)

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
    send: string
  }
  advisory: string
  advisoryAlready: string
  notOutYet: string
  launch: ReactNode
  dl: string
  revengefulTrilogy: ReactNode
  thestoryLabel: ReactNode
  tutorialImg: string
  videos: string
} & Record<GameId, GameTranslation>

export type GameId = 'thestory' | 'jp1' | 'jp2' | 'jp2b' | 'jp3'

interface GameTranslation {
  title: string
  summary: ReactNode
  links: {
    launch: O.Option<string>
    dl: O.Option<string>
  }
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
      ),
      send: 'Envoyer'
    },
    advisory: '(déconseillé aux moins de 18 ans)',
    advisoryAlready: '(déjà déconseillé aux moins de 18 ans)',
    notOutYet: 'pas encore sorti',
    launch: (
      <>
        Jouer sur navigateur
        <i>(potentiellement instable)</i>
      </>
    ),
    dl: 'Télécharger le jeu',
    thestory: {
      title: 'The Story',
      summary: 'Jean Plank fait une escale pour se ravitailler.',
      links: {
        launch: O.some('fr/thestory'),
        dl: O.some('https://dl.blbl.ch/jean-plank/fr/Jean Plank - The Story.zip')
      }
    },
    jp1: {
      title: 'Naissance des Flammes de la Vengeance',
      summary: (
        <>
          Les aventures de Jean Plank et de son Luchien.
          <br />
          Jean Plank retrouve de vieilles connaissances : Urgo et Saint Gède.
        </>
      ),
      links: {
        launch: O.some('fr/naissancedesflammesdelavengeance'),
        dl: O.some(
          'https://dl.blbl.ch/jean-plank/fr/Jean Plank I - Naissance des Flammes de la Vengeance.zip'
        )
      }
    },
    jp2: {
      title: 'Les Flammes de la Vengeance',
      summary: (
        <>
          <i>Suite de la première fin de Jean Plank I</i>
          <br />
          <br />
          Jean Plank, déformé par Saint Gède, part en quête de son visage.
        </>
      ),
      links: {
        launch: O.some('fr/lesflammesdelavengeance'),
        dl: O.some(
          'https://dl.blbl.ch/jean-plank/fr/Jean Plank II - Les Flammes de la Vengeance.zip'
        )
      }
    },
    jp2b: {
      title: 'Valhalla U Akbar',
      summary: (
        <>
          <i>Suite de la deuxième fin de Jean Plank I</i>
          <br />
          <br />
          Jean Plank, trahi par son mentor et désormais décédé, cherche la vengeance du haut du
          Valhalla.
          {/* <br />
            Mais comment retourner dans le Royaume des Mortels lorsqu'on
            est mort ? */}
        </>
      ),
      links: {
        launch: O.some('fr/valhallauakbar'),
        dl: O.some('https://dl.blbl.ch/jean-plank/fr/Jean Plank II - Valhalla U Akbar.zip')
      }
    },
    jp3: {
      title: "La Vengeance Est un Plat Qui se Mange À l'Eau de la Mer",
      summary: '',
      links: {
        launch: O.none,
        dl: O.none
      }
    },
    revengefulTrilogy: (
      <>
        <q>"Une tragédie vengeresse en trois actes."</q>
        <a href='https://twitter.com/MohamedZdong' target='_blank'>
          Maitre ZDONG
          <ExternalLink />
        </a>
      </>
    ),
    thestoryLabel: (
      <>
        <h4>Le saviez-vous ?</h4>
        Jean Plank The Story a été conçu en un seul après-midi dans la salle de pause du Castorama,
        merci de ne pas le dénigrer car il est différent des autres petits garçons.
        <br />
        Mais bon, c'est quand même de la merde hein, faut pas se mentir.
      </>
    ),
    tutorialImg: tutorialFrJpg,
    videos: "Vidéos aléatoires de l'équipe de dev"
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
      ),
      send: 'Submit'
    },
    advisory: '(not recommended under 18)',
    advisoryAlready: '(already not recommended under 18)',
    notOutYet: 'not out yet',
    launch: (
      <>
        Play in your browser
        <i>(may not work properly)</i>
      </>
    ),
    dl: 'Download the game',
    thestory: {
      title: 'The Story',
      summary: 'Jean Plank makes a stop to refuel.',
      links: {
        launch: O.some('en/thestory'),
        dl: O.some('https://dl.blbl.ch/jean-plank/en/Jean Plank - The Story.zip')
      }
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
      links: {
        launch: O.some('en/birthoftheflamesofrevenge'),
        dl: O.some(
          'https://dl.blbl.ch/jean-plank/en/Jean Plank I - Birth of the Flames of Revenge.zip'
        )
      }
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
      links: {
        launch: O.some('en/theflamesofrevenge'),
        dl: O.some('https://dl.blbl.ch/jean-plank/en/Jean Plank II - The Flames of Revenge.zip')
      }
    },
    jp2b: {
      title: 'Valhalla Ouakbar',
      summary: (
        <>
          <i>Sequel to the second ending of Jean Plank I</i>
          <br />
          <br />
          Jean Plank, betrayed by his mentor and now deceased, is seeking revenge from the top of
          the Valhalla.
          {/* <br />
            But how do you return to the Kingdom of Mortals when you're
            dead? */}
        </>
      ),
      links: {
        launch: O.none,
        dl: O.none
      }
    },
    jp3: {
      title: 'Revenge Is a Dish Better Served With the Water of the Sea',
      summary: '',
      links: {
        launch: O.none,
        dl: O.none
      }
    },
    revengefulTrilogy: (
      <>
        <q>"A revengeful tragedy in three acts."</q>
        <a href='https://twitter.com/MohamedZdong' target='_blank'>
          Master ZDONG
          <ExternalLink />
        </a>
      </>
    ),
    thestoryLabel: (
      <>
        <h4>Did you know it?</h4>
        Jean Plank The Story was conceived in one afternoon in the HomeBase's break room. Thank you
        for not denigrating him because he is different from the other little boys.
        <br />
        But hey, it's still crap, right. Don't lie to yourself.
      </>
    ),
    tutorialImg: tutorialEnJpg,
    videos: 'Random videos from the devs'
  }
}

const pref = localStorage.getItem(LANG_KEY)
const lang = pref === null ? navigator.language.split('-')[0] : pref
export const defaultLanguage: Language = isLanguage(lang) ? lang : 'en'
