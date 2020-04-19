import * as t from 'io-ts'

export type FormTranslationKey =
  | FormTranslationKeyAnswer
  | 'whatDoYouWant'
  | 'butICant'
  | 'whatElse'
  | 'whichCharacter'
  | 'sceneDescription'
  | 'jpNoNeedToIntroduceMe'
  | 'haddockTintin'
  | 'rammusOk'
  | 'giveUsYourContact'
  | 'why'
  | 'forWho'
  | 'itCouldBeWorse'
  | 'whichOne'
  | 'blameYourself'
  | 'andDownloadTheGame'
  | 'trueIndeed'
  | 'ohWell'

export type FormTranslationKeyAnswer = t.TypeOf<typeof FormTranslationKeyAnswer.codec>
export namespace FormTranslationKeyAnswer {
  export const codec = t.union([
    t.literal('devsAreAssholes'),
    t.literal('devsAreAwesome'),
    t.literal('congrats'),
    t.literal('congratsSonOfABitch'),
    t.literal('iWannaSuggestScene'),
    t.literal('jp'),
    t.literal('luchien'),
    t.literal('mf'),
    t.literal('stGede'),
    t.literal('haddock'),
    t.literal('kaarthus'),
    t.literal('rammus'),
    t.literal('pikachu'),
    t.literal('otherWithPrecision'),
    t.literal('iAmATalentedMusician'),
    t.literal('iAmShocked'),
    t.literal('itsRacist'),
    t.literal('niggers'),
    t.literal('chineses'),
    t.literal('vikings'),
    t.literal('pirates'),
    t.literal('aLotOfPeople'),
    t.literal('itsSexist'),
    t.literal('itsHomo'),
    t.literal('itsReligonUnfriendly'),
    t.literal('itsPedophile'),
    t.literal('itsTerroristic'),
    t.literal('itsNotFunny'),
    t.literal('noneOfThis'),
    t.literal('technicalProblem'),
    t.literal('onlineVersionDoesntWork'),
    t.literal('imLeftHanded'),
    t.literal('needMoarOars'),
    t.literal('mySuggestionIsSoAwesome')
  ])
}
