/* user constants */
// const DOMAIN = "http://jp1.blbl.ch/"
const DOMAIN = "http://localhost:8675/"

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

const SND_JEVEUX = new Sound("jeveux.ogg")
const SND_JOUI = new Sound("joui.ogg")
const SND_JUTEUX = new Sound("juteux.ogg")
const SND_MAIN_THEME = new Sound("main_theme.ogg")
const SND_ORANGE = new Sound("orange.ogg")
const SND_PAN = new Sound("pan.mp3")
const SND_PIRATE = new Sound("pirate.mp3")
const SND_PLUSDEPOUDRE = new Sound("plusdepoudre.ogg")
const SND_THEME_GP = new Sound("theme_gp.ogg")
const SND_TOUTLEMONDE = new Sound("toutlemonde.ogg")
const SND_UNCOUP = new Sound("uncoup.ogg")

const CHAR_J = new Char('Jean Plank', "#fefefe")
const CHAR_MF = new Char('Miss Fourtune', "#d671a9")
const CHAR_V = new Char('La Vendeuse', "#d671a9")
const CHAR_D = new Char('Dealer', "#d671a9")


/* api constants */
const DIV_SCENE = $('<div id="scene">')
const DIV_CHAR_IMG = $('<div id="char_img">')
const DIV_CONTAINER = $('<a id="container">')
const DIV_CHAR_NAME = $('<div id="char_name">')
const DIV_TEXT = $('<div id="text">')
const DIV_CHOICES = $('<div id="choices">')


const STATE = {
    scene: null, // Image
    music: null, // Sound
    imgs: [], // Array<Image>
    char_name: null, // Char
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


function char_says(char/*: Char*/, txt/*: String*/) {
    DIV_CHAR_NAME.css('color', char.color).text(char.name)
    text(txt)
}


function text(txt/*: String*/) { DIV_TEXT.html(txt) }


function set_nexts(nexts/*: Array<Next>*/) {
    if (nexts.length === 1) {
        DIV_CONTAINER.attr('data-passage', nexts[0].target)
    } else {
        for (var i = 0; i < nexts.length; i++) {
            DIV_CHOICES.append($('<a>')
                .attr('data-passage', nexts[i].target)
                .text(nexts[i].display))
        }
    }
}


function load(/* *vars: any*/) {
    for (var i = 0; i < arguments.length; i++) {
        arguments[i].load()
    }
}


/* overload of Snowman */
function my_render(source) {
    var nexts = []

    var result = _.template(source)()

    var i = 0
    var result = result.replace(/\[\[(.*?)\]\]/g, function (match, target) {
        var display = target

        /* display|target format */
        var barIndex = target.indexOf('|')

        if (barIndex !== -1) {
            display = target.substr(0, barIndex)
            target = target.substr(barIndex + 1);
        } else {
            /* display->target format */
            var rightArrIndex = target.indexOf('->')

            if (rightArrIndex !== -1) {
                display = target.substr(0, rightArrIndex)
                target = target.substr(rightArrIndex + 2)
            } else {
                /* target<-display format */
                var leftArrIndex = target.indexOf('<-')

                if (leftArrIndex !== -1) {
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

    eval(result)
    set_nexts(nexts)

    return ''
}

_.extend(Passage.prototype, {
    render: function () { return my_render(_.unescape(this.source)) }
})


/* script */
$('body')
    .append(DIV_SCENE)
    .append(DIV_CHAR_IMG)
    .append(
        DIV_CONTAINER.append(
            $('<div id="footer">').append(
                $('<div id="dialog">').append(
                    DIV_CHAR_NAME,
                    DIV_TEXT
                ),
                DIV_CHOICES
            )
        )
    )

/*
    <div id="scene"></div>
    <div id="char_img"></div>
    <a id="container">
        <div id="footer">
            <div id="dialog">
                <div id="char_name"></div>
                <div id="text"></div>
            </div>
            <div id="choices"></div>
        </div>
    </a>
*/
