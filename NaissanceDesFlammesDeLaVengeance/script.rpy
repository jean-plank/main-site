#scene
image mainMenu = "main_menu.png"

image jp_arrive = "jean_arrive.jpeg"
image port = "port_nuit.png"
image lucien_cage = "lucien_esclave.png"

image boucherie = "boucherie.jpeg"
image boucherie2 = "butchery.png"

image chemin = "chemin.png"
image censure = "censure.png"
image transformation = "transformation_fumee.png"
image transformation_lucien = "lucien_transformation.jpg"

image entrepot = "entrepot.png"
image exterieur_entrepot = "exterieur_entrepot.png"
image bataille_entrepot = "entrepot2.png"
image entrepot2_secret = "entrepot2_sg.png"


image jardin = "jardin.png"
image porn = "porn.png"

image jp_transform_sayen = "jp_transform_sayen.png"
image jp_vendeta = "jp_singedise.png"
image jp_drink_potion = "jp_potion.png"
image digital_paint = "jp_meteor_1920.png"
image meteor_end = "meteor_end.png"
image meteor-kimi = "meteor_kimi.png"
image ecrant_noir = "ecrant_noir.png"
image ruines = "ruines.jpg"


image meteor_kimi = "meteor_kimi.png"
image meteor_end = "meteor_end.png"
image ecrant_noir = "ecrant_noir.png"
image discover_valhala = "discover_valhala.png"
image porte_valala = "valala_door.png"
image jp_new_power = "jp_odin_power.jpg"
image odin_paysant = "odin_gueux.jpeg"
image jp_deter_odin = "jp_god.png"



#sprites

image jp_normal = "jean_plank.png"
image jp_avant_meurtre = "jp_avant_meurtre.png"
image jp_en_avant="jp_enavant.png"
image jp_crayon = "jp_crayon.png"
image jp_couleur = "jp_couleur.png"
image jp_perdu = "jp_perdu.png"
image jp_crayon_cauterisation = "jp_degeu.png"

image urgo = "urgo.png"
image lucien = "lucien.png"

image singed = "saint_gede.png"
image singed_crayon = "singed_crayon.png"
image singed_enerve = "sg_enerve.png"

image miss = "miss.png"

image odin = "odin.png"
image odin_crayon = "odin_crayon.png"

image censurebite = "censurebite.png"

#personnages

define jp = Character('Jean Plank', color="#c8ffc8")
define urgo = Character('Urgo le Boucher du Bled', color="#c8ffc8")
define lucien = Character('Lucien le Magicien Marabout', color="#c8ffc8")
define singed = Character('Saint Gède', color="#c8ffc8")
define mf = Character ('Fomme', color="#c8ffc8")
define odin = Character ('ODIN DIEU DES DIEUX', color="#c8ffc8")

label start:

scene mainMenu

"Jean Plank 2 a été réalisé dans un but purement humoristique, et nous pensons sincèrement que l'on peut rire de tout."

"Nous ne voulons promouvoir aucune forme de discrimination quelle qu'elle soit."

"En conséquence : merci de ne pas jouer à Jean Plank si vous n'avez pas d'humour."

$ potion = 0
$ censure = 0

menu:
    "Jouer à la version tout public":
        $ censure = 1
    "Jouer à la version non censurée":
        $ censure = 0

scene jp_arrive
play music "jp_theme.ogg"
"Jean Plank, tout grand capitaine qu'il fût, ne put s'empêcher de lâcher un discret \"Yoho!\" de joie lorsque le port fût en vue."

"Il entendait au loin les cris de joie des citadins qui apercevaient son si beau pavillon."

play sound "terror_jp_coming.ogg"
"Certaines de ses connaissances de longue date, d'une voix remplie d'amour et de respect scandaient son nom."

scene port
"Le voyage avait été plus que fructueux, Jean Plank avait découvert de nombreuses contrées dans lesquelles il avait pu faire fructifier son affaire."
"Grâce à quelque stratagème, il avait même eu le droit d'emporter quelques souvenirs."
"Mais venait  maintenant le temps tant redouté du ravitaillement."
"Comme il le disait souvent :"

