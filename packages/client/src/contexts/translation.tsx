import { eqString } from 'fp-ts/lib/Eq'
import React, { ReactNode } from 'react'

import { Maybe, List } from 'main-site-shared/lib/fp'
import { FormTranslation } from 'main-site-shared/lib/models/form/FormTranslation'

import tutorialFrJpg from '../../img/tutorial_fr.jpg'
import tutorialEnJpg from '../../img/tutorial_en.jpg'

import { PrettyTargetBlank } from '../components/PrettyTargetBlank'

export const LANG_KEY = 'lang'

export type Language = 'fr' | 'en'
export const languages: Language[] = ['fr', 'en']
const isLanguage = (lang: string): lang is Language => List.elem(eqString)(lang, languages)

export interface Translation {
  notFound: {
    message: string
  }
  header: {
    preTitle: string
    bonus: string
    contact: ReactNode
  }
  documentTitle: {
    notFound: string
    bonus: string
    contact: string
  }
  home: {
    revengefulTrilogy: ReactNode
  }
  bonus: {
    thestoryLabel: ReactNode
    tutorialImg: string
    videos: string
  }
  contact: {
    send: string
    freeMsgPlaceholder: string
    devsFateIsNowSealed: string
    msgWasSent: string
    increaseTheSentence: string
    submitAnotherAnswer: string
    errors: {
      tooManyRequests: ReactNode
      otherError: string
    }
    form: FormTranslation
  }
  game: {
    advisory: string
    advisoryAlready: string
    notOutYet: string
    launch: ReactNode
    dl: string
  }
  games: Record<GameId, GameTranslation>
}

export type GameId = 'thestory' | 'jp1' | 'jp2' | 'jp2b' | 'jp3'

interface GameTranslation {
  title: string
  summary: ReactNode
  links: {
    launch: Maybe<string>
    dl: Maybe<string>
  }
}

