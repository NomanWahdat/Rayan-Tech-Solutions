import { localizeText, localizeContent } from '../lib/localization'
import { Code2, Layers, PenTool, Server } from 'lucide-react'
import office from '../assets/rayan-workspace.webp'

const visuals = {
  engineering: {
    src: '/images/editorial/engineering-workbench.webp',
    alt: 'Illustrative engineering workspace with a laptop, notebook, and blue ceramic cup',
    label: 'From requirements to working software',
    detail: 'Plan carefully. Build deliberately.',
    Icon: Code2,
  },
  design: {
    src: '/images/editorial/interface-design.webp',
    alt: 'Illustrative product design desk with interface sketches and a mobile device',
    label: 'Designed around real workflows',
    detail: 'Useful interfaces. Connected experiences.',
    Icon: PenTool,
  },
  infrastructure: {
    src: '/images/editorial/infrastructure.webp',
    alt: 'Illustrative server infrastructure with organized equipment and network cables',
    label: 'A foundation that can evolve',
    detail: 'Architecture. Data. Deployment.',
    Icon: Server,
  },
  company: {
    src: office,
    alt: 'Rayan branded workspace illustration supplied by the company',
    label: 'Business thinking meets engineering',
    detail: 'Based in Kabul. Building for what’s next.',
    Icon: Layers,
  },
}
export type EditorialVisualKind = keyof typeof visuals
export default function EditorialVisual({
  kind,
  compact = false,
}: {
  kind: EditorialVisualKind
  compact?: boolean
}) {
  const { src, alt, label, detail, Icon } = visuals[kind]
  return (
    <figure
      className={
        'editorial-visual visual-' + kind + (compact ? ' visual-compact' : '')
      }
    >
      <div className="image-sculpture">
        <span className="sculpture-accent" aria-hidden="true" />
        <span className="sculpture-outline" aria-hidden="true" />
        <div className="editorial-image-frame">
          <img
            src={src}
            alt={localizeText(alt)}
            width="1200"
            height="800"
            loading="lazy"
            decoding="async"
          />
        </div>
        <span className="image-corner" aria-hidden="true">
          <Icon size={26} strokeWidth={1.4} />
        </span>
      </div>
      <figcaption>
        <span className="editorial-caption-icon" aria-hidden="true">
          <Icon size={23} strokeWidth={1.6} />
        </span>
        <span>
          <strong>{localizeContent(label)}</strong>
          <small>{localizeContent(detail)}</small>
        </span>
      </figcaption>
    </figure>
  )
}
