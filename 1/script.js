/* constants */
const DOMAIN = "http://jp1.blbl.ch/"

const IMG_MENU = new Image("jpthestory.jpg")
const IMG_MARKET1 = new Image("market1.jpg")
const IMG_MARKET2 = new Image("market2.jpg")
const IMG_ENTREPOT = new Image("entrepot.jpg")
const IMG_CHAMBRE = new Image("chambre.jpg")
const IMG_FIN = new Image("fin.jpg")
const IMG_MF = new Image("mf.png")
const IMG_GP2 = new Image("gp_posey.png")
const IMG_GP1 = new Image("gp1.png")
const IMG_GP3 = new Image("Gp_interogatoire.png")
const IMG_HENTAI = new Image("mfhentai.png")
const IMG_DEALER = new Image("dealer.png")
const IMG_VORANGE = new Image("vendeuse_orange.png")

const CHAR_J = { name: 'Jean Plank', color: "#FEFEFE" }
const CHAR_MF = { name: 'Miss Fourtune', color: "#d671a9" }
const CHAR_V = { name: 'La Vendeuse', color: "#d671a9" }
const CHAR_D = { name: 'Dealer', color: "#d671a9" }

const DIV_TEXT = document.getElementById('text')
const DIV_CHAR_NAME = document.getElementById('char_name')
const DIV_SCENE = document.createElement('div')
DIV_SCENE.id = 'scene'
const DIV_CHAR_IMG = document.createElement('div')
DIV_CHAR_IMG.id = 'char_img'

const DIV_STORY = document.getElementById('passage')
prepend(DIV_CHAR_IMG, DIV_STORY)
prepend(DIV_SCENE, DIV_STORY)


/* classes */
function Image(name) {
    this.name = name
    this.elt = null
}

Image.prototype.load = function() {
    if (this.elt === null) {
        this.elt = document.createElement('img')
        this.elt.src = DOMAIN+'images/'+this.name
    }
}


function Sound(name) {
    this.name = name
    this.elt = null
}

Sound.prototype.load = function() {
    if (this.elt === null) {
        // this.elt = document.createElement('img')
        // this.elt.src = DOMAIN+'sound/'+image.name
    }
}


/* functions */
// empties dom element elt
function empty(elt) {
    while (elt.firstChild) elt.removeChild(elt.firstChild)
}


function prepend(child, parent) {
    parent.insertBefore(child, parent.firstChild)
}


// img, valid image { name: ..., elt: ... }
// hide current scene and show img as new one
function show_scene(img) {
    empty(DIV_SCENE)
    img.load()
    DIV_SCENE.append(img.elt)
}


// show image as character
function show_char(img) {
    // empty(DIV_CHAR_IMG)
    img.load()
    DIV_CHAR_IMG.append(img.elt)
}


function hide_char(img) {
    DIV_CHAR_IMG.removeChild(img.elt)
}


function play_music(music) {
    // TODO
}


// removes current text and sets text as new one
function text(text) {
    DIV_TEXT.textContent = text;
}


// char, valid character { name: ..., color: ... }
function say(char, txt) {
    DIV_CHAR_NAME.textContent = char.name
    DIV_CHAR_NAME.style.color = char.color
    text(txt)
}