show jp_normal
voice "jp_scene1.1_payer.ogg"
jp "Moi, quand on dit ravitaillement, je pense à payer. Et tout le monde doit payer."
hide jp_normal

"Notre corsaire se mit donc en quête de ce qui pourrait remplir son navire à moindre frais."
"Malheureusement il fut détourné de son but premier par une sensation de grattement sur sa jambe."
play sound "luchien.ogg"
"C'était le Luchien qui avait faim."

scene lucien_cage

"Jean Plank avait trouvé cet étrange animal dans l'épaisse jungle des îles tropicales des Caraïbes."
"Voyant au delà de sa couleur de peau peu conventionnelle, notre héros, patriote mais pas raciste, pensait que ce spécimen serait fort utile pour la suite des événements."


voice "jp_scene1.2.ogg"
jp "Il faut le nourrir !"


"Malheureusement la ville ne permettait pas la conception de son alimentation naturelle, un étrange mélange que les indigènes avaient surnommé, Khaéf'sË."

"Pour Jean Plank plus de doute !"


voice "jp_scene1.3.ogg"
jp "Allons chez Urgo !"


#scene boucherie
play music "strange_butchery.ogg" fadeout 1.0 fadein 1.0
scene boucherie


"Urgo le boucher était une vielle connaissance de notre bien aimé capitaine."
"Ayant eu quelques problèmes avec la justice pour de petites infractions mineures,"
voice "previsible.ogg"
"...enfin plutôt sur des mineures,"
"Il avait déménagé dans ce coin reculé."
play sound "violent_open_door.ogg"
"Jean Plank poussa la porte de l'établissement et entra tout d'un coup en criant :"



scene boucherie2

show jp_normal
voice "jp_scene2.1_pas_change.ogg"
jp "Yoho ! T'as pas changé toi dis-donc !"

hide jp_normal
show urgo
show jp_normal
voice "urgo1_dette.ogg"
urgo "Jean Plank ?! Ça alors, je ne t'ai pas revu depuis ce jour où tu voulais éviter de payer et où j'ai consenti à ce que tu règles ta dette en me s..."

voice "jp_scene2.2.ogg"
jp "Haha, inutile de ressasser le passé, j'ai bien changé depuis cette époque !"


show urgo
voice "urgo2.ogg"
urgo "Je vois ça."

voice "jp_scene2.3.ogg"
jp "Et toi, y'a eu du renouveau dans ta vie ?"

voice "urgo3.ogg"
urgo "Heu... non pas vraiment."

voice "jp_scene2.4.ogg"
jp "Aucun changement quel qu'il soit alors ?"

voice "urgo4.ogg"
urgo "Comme tu peux le voir, non. "

voice "jp_scene2.5.ogg"
jp "Pas de chance ça."
hide jp_normal
hide urgo
"Jean Plank en ayant encore pour un moment, avançons un peu dans cette conversation, ou cette humiliation ; appelez ça comme vous le voulez, je m'en bats les reins."

"La discussion avait finalement pris fin."
"Urgo avait fini par comprendre que Jean Plank riait de son sort comme on rit d'un gold 5 stuck à cause de ses mates."
"Pris d'un excès de rage, il avait lancé son couperet sur Jean Plank."
"Lancer qui fut évité aisément par une gracieuse rotation du bassin de notre héros,"
play sound "luchien_couinement_douleur.ogg"
"Qui en guise de punition avait mis quelques petites claques humiliantes au boucher..."

play sound "niktamer.ogg"

"Suivies d'un grand coup de sabre qui lui avait tranché le bras droit."
play sound "enfoirer_des_federaux.ogg"
"Cet enfoiré de chien des fédéraux allait pas s'en tirer comme ça, fallait quand même pas déconner."

show jp_avant_meurtre
voice "jp_scene2.6.ogg"
"Remerciements pour la viande."
"Avait il dit en partant."
hide jp_avant_meurtre



scene chemin
play music "musique_chemin.ogg"

