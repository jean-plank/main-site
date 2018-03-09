# Jean Plank I - The story
Using format `Snowman`.


## Templating
The templates aren't `Snowman`'s basics anymore (html, md) but directly js with `[[display1->target1]]` (and other `[[link]]`) tags are replaced with `''` and `set_nexts` is called once with all links as parameter.

Interface :
```js
    show_scene(scene: Image)
    play_music(music: Sound)
    show_char(char: Image)
    hide_char(char: Char)
    play_sound(sound: Sound)
    char_says(char: Char, text: String)
    set_text(text: String)
    set_nexts(nexts: Array<Next>)
    load_ress(*vars: any) // each parameter passed must implement .load()
    const IMG_MENU
    const IMG_MARKET1
    const IMG_MARKET2
    const IMG_ENTREPOT
    const IMG_CHAMBRE
    const IMG_FIN
    const IMG_MF
    const IMG_GP2
    const IMG_GP1
    const IMG_GP3
    const IMG_HENTAI
    const IMG_DEALER
    const IMG_VORANGE
    const SND_JEVEUX
    const SND_JOUI
    const SND_JUTEUX
    const SND_MAIN_THEME
    const SND_ORANGE
    const SND_PAN
    const SND_PIRATE
    const SND_PLUSDEPOUDRE
    const SND_THEME_GP
    const SND_TOUTLEMONDE
    const SND_UNCOUP
    const CHAR_J
    const CHAR_MF
    const CHAR_V
    const CHAR_D
```
