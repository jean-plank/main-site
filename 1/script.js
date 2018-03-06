/* constants */
const CONSTS = {}
const FUNCTIONS = {}

CONSTS.DOMAIN = "http://jp1.blbl.ch/"

CONSTS.IMG_MENU = new Image("jpthestory.jpg")
CONSTS.IMG_MARKET1 = new Image("market1.jpg")
CONSTS.IMG_MARKET2 = new Image("market2.jpg")
CONSTS.IMG_ENTREPOT = new Image("entrepot.jpg")
CONSTS.IMG_CHAMBRE = new Image("chambre.jpg")
CONSTS.IMG_FIN = new Image("fin.jpg")
CONSTS.IMG_MF = new Image("mf.png")
CONSTS.IMG_GP2 = new Image("gp_posey.png")
CONSTS.IMG_GP1 = new Image("gp1.png")
CONSTS.IMG_GP3 = new Image("Gp_interogatoire.png")
CONSTS.IMG_HENTAI = new Image("mfhentai.png")
CONSTS.IMG_DEALER = new Image("dealer.png")
CONSTS.IMG_VORANGE = new Image("vendeuse_orange.png")

CONSTS.SND_JEVEUX = new Sound("jeveux.ogg")
CONSTS.SND_JOUI = new Sound("joui.ogg")
CONSTS.SND_JUTEUX = new Sound("juteux.ogg")
CONSTS.SND_MAIN_THEME = new Sound("main_theme.ogg")
CONSTS.SND_ORANGE = new Sound("orange.ogg")
CONSTS.SND_PAN = new Sound("pan.mp3")
CONSTS.SND_PIRATE = new Sound("pirate.mp3")
CONSTS.SND_PLUSDEPOUDRE = new Sound("plusdepoudre.ogg")
CONSTS.SND_THEME_GP = new Sound("theme_gp.ogg")
CONSTS.SND_TOUTLEMONDE = new Sound("toutlemonde.ogg")
CONSTS.SND_UNCOUP = new Sound("uncoup.ogg")

CONSTS.CHAR_J = { name: 'Jean Plank', color: "#FEFEFE" }
CONSTS.CHAR_MF = { name: 'Miss Fourtune', color: "#d671a9" }
CONSTS.CHAR_V = { name: 'La Vendeuse', color: "#d671a9" }
CONSTS.CHAR_D = { name: 'Dealer', color: "#d671a9" }


const DIV_SCENE = $('<div id="scene">')
const DIV_CHAR_IMG = $('<div id="char_img">')


/* classes */
function Image(name) {
    this.name = name
    this.elt = null
}

Image.prototype.load = function() {
    if (this.elt === null)
        this.elt = $('<img>')
            .attr('src', CONSTS.DOMAIN+'images/'+this.name)
}


function Sound(name) {
    this.name = name
    this.elt = null
}

Sound.prototype.load = function() {
    if (this.elt === null)
        this.elt = $('<audio>')
            .attr({
                'src': CONSTS.DOMAIN+'sounds/'+this.name,
                'preload': 'auto'
            })
}


/* functions */
// img, valid image { name: ..., elt: ... }
// hide current scene and show img as new one
FUNCTIONS.show_scene = function(img) {
    DIV_SCENE.empty()
    img.load()
    DIV_SCENE.append(img.elt)
}


// show image as character
FUNCTIONS.show_char = function(img) {
    // DIV_CHAR_IMG.empty()
    img.load()
    DIV_CHAR_IMG.append(img.elt)
}


FUNCTIONS.hide_char = function(img) {
    DIV_CHAR_IMG.removeChild(img.elt)
}


FUNCTIONS.play_music = function(sound) {
    sound.load()
    sound.elt.prop('loop', true)
    sound.elt[0].play()
}

FUNCTIONS.stop_music = function(sound) {
    sound.elt[0].pause()
}


FUNCTIONS.play_sound = function(sound) {
    sound.load()
    sound.elt.prop('loop', false)
    sound.elt[0].play()
}


// removes current text and sets text as new one
FUNCTIONS.show_text = function(text) {
    CONSTS.DIV_TEXT.text(text)
}


// char, valid character { name: ..., color: ... }
FUNCTIONS.get_div_char_name = function(char) {
    return '<div id="char_name" style="color:'+char.color+';">'
        + char.name + '</div>'
}


/* script */
window.story.state.c = CONSTS
window.story.state.f = FUNCTIONS

$('body')
    .prepend(DIV_CHAR_IMG)
    .prepend(DIV_SCENE)
