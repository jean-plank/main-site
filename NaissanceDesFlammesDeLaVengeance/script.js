/* user constants */
const DOMAIN = "http://localhost:8675/"
// const DOMAIN = "./"

$.getScript(DOMAIN+'js/renpy.js')
$.getScript(DOMAIN+'js/constants.js')

const IMG_MAINMENU = new Image("main_menu.png")
const IMG_JP_ARRIVE = new Image("jean_arrive.jpeg")
const IMG_PORT = new Image("port_nuit.png")
const IMG_LUCIEN_CAGE = new Image("lucien_esclave.png")
const IMG_BOUCHERIE = new Image("boucherie.jpeg")
const IMG_BOUCHERIE2 = new Image("butchery.png")
const IMG_CHEMIN = new Image("chemin.png")
const IMG_CENSURE = new Image("censure.png")
const IMG_TRANSFORMATION = new Image("transformation_fumee.png")
const IMG_TRANSFORMATION_LUCIEN = new Image("lucien_transformation.jpg")
const IMG_ENTREPOT = new Image("entrepot.png")
const IMG_EXTERIEUR_ENTREPOT = new Image("exterieur_entrepot.png")
const IMG_BATAILLE_ENTREPOT = new Image("entrepot2.png")
const IMG_ENTREPOT2_SECRET = new Image("entrepot2_sg.png")
const IMG_JARDIN = new Image("jardin.png")
const IMG_PORN = new Image("porn.png")
const IMG_JP_TRANSFORM_SAYEN = new Image("jp_transform_sayen.png")
const IMG_JP_VENDETA = new Image("jp_singedise.png")
const IMG_JP_DRINK_POTION = new Image("jp_potion.png")
const IMG_DIGITAL_PAINT = new Image("jp_meteor_1920.png")
const IMG_METEOR_END = new Image("meteor_end.png")
const IMG_METEOR_KIMI = new Image("meteor_kimi.png")
const IMG_ECRANT_NOIR = new Image("ecrant_noir.png")
const IMG_RUINES = new Image("ruines.jpg")
const IMG_DISCOVER_VALHALA = new Image("discover_valhala.png")
const IMG_PORTE_VALALA = new Image("valala_door.png")
const IMG_JP_NEW_POWER = new Image("jp_odin_power.jpg")
const IMG_ODIN_PAYSANT = new Image("odin_gueux.jpeg")
const IMG_JP_DETER_ODIN = new Image("jp_god.png")
const IMG_JP_NORMAL = new Image("jean_plank.png")
const IMG_JP_AVANT_MEURTRE = new Image("jp_avant_meurtre.png")
const IMG_JP_EN_AVANT = new Image("jp_enavant.png")
const IMG_JP_CRAYON = new Image("jp_crayon.png")
const IMG_JP_COULEUR = new Image("jp_couleur.png")
const IMG_JP_PERDU = new Image("jp_perdu.png")
const IMG_JP_CRAYON_CAUTERISATION = new Image("jp_degeu.png")
const IMG_URGO = new Image("urgo.png")
const IMG_LUCIEN = new Image("lucien.png")
const IMG_SINGED = new Image("saint_gede.png")
const IMG_SINGED_CRAYON = new Image("singed_crayon.png")
const IMG_SINGED_ENERVE = new Image("sg_enerve.png" )
const IMG_MISS = new Image("miss.png")
const IMG_ODIN = new Image("odin.png")
const IMG_ODIN_CRAYON = new Image("odin_crayon.png")
const IMG_CENSUREBITE = new Image("censurebite.png")