export const translations: Record<Language, Translation> = {
  fr: {
    notFound: {
      message: `Gibier de potence, cette page n'existe pas...`
    },

    header: {
      preTitle: 'La véritable histoire de',
      bonus: 'Bonus',
      contact: (
        <>
          <s>Faire un procès</s>
          {' '}Contact
        </>
      )
    },

    documentTitle: {
      notFound: 'Page non trouvée',
      bonus: 'Bonus',
      contact: 'Procès'
    },

    home: {
      revengefulTrilogy: (
        <>
          <q>“Une tragédie vengeresse en trois actes.”</q>
          <PrettyTargetBlank href='https://twitter.com/MohamedZdong'>
            Maitre ZDONG
          </PrettyTargetBlank>
        </>
      )
    },

    bonus: {
      thestoryLabel: (
        <>
          <h4>Le saviez-vous ?</h4>
          Jean Plank The Story a été conçu en un seul après-midi dans la salle de pause du
          Castorama, merci de ne pas le dénigrer car il est différent des autres petits garçons.
          <br />
          Mais bon, c'est quand même de la merde hein, faut pas se mentir.
        </>
      ),
      tutorialImg: tutorialFrJpg,
      videos: "Diverses vidéos diverses de l'équipe de dev"
    },

    contact: {
      send: 'Ma sentence est irrévocable',
      freeMsgPlaceholder: 'Oui.',
      devsFateIsNowSealed: 'Les développeurs ont bien été condamnés.',
      msgWasSent: 'Le message a bien été envoyé.',
      increaseTheSentence: 'Alourdir la peine',
      submitAnotherAnswer: 'Soumettre une autre réponse',
      errors: {
        tooManyRequests: (
          <>
            J'ai évidemment mis une limite sur le nombre de requêtes que l'on peut faire.
            <br />
            Réessaie dans un petit moment, gros malin...
          </>
        ),
        otherError: "Oupsi, petite erreur lors de l'envoi"
      },
      form: FormTranslation.fr
    },

    game: {
      advisory: '(déconseillé aux moins de 18 ans)',
      advisoryAlready: '(déjà déconseillé aux moins de 18 ans)',
      notOutYet: 'pas encore sorti',
      launch: (
        <>
          Jouer sur navigateur
          <i>(potentiellement instable)</i>
        </>
      ),
      dl: 'Télécharger le jeu'
    },

    games: {
      thestory: {
        title: 'The Story',
        summary: 'Jean Plank fait une escale pour se ravitailler.',
        links: {
          launch: Maybe.some('fr/thestory'),
          dl: Maybe.some('https://dl.blbl.ch/jean-plank/fr/Jean Plank - The Story.zip')
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
          launch: Maybe.some('fr/naissancedesflammesdelavengeance'),
          dl: Maybe.some(
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
          launch: Maybe.some('fr/lesflammesdelavengeance'),
          dl: Maybe.some(
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
          </>
        ),
        links: {
          launch: Maybe.some('fr/valhallauakbar'),
          dl: Maybe.some('https://dl.blbl.ch/jean-plank/fr/Jean Plank II - Valhalla U Akbar.zip')
        }
      },

      jp3: {
        title: "La Vengeance Est un Plat Qui se Mange À l'Eau de la Mer",
        summary: '',
        links: {
          launch: Maybe.none,
          dl: Maybe.none
        }
      }
    }
  },

  en: {
    notFound: {
      message: `Scum, this page doesn't exist...`
    },

    header: {
      preTitle: 'The true story of',
      bonus: 'Bonus',
      contact: (
        <>
          <s>Sue the devs</s>
          {' '}Contact
        </>
      )
    },

    documentTitle: {
      notFound: 'Page not found',
      bonus: 'Bonus',
      contact: 'Trial'
    },

    home: {
      revengefulTrilogy: (
        <>
          <q>“A revengeful tragedy in three acts.”</q>
          <PrettyTargetBlank href='https://twitter.com/MohamedZdong'>
            Master ZDONG
          </PrettyTargetBlank>
        </>
      )
    },

    bonus: {
      thestoryLabel: (
        <>
          <h4>Did you know it?</h4>
          Jean Plank The Story was conceived in one afternoon in the HomeBase's break room. Thank
          you for not denigrating him because he is different from the other little boys.
          <br />
          But hey, it's still crap, right. Don't lie to yourself.
        </>
      ),
      tutorialImg: tutorialEnJpg,
      videos: 'Random miscellaneous videos from the devs'
    },

    contact: {
      send: 'Submit',
      freeMsgPlaceholder: 'Yes.',
      devsFateIsNowSealed: "The devs' fate is now sealed.",
      msgWasSent: 'The message has been sent.',
      increaseTheSentence: 'Increase the sentence',
      submitAnotherAnswer: 'Submit another answer',
      errors: {
        tooManyRequests: (
          <>
            I've obviously put a limit on the number of requests that can be made
            <br />
            Try again in a little while, smart-ass...
          </>
        ),
        otherError: 'Oopsi, something went wrong'
      },
      form: FormTranslation.en
    },

    game: {
      advisory: '(not recommended under 18)',
      advisoryAlready: '(already not recommended under 18)',
      notOutYet: 'not out yet',
      launch: (
        <>
          Play in your browser
          <i>(may not work properly)</i>
        </>
      ),
      dl: 'Download the game'
    },

    games: {
      thestory: {
        title: 'The Story',
        summary: 'Jean Plank makes a stop to refuel.',
        links: {
          launch: Maybe.some('en/thestory'),
          dl: Maybe.some('https://dl.blbl.ch/jean-plank/en/Jean Plank - The Story.zip')
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
          launch: Maybe.some('en/birthoftheflamesofrevenge'),
          dl: Maybe.some(
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
          launch: Maybe.some('en/theflamesofrevenge'),
          dl: Maybe.some(
            'https://dl.blbl.ch/jean-plank/en/Jean Plank II - The Flames of Revenge.zip'
          )
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
          </>
        ),
        links: {
          launch: Maybe.none,
          dl: Maybe.none
        }
      },

      jp3: {
        title: 'Revenge Is a Dish Better Served With the Water of the Sea',
        summary: '',
        links: {
          launch: Maybe.none,
          dl: Maybe.none
        }
      }
    }
  }
}

const pref = localStorage.getItem(LANG_KEY)
const lang = pref === null ? navigator.language.split('-')[0] : pref
export const defaultLanguage: Language = isLanguage(lang) ? lang : 'en'
