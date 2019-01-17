$(() => {
    const $sitemap = $('<div>').attr('id', 'sitemap');
    const $timesections = $('#main-container>div');
    const $parallax = $('#parallax');

    const scrollToTimesection = (i) => {
        const val = $timesections.eq(i).offset().top
            - $parallax.offset().top + $parallax.scrollTop();
        $parallax.animate({ scrollTop: val });
    };

    $timesections.each((i) => {
        let $anchor = $('<div>').attr('anchorId', i)
            .append(
                $('<div>')
                    .addClass('barrel')
                    .click(() => scrollToTimesection(i))
            );
        if (i === 0) $anchor.addClass('current');
        $sitemap.append($anchor);
    });

    $('body').append($sitemap);
    $parallax.scroll(() => {
        let lastTop = { top: 0, $elt: $timesections.first() };
        $timesections.each((_i, elt) => {
            const $elt = $(elt);
            const top = $elt.offset().top;
            if (top >= 0) {
                let $max;
                if (top < -lastTop.top) $max = $elt;
                else $max = lastTop.$elt;
                $('#sitemap .current').removeClass('current');
                $('#sitemap>div').eq($max.index()).addClass('current');
                return false;
            }
            lastTop.top = top;
            lastTop.$elt = $elt;
        })
    });

    // widescreen
    $('.arrow-down').each((_i, arrow) => {
        const $arrow = $(arrow);
        const $timesection = $arrow.closest('#main-container>div');
        const i = $timesection.index() + 1;
        $arrow.click(() => scrollToTimesection(i));
    });

    // smallscreen
    const $gameContainers = $('.game-container');

    const scrollToGameContainer = (i) => {
        const val = $gameContainers.eq(i).offset().top
            - $parallax.offset().top + $parallax.scrollTop();
        $parallax.animate({ scrollTop: val });
    };

    const smallscreenScroll = (selector, modifier) => {
        $(selector).each((_i, arrow) => {
            const $arrow = $(arrow);
            const $gameContainer = $arrow.closest('.game-container');
            const i = $gameContainers.index($gameContainer) + modifier;
            if (i === 0) {
                $arrow.click(() => scrollToTimesection(0));
            } else {
                $arrow.click(() => scrollToGameContainer(i));
            }
        });
    }

    smallscreenScroll('.arrow-down-smallscreen', 1);
    smallscreenScroll('.arrow-up-smallscreen', -1);
});
