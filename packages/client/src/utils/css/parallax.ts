import css, { SerializedStyles } from '@emotion/css'

const perspective = 300

export namespace parallax {
  export const container = css({
    perspective: `${perspective}px`,
    transformStyle: 'preserve-3d',
    height: '100vh',
    overflowY: 'auto',
    overflowX: 'hidden',
    scrollSnapType: 'y proximity',
    position: 'relative',
    scrollBehavior: 'smooth'
  })

  export const group = css({
    position: 'relative',
    height: '100vh',
    width: 0,
    transformStyle: 'preserve-3d',
    scrollSnapAlign: 'start'
  })

  export const layerFore = layer(150)
  export const layerBase = layer(0)
  export const layerBack = layer(-300)
  export const layerDeep = layer(-600)
}

function layer(translateZ: number): SerializedStyles {
  const scale = 1 - translateZ / perspective
  return css({
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100vh',
    width: '100%',
    transformOrigin: '50vw 50vh',
    transform: `translateZ(${translateZ}px) scale(${scale})`
  })
}
