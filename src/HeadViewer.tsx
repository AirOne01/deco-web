import { SkinViewer, createOrbitControls, WalkingAnimation } from "headview3d";
import React from "react";

export const defaultProps = {
  walk: false,
  control: true
}

export type MinecraftHeadViewerProps = {
  skin: string
  width: number
  height: number
  walk: boolean
  control: boolean
} & typeof defaultProps

const MinecraftHeadViewer = ({
  skin,
  width,
  height,
  walk,
  control,
}: MinecraftHeadViewerProps) => {
  const canvas = React.useRef<HTMLCanvasElement>(null)

  React.useLayoutEffect(() => {
    const skinViewer = new SkinViewer({
      skin,
      width,
      height,
      alpha: true,
      zoom: 2.5,
      fov: 5,
      canvas: canvas.current as HTMLCanvasElement
    })

    // View control
    let viewerControl: any

    if (control) {
      viewerControl = createOrbitControls(skinViewer)
      viewerControl.enablePan = false
      viewerControl.enableZoom = false
      viewerControl.enableRotate = true
    }

    // Animations
    if (walk) {
      skinViewer.animations.add(WalkingAnimation)
    }

    return () => {
      if (control) {
        viewerControl.dispose()
      }

      skinViewer.dispose()
    }
  }, [skin, width, height, control, walk])

  return <canvas ref={canvas} />
}

MinecraftHeadViewer.defaultProps = defaultProps

export { MinecraftHeadViewer };
