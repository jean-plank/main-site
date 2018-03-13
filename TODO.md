# General
- direct jump to chapters
- better image pre-loading
- fullscreen
- deselect selected text when rendering passage
- `fadeout` and `fadein`


**Passage**: whole passage. Can have 0, 1 or more blocks.  
**Block**: start at the beginning of passage or at the end of previous block; ends when a `"text"` statement is found (exception: last `"text"` block goes to the end).

```
[[choice1]]
[[choice2]]

renpy1 img1
"text1"

<% js1 %>

renpy2
renpy3

"text2"

<% js2 %>
renpy4 img2
""

<% js3 %>
```

should become (in Passage constructor) :

```js
var passage.actions = [
    function() {
        renpy('renpy1', img1);
        renpy('"text1"');
    },
    function() {
        eval('js1');
        renpy('renpy2');
        renpy('renpy3');
        renpy('"text2"');
        load(img2);
    },
    function() {
        eval('js2');
        renpy('renpy4', img2);
        renpy('""');
        eval('js3');
        set_nexts(['choice1', 'choice2']);
        load(/* ressources for 1st action of next passage(s) */)
    }
]
```



# Jean Plank I - The Story
- back to menu and restart button at the end


# Jean Plank II - Naissance des Flammes de la Vengeance