const SND_BONNUS = new Sound('bonnus.ogg')
const SND_CARRIS_PUTEU = new Sound('carris_puteu.ogg')
const SND_CAR_START = new Sound('car_start.ogg')
const SND_CRAYON = new Sound('Crayon.ogg')
const SND_DEMERDE = new Sound('demerde.ogg')
const SND_DOG_CRYING = new Sound('dog_crying.ogg')
const SND_ENFOIRER_DES_FEDERAUX = new Sound('enfoirer_des_federaux.ogg')
const SND_EXPLOSION = new Sound('explosion.ogg')
const SND_EXPLOSION_POUDRE = new Sound('explosion_poudre.ogg')
const SND_FOUDRE = new Sound('foudre.ogg')
const SND_HA = new Sound('ha.ogg')
const SND_INSULTE = new Sound('insulte.ogg')
const SND_JP_CHAMBRE1 = new Sound('jp_chambre1.ogg')
const SND_JP_CHAMBRE2 = new Sound('jp_chambre2.ogg')
const SND_JP_CHAMBRE3 = new Sound('jp_chambre3.ogg')
const SND_JP_JET_LANCED = new Sound('jp_jet_lanced.ogg')
const SND_JP_SCENE1_1_PAYER = new Sound('jp_scene1.1_payer.ogg')
const SND_JP_SCENE1_2 = new Sound('jp_scene1.2.ogg')
const SND_JP_SCENE1_3 = new Sound('jp_scene1.3.ogg')
const SND_JP_SCENE2_1_PAS_CHANGE = new Sound('jp_scene2.1_pas_change.ogg')
const SND_JP_SCENE2_2 = new Sound('jp_scene2.2.ogg')
const SND_JP_SCENE2_3 = new Sound('jp_scene2.3.ogg')
const SND_JP_SCENE2_4 = new Sound('jp_scene2.4.ogg')
const SND_JP_SCENE2_5 = new Sound('jp_scene2.5.ogg')
const SND_JP_SCENE2_6 = new Sound('jp_scene2.6.ogg')
const SND_JP_SCENE3_1_GIBIER = new Sound('jp_scene3.1_gibier.ogg')
const SND_JP_SCENE3_2_SUPTERFUGE = new Sound('jp_scene3.2_supterfuge.ogg')
const SND_JP_SCENE3_CAUTERISER = new Sound('jp_scene3_cauteriser.ogg')
const SND_JP_SCENE4_10 = new Sound('jp_scene4.10.ogg')
const SND_JP_SCENE4_11 = new Sound('jp_scene4.11.ogg')
const SND_JP_SCENE4_12 = new Sound('jp_scene4.12.ogg')
const SND_JP_SCENE4_1 = new Sound('jp_scene4.1.ogg')
const SND_JP_SCENE4_2 = new Sound('jp_scene4.2.ogg')
const SND_JP_SCENE4_3 = new Sound('jp_scene4.3.ogg')
const SND_JP_SCENE4_4 = new Sound('jp_scene4.4.ogg')
const SND_JP_SCENE4_5 = new Sound('jp_scene4.5.ogg')
const SND_JP_SCENE4_6 = new Sound('jp_scene4.6.ogg')
const SND_JP_SCENE4_7 = new Sound('jp_scene4.7.ogg')
const SND_JP_SCENE4_8 = new Sound('jp_scene4.8.ogg')
const SND_JP_SCENE4_9 = new Sound('jp_scene4.9.ogg')
const SND_JP_SCENE6_1 = new Sound('jp_scene6.1.ogg')
const SND_JP_SCENE6_2 = new Sound('jp_scene6.2.ogg')
const SND_JP_SCENE6_3 = new Sound('jp_scene6.3.ogg')
const SND_JP_SCENE6_4 = new Sound('jp_scene6.4.ogg')
const SND_JP_SCENE6_5 = new Sound('jp_scene6.5.ogg')
const SND_JP_SCENE6_6 = new Sound('jp_scene6.6.ogg')
const SND_JP_SCENE6_7 = new Sound('jp_scene6.7.ogg')
const SND_JP_SCENE6_8 = new Sound('jp_scene6.8.ogg')
const SND_JP_SCENE6_9 = new Sound('jp_scene6.9.ogg')
const SND_JP_SINGED = new Sound('jp_singed.ogg')
const SND_JP_THEME = new Sound('jp_theme.ogg')
const SND_KILL_LA_KILL_OST = new Sound('kill_la_kill_ost.ogg')
const SND_LUCHIEN_COUINEMENT_DOULEUR = new Sound('luchien_couinement_douleur.ogg')
const SND_LUCHIEN = new Sound('luchien.ogg')
const SND_LUCIAN_LES_BONUS = new Sound('LUCIAN LES BONUS.ogg')
const SND_LUCIAN_MAGIC_THEME = new Sound('lucian_magic_theme.ogg')
const SND_LUCIEN_SCENE3_1 = new Sound('lucien_scene3.1.ogg')
const SND_LUCIEN_SCENE3_2 = new Sound('lucien_scene3.2.ogg')
const SND_LUCIEN_SCENE3_3 = new Sound('lucien_scene3.3.ogg')
const SND_MAIS_NON = new Sound('mais_non.ogg')
const SND_MECHE_ON_FIRE = new Sound('meche_on_fire.ogg')
const SND_MENU = new Sound('menu.ogg')
const SND_METEOR_THEME = new Sound('meteor_theme.ogg')
const SND_MF1_1ETFIN = new Sound('mf1_1etfin.ogg')
const SND_MUSIQUE_CHEMIN = new Sound('musique_chemin.ogg')
const SND_MUSIQUE_JARDIN_BONUS = new Sound('musique_jardin_bonus.ogg')
const SND_MUSIQUE_JARDIN = new Sound('musique_jardin.ogg')
const SND_MUSIQUE_TAVERNE = new Sound('musique_taverne.ogg')
const SND_MUSIQUE_VALALA = new Sound('musique_valala.ogg')
const SND_NIKTAMER = new Sound('niktamer.ogg')
const SND_NO_GOOD_PLS_NO = new Sound('no_good_pls_no.ogg')
const SND_ODIN1_1 = new Sound('Odin1.1.ogg')
const SND_ODIN1_2 = new Sound('Odin1.2.ogg')
const SND_ODIN1_3 = new Sound('Odin1.3.ogg')
const SND_ODIN1_4 = new Sound('Odin1.4.ogg')
const SND_ODIN1_5 = new Sound('Odin1.5.ogg')
const SND_ODIN1_6 = new Sound('Odin1.6.ogg')
const SND_ODIN1_7 = new Sound('Odin1.7.ogg')
const SND_ODIN1_8 = new Sound('Odin1.8.ogg')
const SND_ODIN1_9 = new Sound('Odin1.9.ogg')
const SND_PLUSDEPOUDRE = new Sound('plusdepoudre.ogg')
const SND_POTION_TOMBE = new Sound('potion_tombe.ogg')
const SND_PREVISIBLE = new Sound('previsible.ogg')
const SND_RELIGIEUX_SHOP = new Sound('religieux_shop.ogg')
const SND_RIEN = new Sound('rien.ogg')
const SND_RUINES = new Sound('ruines.ogg')
const SND_SG_1_10 = new Sound('sg_1.10.ogg')
const SND_SG_1_11 = new Sound('sg_1.11.ogg')
const SND_SG_1_12 = new Sound('sg_1.12.ogg')
const SND_SG_1_1 = new Sound('sg_1.1.ogg')
const SND_SG_1_2 = new Sound('sg_1.2.ogg')
const SND_SG_1_3 = new Sound('sg_1.3.ogg')
const SND_SG_1_4 = new Sound('sg_1.4.ogg')
const SND_SG_1_5 = new Sound('sg_1.5.ogg')
const SND_SG_1_6 = new Sound('sg_1.6.ogg')
const SND_SG_1_7 = new Sound('sg_1.7.ogg')
const SND_SG_1_8 = new Sound('sg_1.8.ogg')
const SND_SG_1_9 = new Sound('sg_1.9.ogg')
const SND_SINGED_NOT_RELIGIUS = new Sound('singed_not_religius.ogg')
const SND_SOUFFRANCE = new Sound('souffrance.ogg')
const SND_STRANGE_BUTCHERY = new Sound('strange_butchery.ogg')
const SND_TERROR_JP_COMING = new Sound('terror_jp_coming.ogg')
const SND_THE_SAYEN_STRUGGLE = new Sound('the_sayen_struggle.ogg')
const SND_TIENS_VOILA_TES_30_DOLLARDS = new Sound('tiens_voila_tes_30_dollards.ogg')
const SND_TINTIN_ULTIMATE_FOND_MONTAGE = new Sound('tintin_ultimate_fond_montage.ogg')
const SND_TINTIN_ULTIMATE_FOND = new Sound('tintin_ultimate_fond.ogg')
const SND_TITIN = new Sound('titin.ogg')
const SND_TONERE = new Sound('tonere.ogg')
const SND_TRANSFUSION_POWER = new Sound('transfusion_power.ogg')
const SND_URGO1_DETTE = new Sound('urgo1_dette.ogg')
const SND_URGO2 = new Sound('urgo2.ogg')
const SND_URGO3 = new Sound('urgo3.ogg')
const SND_URGO4 = new Sound('urgo4.ogg')
const SND_VIOLENT_OPEN_DOOR = new Sound('violent_open_door.ogg')

