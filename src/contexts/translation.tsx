import * as A from 'fp-ts/lib/Array'
import { eqString } from 'fp-ts/lib/Eq'
import * as O from 'fp-ts/lib/Option'
import React, { ReactNode } from 'react'

import tutorialFrJpg from '../../img/tutorial_fr.jpg'
import tutorialEnJpg from '../../img/tutorial_en.jpg'

import { PrettyTargetBlank } from '../components/PrettyTargetBlank'

export const LANG_KEY = 'lang'

export type Language = 'fr' | 'en'
export const languages: Language[] = ['fr', 'en']
const isLanguage = (lang: string): lang is Language => A.elem(eqString)(lang, languages)

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

export interface FormTranslation {
  whatDoYouWant: string
  devsAreAssholes: string
  butICant: string
  devsAreAwesome: string
  whatElse: string
  congrats: string
  congratsSonOfABitch: string
  iWannaSuggestScene: string
  whichCharacter: string
  sceneDescription: string
  jpNoNeedToIntroduceMe: string
  luchien: string
  mf: string
  stGede: string
  haddock: string
  haddockTintin: string
  kaarthus: string
  rammus: string
  rammusOk: string
  pikachu: string
  otherWithPrecision: string
  iAmATalentedMusician: string
  giveUsYourContact: string
  iAmShocked: string
  why: string
  itsRacist: string
  forWho: string
  niggers: string
  chineses: string
  itCouldBeWorse: string
  vikings: string
  pirates: string
  aLotOfPeople: string
  itsSexist: string
  itsHomo: string
  itsReligonUnfriendly: string
  itsPedophile: string
  itsTerroristic: string
  itsNotFunny: string
  noneOfThis: string
  technicalProblem: string
  whichOne: string
  onelineVersionDoesntWork: string
  blameYourself: string
  andDownloadTheGame: string
  imLeftHanded: string
  trueIndeed: string
  needMoarOars: string
  mySuggestionIsSoAwesome: string
  ohWell: string
}

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
          <q>"Une tragédie vengeresse en trois actes."</q>
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
      form: {
        whatDoYouWant: 'De quoi voulez-vous nous parler ?',
        devsAreAssholes: 'Les développeurs sont des enculés et je veux envoyer un message de haine',
        butICant: 'Mais je ne peux pas.',
        devsAreAwesome: 'Les développeurs sont formidables et je veux les féliciter',
        whatElse: 'Mais encore ?',
        congrats: 'Bravo.',
        congratsSonOfABitch: 'Bravo, fils de pute.',
        iWannaSuggestScene:
          'Je veux proposer une scène (qui ne finira pas dans le jeu, mais ça me fait plaisir)',
        whichCharacter: 'Avec quel personnage ?',
        sceneDescription: 'Description de la scène :',
        jpNoNeedToIntroduceMe: '"Ha, ha ! Inutile de me présenter !"',
        luchien: 'Luchien',
        mf: 'Miss Fourtune',
        stGede: 'Saint Gède',
        haddock: 'Haddock',
        haddockTintin: '"TINTIN ?!"',
        kaarthus: 'Kaarthus',
        rammus: 'Rammus',
        rammusOk: '"OK."',
        pikachu: 'Pikachu',
        otherWithPrecision: 'Autre (préciser)',
        iAmATalentedMusician:
          "Je suis un musicien compétent et je souhaite intégrer l'équipe de dev'",
        giveUsYourContact: 'Laisse nous un moyen de te contacter 😉',
        iAmShocked: 'Je suis outré par le contenu de ce jeu formidable et je veux le faire savoir',
        why: 'Pourquoi donc ?',
        itsRacist: "C'est raciste",
        forWho: 'Envers qui ?',
        niggers: 'Les noirs',
        chineses: 'Les chinois (ceux de Chine, pas les autres)',
        itCouldBeWorse: 'Ça va, il y a pire...',
        vikings: 'Les vikings',
        pirates: 'Les pirates',
        aLotOfPeople: 'Beaucoup trop de monde',
        itsSexist: "C'est sexiste",
        itsHomo: "C'est homophobe",
        itsReligonUnfriendly: "C'est dégradant envers la religion",
        itsPedophile: "Ça contient de la pédophilie (À PEINE DISSIMULÉE) et je n'aime pas ça",
        itsTerroristic: "Ça fait l'apologie du terrorisme",
        itsNotFunny: "C'est pas drôle, fils de pute",
        noneOfThis: 'Rien de tout cela',
        technicalProblem: "J'ai rencontré un problème technique",
        whichOne: 'Lequel ?',
        onelineVersionDoesntWork:
          "Un truc ne marche pas sur la version en ligne alors qu'on m'a dit qu'elle n'était pas stable et je ne peux m'en prendre qu'à moi-même",
        blameYourself: "Ne t'en prends qu'à toi même.",
        andDownloadTheGame: '(Et télécharge le jeu.)',
        imLeftHanded: 'En fait, je suis gaucher',
        trueIndeed: 'Aucun doute, il disait vrai.',
        needMoarOars: "Je n'ai pas assez de RAM - il me faut plus de rames",
        mySuggestionIsSoAwesome:
          "Ma recommandation est si intéressante qu'elle ne figure pas dans les choix sus-mentionnés",
        ohWell: 'Eh ben...'
      }
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
          <q>"A revengeful tragedy in three acts."</q>
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
      form: {
        whatDoYouWant: 'What do you want to talk to us about?',
        devsAreAssholes: 'Devs are wanklords and I want to send them a message full of hatred',
        butICant: 'But I can not.',
        devsAreAwesome: 'Devs are wonderful and I want to greet them',
        whatElse: 'So?',
        congrats: 'Congratulations.',
        congratsSonOfABitch: 'Congratulations, fuckers.',
        iWannaSuggestScene:
          "I want to submit a scene idea (that won't make it in the game but it is my pleasure)",
        whichCharacter: 'Starring which character?',
        sceneDescription: 'Scene description :',
        jpNoNeedToIntroduceMe: '"Ha, ha ! No need to introduce me !"',
        luchien: 'Luchien',
        mf: 'Miss Fourtune',
        stGede: 'Saint Gède',
        haddock: 'Haddock',
        haddockTintin: '"TINTIN?!"',
        kaarthus: 'Kaarthus',
        rammus: 'Rammus',
        rammusOk: '"OK."',
        pikachu: 'Pikachu',
        otherWithPrecision: 'Other (specify)',
        iAmATalentedMusician: 'I am a very talented musician and I wish to be a part of the band',
        giveUsYourContact: 'Give us something to contact you 😉',
        iAmShocked:
          'I am absolutely shocked by the content displayed in this wonderful game and I want to let the world know',
        why: 'Why that?',
        itsRacist: "It's racist",
        forWho: 'Towards who?',
        niggers: 'Black people',
        chineses: 'Chineses (from China, not the others)',
        itCouldBeWorse: 'Could be worse...',
        vikings: 'Vikings',
        pirates: 'Pirates',
        aLotOfPeople: 'A whole lot of people',
        itsSexist: "It's sexist",
        itsHomo: "It's homophobic",
        itsReligonUnfriendly: 'It is blasphemy towards religion',
        itsPedophile: 'It contains some -BARELY HIDDEN- pedophilia and I do not like that',
        itsTerroristic: 'It is a terrorism glorification',
        itsNotFunny: "It's not funny, fucker",
        noneOfThis: 'Nothing of the above',
        technicalProblem: 'I had a technical issue that I want to report',
        whichOne: 'What is it?',
        onelineVersionDoesntWork:
          'Something does not work on the online version, which is presented as unstable and therefore I can only blame myself',
        blameYourself: 'Only blame yourself.',
        andDownloadTheGame: '(And download the game.)',
        imLeftHanded: 'Actually, I am left-handed',
        trueIndeed: 'No doubt, he was telling the truth.',
        needMoarOars: 'I need more RAM to play the game',
        mySuggestionIsSoAwesome:
          'My suggestion is so interesting it does not even appear in the list above',
        ohWell: 'Well then...'
      }
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
      }
    }
  }
}

const pref = localStorage.getItem(LANG_KEY)
const lang = pref === null ? navigator.language.split('-')[0] : pref
export const defaultLanguage: Language = isLanguage(lang) ? lang : 'en'
