image menu = "jpthestory.jpg"
image market1 = "market1.jpg"
image market2 = "market2.jpg"
image entrepot = "entrepot.jpg"
image chambre = "chambre.jpg"
image fin = "fin.jpg"
image mf = "mf.png"
image gp2 = "gp_posey.png"
image gp1 = "gp1.png"
image gp3 = "Gp_interogatoire.png"
image hentai = "mfhentai.png"
image dealer = "dealer.png"
image vorange = "vendeuse_orange.png"


define j = Character('Jean Plank', color="#FEFEFE")
define mf = Character('Miss Fourtune', color="#d671a9")
define v = Character('La Vendeuse', color="#d671a9")
define d = Character('Dealer', color="#d671a9")


scene chambre
show gp

label start:


    scene market1

    play music "theme_gp.ogg"
    show gp2
    "Jean Plank après un combat long et douloureux devait ravitailler son navire."
    "Cherchant ainsi de bonnes oranges bien juteuses, il finit par arriver au marché."
    "Il fut alors interrompu par, ma foi, une grosse chaudasse."
    hide gp2

    show mf

    mf "Anatawa dare ?"
    j "Parle donc francais, PUTE !"
    "Jean Plank avait l'habitude de ce genre de situation."
    "De toute évidence cette \"fomme\" n'en avait pas après sa vie mais juste après sa, voire ses bourses."
    hide mf
    show gp1
    "N'ayant pas le temps de niaiser, il la poussa délicatement sur le côté, se dirigeant d'un pas décidé vers l'échoppe des oranges."

    scene market2


    "Cette dernière se trouvait quelques mètres plus loin."
    "Jean Plank sortit son imposante besace et la remplit à raz-bord de justeuses oranges sanguines."
    play sound "orange.ogg"
    show vorange
    "Il se tourna ensuite vers la vendeuse."
    hide vorange
    show gp2
    j "Il est temps de me payer maintenant !"
    hide gp2
    show vorange
    v "Qu'est ce donc là que cette duperie ?"
    v "Pourquoi devrais-je payer, je suis la vendeuse ?"
    hide vorange
    show gp3
    play sound "toutlemonde.ogg"
    j "Tout le monde doit payer !"

    hide gp3
    "En galant homme, Jean Plank réussit à finir sa transaction sans encombre."
    play sound "uncoup.ogg"
    ""


    scene market1


    "Les oranges sanguines obtenues, il était temps pour Jean Plank de retourner au navire."
    "Sur son chemin apparut à nouveau la \"fomme\"."
    show mf
    mf "\"Phrasesimcomprehensiblesdansuneautrelangue...\""
    "Jean Plank en déduisit qu'il lui fallait la défoncer."

    scene chambre
    play sound "joui.ogg"
    mf "ha... haaaaa..... haaaaaaa..."
    show hentai
    play sound "jeveux.ogg"
    j "Je veux t'entendre frémir de l'intérieur !"
    play sound "joui.ogg"
    ""
    play sound "juteux.ogg"
    j "Aaaah bien juteux ! "
    ""


    hide hentai

    show gp3
    "Jean Plank, une fois bien vidé, remarqua que ses réserves de poudre étaient basses."
    "Il était temps de recharger."

    scene entrepot
    show dealer
    d "Combien de poudre ?"
    hide dealer

    show gp2
    play sound "plusdepoudre.ogg"
    j "Il me faut plus de poudre !"

    hide gp2
    show dealer
    d "3000 gold pour plus !"
    hide dealer
    show gp3
    "Mais Jean Plank ne voulait pas dépenser son trésor."
    "Il trouva alors un arrangement."
    play sound "pan.mp3"

    hide gp3
    "..."
    "..."
    play music "pirate.mp3" fadeout 1.0
    "N\'ayant plus rien à faire et voulant découvrir de nouveaux horizons,"
    "Sa nouvelle carrière ne faisait que commencer !"

    scene fin
    "Fin BITCH !"
    "Realisateur SHIROIMAO"
    "Un scénario de BUSHINRYU peaufiné par SHIROIMAO"
    "Remerciements a STYRALE pour l'aide apportée"
    "Réalisé avec Renpy (rendons à César ce qui est à César)"


    return