"En retournant vers la ville, Jean Plank remarqua alors que son chemin était marqué."
"Son Luchien, cet incapable, s'était pris le couperet dans la hanche et laissait une abondante traînée de sang derrière lui."
show jp_normal
voice "jp_scene3.1_gibier.ogg"
jp "Gibier de potence."
hide jp_normal
"Voulant éviter que Urgo le boucher ne l'égorge dans son sommeil (voire pire), il  fallait à tout prix soigner cette blessure."
"Mais Jean Plank n'était pas n'importe qui. Il avait acquis au cours de ses voyages dans le Grand Nord, de nombreuses connaissances en médecine Viking."
"Il regarda son Luchien et lui dit avec assurance :"
show jp_crayon_cauterisation
voice "jp_scene3_cauteriser.ogg"
jp "Luchien , t'inquiète frère, je vais te cautériser !"
hide jp_crayon_cauterisation


play sound "no_good_pls_no.ogg"

"A ses mots, Luchien qui avait toute confiance en son maître, acquiesça d'un petit cri."



"Il fit alors s'allonger le Luchien,"
"Sortit de sa poche un petit sac de poudre,"
"En étala une bonne traînée sur la hanche du Luchien,"
"(bah ouais, la blessure était tout de même assez profonde, autant ne pas aller à l'economie)"
play sound "meche_on_fire.ogg"
scene censure

"Et y mit le feu à l'aide du chien de son pistolet."
stop music
voice "souffrance.ogg"

scene ecrant_noir
play sound "explosion_poudre.ogg"
""

scene transformation
play music "lucian_magic_theme.ogg"

"Une épaisse fumée violette entourait notre capitaine préféré."
"On n'y voyait pas à 3 pieds mais Jean Plank percevait une douce mélodie provenant de cet épais nuage."
"C'est alors qu'il sortit."
scene lucien_transformation
"Métamorphosé comme jamais."
"Le Luchien s'était transformé en magicien."

scene chemin
play music "jp_theme.ogg"
show lucien
voice "lucien_scene3.1.ogg"
lucien "Wallah pourquoi tu es sulrprli ?"

show jp_couleur
voice "jp_scene3.2_supterfuge.ogg"
jp "Qu'est ce donc là que ce subterfuge ?!"

voice "lucien_scene3.2.ogg"
lucien "C'est de la Magie."


"Jean Plank le regardait perplexe"

voice "lucien_scene3.3.ogg"
lucien "Dans mon pays, il y avait une légende qui disait : la magie noire c'est le vaudou c'est le mal, mais le feu il est là pour t'éclairer."

hide lucien
hide jp_couleur

play sound "ha.ogg"

"Jean Plank ainsi convaincu, il était temps d'aller chercher de la poudre."

















scene exterieur_entrepot

"Jean Plank avait vraiment besoin de poudre. Il se rendit donc vers son nouveau fournisseur officiel, l'ancien ayant subitement disparu, on ne sait trop où."
"Encore et toujours grâce à d'habiles négociations, Jean Plank avait pu placer son plus ancien ami à ce poste. "


play music "religieux_shop.ogg"

scene entrepot

show singed
voice "sg_1.1.ogg"
singed "Jean Plank ! Mon vieil ami."


show jp_normal
voice "plusdepoudre.ogg"
jp "Il nous faut plus de poudre !"


voice "sg_1.2.ogg"
singed "Toujours à l'essentiel à ce que je vois, héhé."
hide singed
hide jp_normal

"Une fois l'artillerie de notre capitaine renouvelée vint le moment de partir."

show jp_normal
voice "jp_scene4.1.ogg"
jp "Allez, à la prochaine !"
hide jp_normal

show singed
voice "sg_1.3.ogg"
singed "Jean Plank !"
hide singed

play music "crayon.ogg"

show jp_crayon
voice "jp_scene4.2.ogg"
"Oui ? Saint Gède ?"
hide jp_crayon

show singed_crayon
voice "sg_1.4.ogg"
"N'aurais-tu pas oublié quelque chose ?"
hide singed_crayon

