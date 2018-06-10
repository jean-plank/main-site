// make the barrel explode
function explode($elt) {
    console.log('$elt =', $elt);
}

$(() => {
    const $sitemap = $('<div>').attr('id', 'sitemap');
    const $timesections = $('#main-container>div');
    const $parallax = $('#parallax');

    $timesections.each((i) => {
        let $anchor = $('<div>')
            .append($('<img>').attr('src', 'main/img/barrel.png'))
            .click((e) => {
                const $target = $(e.target);
                const val = $timesections.eq($target.index()).offset().top
                    - $parallax.offset().top + $parallax.scrollTop();
                $parallax.animate({ scrollTop: val });
            });
        if (i === 0) $anchor.addClass('current');
        $sitemap.append($anchor);
    });

    $('body').append($sitemap);
    $parallax.scroll(() => {
        let lastTop = { top: 0, $elt: $timesections.first() };
        $timesections.each((i, elt) => {
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
});
