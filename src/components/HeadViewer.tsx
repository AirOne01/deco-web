import { SkinViewer, createOrbitControls } from "headview3d";
import React from "react";

export type MinecraftHeadViewerProps = {
  skin: string
  width: number
  height: number
}

const MinecraftHeadViewer = ({
  skin,
  width,
  height,
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
      canvas: canvas.current!
    })

    const viewerControl = createOrbitControls(skinViewer)
    viewerControl.enablePan = false
    viewerControl.enableZoom = false
    viewerControl.enableRotate = true

    return () => {
      viewerControl.dispose()

      skinViewer.dispose()
    }
  }, [skin, width, height])

  return <canvas ref={canvas} />
}

export { MinecraftHeadViewer };