show jp_crayon
voice "jp_scene4.3.ogg"
"Quoi donc, mon bon ami ?"
hide jp_crayon

show singed_crayon
voice "sg_1.5.ogg"
"Ton dicton le plus ancien, celui qui fait de toi ce que tu es et qui te fera rester intègre, l'essence même de ton existence :"
hide singed_crayon

show jp_crayon
voice "jp_scene4.4.ogg" #redoubler à partir de la
"Gibier de potence ?"
hide jp_crayon

show singed_crayon
voice "sg_1.6.ogg"
"Non Jean, tu le sais, cela n'est qu'une façade, un masque que tu portes au quotidien et que tu ne délaisses jamais."
hide singed_crayon

show jp_crayon
voice "jp_scene4.5.ogg"
"Mais alors, ce serait..."
hide jp_crayon

show singed_crayon
voice "sg_1.7.ogg"
"Oui, Jean Plank." #dire ça comme si c'étais un sorte d'elu
hide singed_crayon

show jp_crayon
voice "jp_scene4.6.ogg"
"Tout... le monde doit..."

menu:
    "Payer Saint Gède.":
         jump jp_paye_singed

    "Saint Gède doit payer !":
         jump singed_paye



#choix : payer  saint gède
label jp_paye_singed:


scene entrepot
play music "religieux_shop.ogg"

show singed
voice "sg_1.8.ogg"
singed "Tu as quelque peu changé Jean Plank."


show jp_couleur
play sound "tiens_voila_tes_30_dollards.ogg"
jp "Tiens voilà tes 30 dollars !"

voice "sg_1.9.ogg"
singed "En guise de récompense, je t'offre cette potion."


$ potion = 1

voice "jp_scene4.7.ogg"
jp "Qu'est ce donc là que cette choserie ?"


voice "sg_1.10.ogg"
singed "C'est une potion d'invincibilité."
hide singed


hide jp_couleur
show jp_en_avant
voice "jp_scene4.8.ogg"
jp "L'invincibilité ça aide à faire payer !"
hide jp_en_avant
play music "musique_taverne.ogg"

"Jean Plank et Saint Gède conclurent finalement leur transaction par l'alcool."
"Le Rhum coula à flot (aux frais de Saint Gède bien sûr)."
"Ils burent aussi quelques tonneaux du sang du Christ."
"Après beaucoup, mais alors beaucoup de litres, Jean Plank tomba finalement ivre mort sur le sol collant de coulures de vin de l'entrepôt de Saint Gède."

stop music

jump fin_entrepot



#changer de vendeur

label singed_paye:
stop music
play music "religieux_shop.ogg"
scene bataille_entrepot
show jp_normal
voice "jp_scene4.9.ogg"
jp "Il est temps de me payer maintenant."

show singed
voice "sg_1.11.ogg"
singed "Vois tu Jean Plank, je te connais depuis trop longtemps, j'avais prévu que ceci arriverait."

voice "jp_scene4.11.ogg"
jp "Tout le monde doit payer !"

voice "sg_1.12.ogg"
singed "Je ne payerai jamais ! Vil gredin !"
hide singed
hide jp_normal

show jp_avant_meurtre
voice "jp_scene4.12.ogg"
jp "Alors tu vas mourir ! "
hide jp_avant_meurtre

show singed_enerve
play sound "mais_non.ogg"
singed "Mais non, c'est toi qui va mourir connard !"
hide singed_enerve

play music "singed_not_religius.ogg"
"Sur ses mots, Saint Gède, qui venait d'abandonner sa foi, souleva Jean Plank comme jamais."
scene entrepot2_secret
play sound "jp_jet_lanced.ogg"
"Jean Plank fut \"jet lanced\" à l'autre bout de la pièce brisant au passage un vase, une chaise, deux verres, 3 assiettes et les os d'une daronne."
scene bataille_entrepot
"Jean Plank, ivre de colère, se releva, se prenant pour Astérix, but une lampée de la gourde de potion qu'il portait à la ceinture"
"et appliqua la stratégie dite \"dubronzecink\", pratiquée depuis des temps immémoriaux et secrètement transmise au initiés de génération en génération,"
"consistant à charger l'ennemi avec toute sa fureur et sa haine."
"Jean Plank fonça donc comme un demeuré sur Saint Gède qui n'eût qu'à courir pour voir notre héros tomber sous ses poisons."