const CHAR_JP = new Char('Jean Plank', "#c8ffc8")
const CHAR_URGO = new Char('Urgo le Boucher du Bled', "#c8ffc8")
const CHAR_LUCIEN = new Char('Lucien le Magicien Marabout', "#c8ffc8")
const CHAR_SINGED = new Char('Saint Gède', "#c8ffc8")
const CHAR_MF = new Char ('Fomme', "#c8ffc8")
const CHAR_ODIN = new Char ('ODIN DIEU DES DIEUX', "#c8ffc8")


/* api constants */
const DIV_SCENE = $('<div id="scene">')
const DIV_CHAR_IMG = $('<div id="char_img">')
const DIV_CONTAINER = $('<a id="container">')
const DIV_MENU = $('<div id="menu">')
const DIV_CHOICES = $('<div id="choices">')
const DIV_FOOTER = $('<div id="footer">')
const DIV_CHAR_NAME = $('<div id="char_name">')
const DIV_TEXT = $('<div id="text">')


const STATE = {
    scene: null, // Image
    music: null, // Sound
    imgs: [], // Array<Image>
    char_name: null, // Char
    voices: [], // Array<Sound>
    potion: 0,
    censure: 0,
}


/* classes */
function Image(name) {
    this.name = name // String
    this.elt = null // $(DOM)
}

