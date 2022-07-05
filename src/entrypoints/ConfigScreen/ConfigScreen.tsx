import { RenderConfigScreenCtx } from 'datocms-plugin-sdk'
import { Canvas } from 'datocms-react-ui'

type Props = {
  ctx: RenderConfigScreenCtx
}

export default function ConfigScreen({ ctx }: Props) {
  return (
    <Canvas ctx={ctx}>
      <p>
        This plugin extends the DatoCMS SEO meta field. This plugin allows users
        to see a preview of different sources generated from{' '}
        <a
          href="https://github.com/voorhoede/heads-up"
          target="_blank"
          rel="noreferrer noopener"
        >
          Heads Up
        </a>
      </p>
    </Canvas>
  )
}