stop music



label fin_entrepot:













scene jardin
play music "musique_jardin.ogg"

"Jean Plank se réveilla quelques heures plus tard."
"Son regard était rivé sur le ciel obscurci du crépuscule."
"Il était dans son jardin, allongé sur le dos dans l'herbe."
"Son magicien l'avait probablement traîné jusqu'ici après son aventure avec Saint Gède."

show miss

"Sa fômme le regardait de haut d'un air méprisant."
"Depuis qu'elle avait appris la langue du pays, elle était victime d'une vicieuse maladie."
"Après plusieurs semaines et de nombreuses consultations chez les spécialistes, on avait réussi à trouver l'origine du mal qui rongeait la pauvresse."
"Il avait secrètement grandi en elle depuis sa naissance, tel un cancer que l'on ne peut réprimer."
"Fort heureusement, ses jours n'étaient pas en danger mais par moments, elle était très irritable et reprochait souvent son comportement à Jean Plank."

voice "jp_chambre1.ogg"
jp "Pfff quelle saloperie ce cerveau, par tous les dieux comment a-t'elle choppé cette immondice ?"
"grommela Jean Plank."


voice "mf1_1etfin.ogg"
mf "Et voilà, encore une fois je te retrouve ivre mort ! C'est toujours la même chose avec toi ! Je te jure que si ça continue je te mmmmm.."
hide miss

"Et hop, Jean Plank appliqua sa stratégie habituelle de la boule de soumission."
"Sentant que son cerveau sous ceinturale se mettait en route, Jean Plank déchira les loques qui servaient de vêtements à sa fômme."

voice "jp_chambre2.ogg"
"Elle est décidément beaucoup mieux sans, pensa Jean Plank."
"D'un geste rapide, il retourna MissFourtout et la courba avant d'abaisser son propre pantalon."
"Enfin, parce qu'il faisait plutôt froid, il mit mini-Jean Plank au chaud."

show porn
if censure == 1:
    show censurebite

voice "jp_chambre3.ogg"
jp "mmmmhhh, bien juteux !"








if potion == 0:
    jump valala

else:
    jump meteor








label meteor:

play music "meteor_theme.ogg"
play sound "tintin_ultimate_fond.ogg"
"Soudain un grand bruit résonna au loin."
"Le sang de Jean Plank ne fit qu'un tour :"
"Il savait ce qu'était ce bruit."
"Coincé dans sa \"fômme\" il ne pouvait esquiver le cataclysme qui allait s'abattre sur lui."

scene meteor_kimi

"Tomba alors de la poche de Jean Plank la potion de Saint Géde."

scene jp_drink_potion
"Ce nouvel espoir décupla sa force. Il détacha sa femme de sa teub, rammassa la potion, et la but d'un trait."
"Il sentit alors tout son corps se remplir d'une puissance nouvelle."
"Une vague de chaleur remonta de son ventre, lui brûlant la gorge et lui faisant mal à la tête."
"Il lui semblait que son corps allait éclater sous la puissance de l'énergie qui l'envahissait."
scene jp_transform_sayen

play sound "the_sayen_struggle.ogg"

"Jean Plank se mit à hurler tant la douleur était insupportable."
"Mais il la sentait, cette puissance infinie qui émanait de tout son être."


"Il n'avait plus le temps."
"la peur venait de le quitter."
"Il savait que faire désormais."
"Il rammassa MissFourtout..."
"D'un geste puissant, il la souleva au dessus de lui,"
"Et prit appui sur le sol."

scene digital_paint
#play sound the_sayen_struggle.ogg
""
voice "explosion_poudre.ogg"
scene meteor_end

""
scene ecrant_noir

stop music

""
"Jean Plank regarda autour de lui :"

scene ruines
play music "ruines.ogg"

