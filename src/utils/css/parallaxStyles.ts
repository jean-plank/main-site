import css, { SerializedStyles } from '@emotion/css'

const perspective = 300

const parallaxStyles = {
    parallax: css({
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d',
        height: '100vh',
        overflowY: 'auto',
        overflowX: 'hidden',
        scrollSnapType: 'y proximity',
        position: 'relative',
        scrollBehavior: 'smooth'
    }),
    parallaxGroup: css({
        position: 'relative',
        height: '100vh',
        width: 0,
        transformStyle: 'preserve-3d',
        scrollSnapAlign: 'start'
    }),
    parallaxLayerFore: parallaxLayer(150),
    parallaxLayerBase: parallaxLayer(0),
    parallaxLayerBack: parallaxLayer(-300),
    parallaxLayerDeep: parallaxLayer(-600)
}

function parallaxLayer(translateZ: number): SerializedStyles {
    const scale = 1 - translateZ / perspective
    return css({
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100vh',
        width: 0,
        transformOrigin: '50vw 50vh',
        transform: `translateZ(${translateZ}px) scale(${scale})`
    })
}

export default parallaxStyles