Image.prototype.load = function () {
    if (this.elt === null) {
        this.elt = $('<img>').attr('src', DOMAIN+'images/'+this.name)
    }
}


function Sound(name) {
    this.name = name // String
    this.elt = null // $(DOM)
}

Sound.prototype.load = function () {
    if (this.elt === null) {
        this.elt = $('<audio>').attr({
            'src': DOMAIN+'sounds/'+this.name,
            'preload': 'auto'
        })
    }
}


function Char(name, color) {
    this.name = name // String
    this.color = color // String
}


function Next(display, target) {
    this.display = display // String
    this.target = target // String
}


/* functions */
function scene(sc/*: Image*/) {
    if (STATE.scene !== sc) {
        DIV_SCENE.empty()
        DIV_CHAR_IMG.empty()
        if (sc.elt === null)
        throw new TypeError(sc.name+': sc.elt is null')
        DIV_SCENE.append(sc.elt)
        STATE.scene = sc
    }
}


function show(img/*: Image*/) {
    if (STATE.imgs.indexOf(img) === -1) {
        if (img.elt === null)
        throw new TypeError(img.name+': img.elt is null')
        DIV_CHAR_IMG.append(img.elt)
        STATE.imgs.push(img)
    }
}


function hide(img/*: Image*/) {
    var i = STATE.imgs.indexOf(img)
    if (i !== -1) {
        img.elt.detach()
        STATE.imgs.splice(i, 1)
    }
}


// plays Sound music in a loop
function play_music(music/*: Sound*/) {
    if (STATE.music !== music) {
        if (music.elt === null)
        throw new TypeError(music.name+': music.elt is null')
        if (STATE.music !== null) STATE.music.elt[0].pause()
        music.elt.prop('loop', true)
        music.elt[0].play()
        STATE.music = music
    }
}


// plays Sound sound one time
function play_sound(sound/*: Sound*/) {
    if (sound.elt === null)
    throw new TypeError(sound.name+': sound.elt is null')
    sound.elt.prop('loop', false)
    sound.elt[0].play()
}


function voice(voice/*: Sound*/) {
    play_sound(voice)
    STATE.voices.push(voice)
}


function char_says(char/*: Char*/, txt/*: String*/) {
    DIV_CHAR_NAME.css('color', char.color).text(char.name)
    text(txt)
}