"Il ne restait que des ruines."
"Le Luchien semblait avoir survécu grâce à la puissance de son \"Zhonya\"."
"Son trésor avait disparu, comme sa demeure, pulvérisés par la chaleur dégagée par l'explosion."
"MissFourtout aussi avait disparu, probablement désintégrée dans l'explosion."
"Faut dire qu'elle avait été vachement près quand même."
"Mais le pire était à venir pour Jean Plank."
"Lorsqu'il voulut remettre son tricorne,"
"Il ne le trouva point."
"Il sentit alors le vent glisser sur son crâne."
"C'était une sensation qu'il n'avait jamais connu auparavant."
"Il se précipita alors vers un morceau de miroir qui traînait par terre..."
"Le prit..."
"Et paniqué, il regarda."
"Mais ce ne fut pas son visage qu'il y vit."
"C'était celui de Saint gède !"
"Saint gède lui avait volé son visage !"
play sound "jp_singed.ogg"
"Le cri que Jean Plank poussa ne pourrait être décrit, "
"Ce mélange à la limite de l'inhumain traduisant la haine qui rongeait son cœur et l'infinie tristesse qui l'envahissait."
"Il était amer de regrets, de regrets de ne pas avoir compris ce qui était réellement important durant toutes ces années."

play music "kill_la_kill_ost.ogg"
scene jp_vendeta
"Pour la première fois de sa vie, des larmes (mais des larmes d'homme) coulèrent de ses yeux."
"Comment Saint Gède avait t'il osé ?!"
"Ce forban..."
"Tout n'était que complot."
"Oui !"
"Un complot infâme fomenté par son plus grand rival."
"Celui avec qui il  avait tout appris."
"Ce scélérat allait le regretter."
"Il allait payer !"


"L'heure de la vengeance à sonné"

jump credi








label valala :

play music "meteor_theme.ogg"
play sound "tintin_ultimate_fond.ogg"
"Soudain un grand bruit résonna au loin."
#son du meteor qui arrive
"Le sang de Jean Plank ne fit qu'un tour :"
"Il savait ce qu'était ce bruit."
"Coincé dans sa \"fômme\" il ne pouvait esquiver le cataclysme qui allait s'abattre sur lui."

scene meteor_kimi

"Il était trop tard."
"Jean Plank ne savait que faire."
"Tout était perdu."
voice "explosion_poudre.ogg"
play sound "rien.ogg"
scene meteor_end

""
scene ecrant_noir
stop music

show jp_perdu
jp "Où... ?"
voice "jp_scene6.1.ogg"
jp "Où suis-je ?"
hide jp_perdu

play music "musique_valala.ogg"
scene discover_valhala
""
"Jean Plank se rappela alors de la formule interdite impie apprise lors de son voyage."
"Il hurla de toute ses forces : "
voice "jp_scene6.2.ogg"
jp "KOKO WA DOKO ?! TIENMEN JDONC SECIé RAISTE DENTARA JEGRIMALKIN !"
""

voice "Odin1.1.ogg"
odin "Jean Plank, fils de fils de pute, bienvenue à Aasgard ! "

"Au son de cette voix Jean Plank se retourna d'un coup."

scene porte_valala
show odin

show jp_normal
voice "jp_scene6.3.ogg"
jp "Qu'est-ce donc là que cette duperie ?"
voice "jp_scene6.4.ogg"
jp "Vous tentez de jouer de malice pour spolier mon trésor ?!"
voice "Odin1.2.ogg"
odin "Quel blasphème oses-tu proférer contre moi, Odin, Dieu des Dieux ?!"

scene ecrant_noir
stop music
play sound "tonere.ogg"
"Le tonnerre gronda et Jean Plank fut foudroyé."


play music "musique_valala.ogg"
scene porte_valala

"Jean Plank se réveilla le lendemain."
"Au vu des événements récents, il comprit qu'il était mort. "
"Il avait été tué. "
"Une seule personne était capable de cette ignominie."
"Son plus grand rival, celui avec qui il avait tout appris, le capitaine... "

