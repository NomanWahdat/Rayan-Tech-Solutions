import { localizeText, localizeContent } from '../lib/localization'
import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Expand, Layers, X } from 'lucide-react'
import type { Project } from '../config/projects'
import ProjectImage from './ProjectImage'
import { useLanguage } from '../hooks/useLanguage'
import {
  availableProjectAssets,
  resolveProjectAsset,
} from '../lib/project-assets'

export default function ProjectGallery({ project }: { project: Project }) {
  const { isRTL } = useLanguage()
  const [active, setActive] = useState(-1)
  const [available, setAvailable] = useState<number[]>([])
  const [knownAssets, setKnownAssets] = useState<Set<string>>(new Set())
  const dialog = useRef<HTMLDialogElement>(null)
  const open = active >= 0
  useEffect(() => {
    let current = true
    void availableProjectAssets().then((files) => {
      if (current) setKnownAssets(files)
    })
    return () => {
      current = false
    }
  }, [project.slug])
  useEffect(() => {
    if (open) {
      dialog.current?.showModal()
      const previous = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        dialog.current?.close()
        document.body.style.overflow = previous
      }
    }
  }, [open])
  function navigate(direction: number) {
    const position = available.indexOf(active)
    setActive(
      available[(position + direction + available.length) % available.length]
    )
  }
  return (
    <>
      <div className="gallery-grid">
        {localizeContent(
          project.images.map((image, index) =>
            resolveProjectAsset(image.src, knownAssets) ? (
              <figure key={image.src}>
                <button
                  className="gallery-image-button"
                  disabled={!available.includes(index)}
                  aria-label={localizeText('Enlarge ' + image.caption)}
                  onClick={() => setActive(index)}
                >
                  <ProjectImage
                    src={image.src}
                    title={localizeText(project.title)}
                    category={project.category}
                    accent={project.accent}
                    caption={image.caption}
                    onReady={() =>
                      setAvailable((current) =>
                        current.includes(index)
                          ? current
                          : [...current, index].sort((a, b) => a - b)
                      )
                    }
                  />
                  {localizeContent(
                    available.includes(index) && (
                      <span className="gallery-expand">
                        <Expand size={18} />
                      </span>
                    )
                  )}
                </button>
                <figcaption>
                  {localizeContent(image.caption)}
                  {localizeContent(
                    !available.includes(index) && (
                      <span>{localizeText('Screenshot to be added')}</span>
                    )
                  )}
                </figcaption>
              </figure>
            ) : null
          )
        )}
      </div>
      {localizeContent(
        !project.images.some((image) =>
          resolveProjectAsset(image.src, knownAssets)
        ) && (
          <div className="gallery-unavailable">
            <Layers size={28} aria-hidden="true" />
            <div>
              <h3>{localizeText('Interface preview')}</h3>
              <p>
                {localizeText(
                  'Real interface screenshots are not currently available for public review. The cover artwork illustrates this project’s domain.'
                )}
              </p>
            </div>
          </div>
        )
      )}
      <dialog
        className="lightbox"
        ref={dialog}
        aria-label={localizeText(project.title + ' image gallery')}
        onClose={() => setActive(-1)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setActive(-1)
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight' && available.length > 1)
            navigate(isRTL ? -1 : 1)
          if (event.key === 'ArrowLeft' && available.length > 1)
            navigate(isRTL ? 1 : -1)
        }}
      >
        <div className="lightbox-content">
          <div className="lightbox-bar">
            <span>
              {localizeContent(project.title)} —{' '}
              {localizeContent(project.images[active]?.caption)}
            </span>
            <button
              aria-label={localizeText('Close image preview')}
              onClick={() => setActive(-1)}
              autoFocus
            >
              <X />
            </button>
          </div>
          {localizeContent(
            open && (
              <img
                src={resolveProjectAsset(
                  project.images[active].src,
                  knownAssets
                )}
                alt={localizeText(
                  project.title + ' — ' + project.images[active].caption
                )}
              />
            )
          )}
          <div className="lightbox-controls">
            <button
              aria-label={localizeText('Previous image')}
              disabled={available.length < 2}
              onClick={() => navigate(-1)}
            >
              <ChevronLeft />
            </button>
            <span>
              {localizeContent(available.indexOf(active) + 1)} /{' '}
              {localizeContent(available.length)}
            </span>
            <button
              aria-label={localizeText('Next image')}
              disabled={available.length < 2}
              onClick={() => navigate(1)}
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </dialog>
    </>
  )
}
