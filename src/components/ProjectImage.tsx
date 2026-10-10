import { localizeText, localizeContent } from '../lib/localization'
import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Layers } from 'lucide-react'
import {
  availableProjectAssets,
  resolveProjectAsset,
} from '../lib/project-assets'
import { industryIcon } from '../config/design-icons'

export default function ProjectImage({
  src,
  title,
  category,
  accent = 'peach',
  caption,
  onReady,
  priority = false,
  fallbackSrc,
  fallbackLabel = 'Project illustration',
}: {
  src: string
  title: string
  category: string
  accent?: string
  caption?: string
  onReady?: () => void
  priority?: boolean
  fallbackSrc?: string
  fallbackLabel?: string
}) {
  const [loaded, setLoaded] = useState(false)
  const [resolvedSrc, setResolvedSrc] = useState(src)
  const [failed, setFailed] = useState(false)
  const [illustrationFailed, setIllustrationFailed] = useState(false)
  const CoverIcon = industryIcon(title + ' ' + category)
  const ready = useRef(onReady)
  ready.current = onReady
  // One shared manifest prevents missing screenshot requests entirely.
  useEffect(() => {
    let active = true
    setLoaded(false)
    setFailed(false)
    setIllustrationFailed(false)
    async function check() {
      try {
        const available = resolveProjectAsset(
          src,
          await availableProjectAssets()
        )
        if (active) {
          if (available) {
            setResolvedSrc(available)
            setLoaded(true)
            ready.current?.()
          } else setFailed(true)
        }
      } catch {
        if (active) setFailed(true)
      }
    }
    void check()
    return () => {
      active = false
    }
  }, [src])
  return (
    <div
      className={
        'project-image accent-' +
        accent +
        (loaded && !failed
          ? ' has-screenshot'
          : fallbackSrc && !illustrationFailed
            ? ' has-illustration'
            : '')
      }
    >
      {localizeContent(
        loaded && !failed ? (
          <img
            src={resolvedSrc}
            alt={localizeText(title + ' — ' + (caption || 'project interface'))}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            onError={() => {
              setFailed(true)
              setLoaded(false)
            }}
          />
        ) : fallbackSrc && !illustrationFailed ? (
          <>
            <img
              className="project-illustration"
              src={fallbackSrc}
              alt={localizeText(
                title +
                  ' — related software illustration, not a project screenshot'
              )}
              loading={priority ? 'eager' : 'lazy'}
              decoding="async"
              onError={() => setIllustrationFailed(true)}
            />
            <span className="project-image-label">
              {localizeContent(fallbackLabel)}
            </span>
          </>
        ) : (
          <div className="project-cover">
            <span className="cover-category">
              <Layers size={14} />
              {localizeContent(category)}
            </span>
            <div className="cover-symbol" aria-hidden="true">
              <span className="cover-icon-disc">
                <CoverIcon size={68} strokeWidth={1} />
              </span>
              <span className="cover-connector" />
              <span className="cover-node">
                <Layers size={24} strokeWidth={1.2} />
              </span>
            </div>
            <div className="cover-title">
              {localizeContent(title)}
              <ArrowUpRight size={26} />
            </div>
            <span className="cover-caption">
              {localizeContent(caption || 'Interface preview')}{' '}
              {localizeText(' · Screenshot to be added')}
            </span>
          </div>
        )
      )}
    </div>
  )
}
