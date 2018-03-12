# Jean Plank II - Jean Plank II - Naissance des Flammes de la Vengeance
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
```


clic:
    texts left ?
        show next text
    else:
        show next passage