function text(txt/*: String*/) { DIV_TEXT.html(txt) }


function load(/* *vars: any*/) {
    for (var i = 0; i < arguments.length; i++) {
        arguments[i].load()
    }
}


function set_nexts(nexts/*: Array<Next>*/) {
    if (nexts.length === 1) {
        DIV_CONTAINER.attr('data-passage', nexts[0].target)
    } else if (nexts.length > 1) {
        DIV_FOOTER.hide()
        for (var i = 0; i < nexts.length; i++) {
            DIV_CHOICES.append($('<a>')
            .attr('data-passage', nexts[i].target)
            .text(nexts[i].display))
        }
    }
}


/* overload of Snowman */
_.extend(Story.prototype, {
    show: function(idOrName, noHistory) {
        if (!window.passage.ended()) {
            window.passage.showNextText()
            return
        }

        var passage = this.passage(idOrName);

        if (!passage) {
            throw new Error('There is no passage with the ID or name "' + idOrName + '"')
        }

        this.$passageEl.trigger('hide.sm.passage', { passage: window.passage })

        this.$passageEl.trigger('show.sm.passage', { passage: passage })

        if (!noHistory) {
            this.history.push(passage.id)

            try {
                if (this.atCheckpoint) {
                    window.history.pushState({
                        state: this.state,
                        history: this.history,
                        checkpointName: this.checkpointName
                    }, '', '')

                    $.event.trigger('added.sn.checkpoint', { name: name })
                } else {
                    window.history.replaceState({
                        state: this.state,
                        history: this.history,
                        checkpointName: this.checkpointName
                    }, '', '')
                }
            } catch (e) {
                this.$el.trigger('fail.sm.checkpoint', { error: e })
            }
        }

        window.passage = passage
        this.atCheckpoint = false
        passage.render()

        this.$passageEl.trigger('shown.sm.passage', { passage: passage })
    }
})


_.extend(Passage.prototype, {
    ended: function() {
        return this.actions.length === 0
    },
    showNextText: function() {},
    render: function() {
        var nexts = []

        var result = _.template(_.unescape(this.source))()

        var i = 0
        var result = result.replace(/\[\[(.*?)\]\]/g, function(match, target) {
            var display = target

            /* display|target format */
            var barIndex = target.indexOf('|')

            if (barIndex != -1) {
                display = target.substr(0, barIndex)
                target = target.substr(barIndex + 1)
            } else {
                /* display->target format */
                var rightArrIndex = target.indexOf('->')

                if (rightArrIndex != -1) {
                    display = target.substr(0, rightArrIndex)
                    target = target.substr(rightArrIndex + 2)
                } else {
                    /* target<-display format */
                    var leftArrIndex = target.indexOf('<-')

                    if (leftArrIndex != -1) {
                        display = target.substr(leftArrIndex + 2)
                        target = target.substr(0, leftArrIndex)
                    }
                }
            }

            nexts.push(new Next(display, target))

            return ''
        })

        DIV_CONTAINER.removeAttr('data-passage')
        DIV_CHAR_NAME.empty()
        DIV_TEXT.empty()
        DIV_CHOICES.empty()
        DIV_FOOTER.show()

        for (var i = 0; i < STATE.voices.length; i++) {
            STATE.voices[i].elt[0].pause()
        }
        STATE.voices = []

        if (this.tags.indexOf('menu') === -1) {
            DIV_MENU.removeClass('menu')
        } else {
            DIV_MENU.addClass('menu')
        }

        eval(result)
        set_nexts(nexts)
    }
})


/* script */
$('body').append(
    DIV_SCENE,
    DIV_CHAR_IMG,
    DIV_CONTAINER.append(
        DIV_MENU.append(
            DIV_CHOICES
        ),
        DIV_FOOTER.append(
            DIV_CHAR_NAME,
            DIV_TEXT
        )
    )
)

/*
<div id="scene"></div>
<div id="char_img"></div>
<a id="container">
<div id="menu">
<div id="choices"></div>
</div>
<div id="footer">
<div id="char_name"></div>
<div id="text"></div>
</div>
</a>
*/