show odin
voice "Odin1.3.ogg"
odin "Jean Plank, te voilà revenu aux portes du Valhalla."
show jp_normal
"Jean Plank songea à un plan de vengeance."
"Ce \"Odin\" allait peut-être lui être utile."
voice "Odin1.4.ogg"
odin "Si tu est disposé à m'écouter, j'aimerais beaucoup que tu restes en notre compagnie. Nous aimons les valeureux combattants, tu te plairas ici !"

hide odin

stop music
play music "Crayon.ogg"

show jp_crayon
voice "jp_scene6.5.ogg"
jp "Odin, j'ai une vengeance à accomplir."
hide jp_crayon

show odin_crayon
voice "Odin1.5.ogg"
odin "Mais tu es mort Jean Plank, il t'est désormais impossible de retourner dans le monde des vivants."
hide odin_crayon

show jp_crayon
voice "jp_scene6.6.ogg"
jp "Mais il suffirait que tu me donnes tes pouvoirs."
hide jp_crayon

show odin_crayon
voice "Odin1.6.ogg"
odin "Jean, je ne peux... Mes responsabilités..."
hide odin_crayon

show jp_crayon
voice "jp_scene6.7.ogg"
jp "Ne t'en fais pas, je ferais de toi un gueux."
hide jp_crayon

show odin_crayon
voice "Odin1.7.ogg"
odin "Mais Jean..."
hide odin_crayon

show jp_crayon
voice "jp_scene6.8.ogg"
jp "Od', c'est un sacrifice nécessaire."
hide jp_crayon

show odin_crayon
voice "Odin1.8.ogg"
odin "Nécessaire ?"
hide odin_crayon

show jp_crayon
voice "jp_scene6.9.ogg"
jp "Oui. Pour notre gloire éternelle."
hide jp_crayon

show odin_crayon
voice "Odin1.9.ogg"
odin "Je comprends Jean. Quelqu'un doit le faire."


stop music

scene jp_new_power
play music "transfusion_power.ogg"
"Alors Odin donna l'intégralité de ses pouvoirs à Jean Plank."
""
scene odin_paysant
stop music
"Conformément à sa promesse, Jean fit d'Odin un simple mortel avant de l'envoyer sur Terre dans une VIEILLE FERME DE MERDE."
play sound "demerde.ogg"
""


scene ecrant_noir
play music "kill_la_kill_ost.ogg"

scene jp_deter_odin
"Du haut du Valhalla, Jean Plank était prêt."
"Il avait perdu son trésor, il avait perdu son harem, il avait perdu son magicien."
"Il avait perdu la vie."
"Plus rien à perdre, tout à reprendre."
"L'heure de la vengeance est arrivée !"


label credi:

"Crédits :"
"Scénariste : Shiroi Maô\n
Conseiller scénaristique : Styrale"
"Réalisation : Monsieur Shiroi Maô\n
Co-réalisateur : Monsieur Styrale\n"
"Montage : Le Sublime Shiroi Maô\n
Assistant montage : L'astucieux Monsieur Styrale\n"
"Directeur de recherche : Le très estimé Lucas HAMMERER\n
Assistant chercheur : Thomas BOQCUET"
"Directeur artistique : Séphultura \n
Conseiller artistique : LucianAteMyKFC"
"Digital Painteur presque de qualité : ShiroiMaô\n
Directeurs Audio : Jean-Eudes PATRÉCHER et Gontran PEUCOUTEUX\n"
"Doublage :"
"MissFourtout : La très généreuse génitrice de Monsieur Styrale\n
JeanPlank, Lucien le magicien : ShiroiMaô qui en reste sans voix\n"
"Urgo, Saint Gède et Odin : Monsieur Styrale qui a donc acquis une expérience professionelle dans le doublage"
"Remerciements à la famille de Monsieur Lucas pour avoir le soutien moral et les studios"
"Remerciement à Monsieur Simon comme catalyseur de haine et surtout pour NE PAS AVOIR ÉTÉ LÀ !"
"Jeu réalisé avec le moteur Renpy"
""
"FUCK ME PLEASE !"
""


return
