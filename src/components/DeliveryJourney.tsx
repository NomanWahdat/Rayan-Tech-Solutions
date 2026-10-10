import { localizeText, localizeContent } from '../lib/localization'
import { useRef, useState } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import {
  ArrowDown,
  ArrowRight,
  Compass,
  PenTool,
  Code2,
  LifeBuoy,
} from 'lucide-react'

const stages = [
  {
    title: 'Strategy',
    Icon: Compass,
    headline: 'Start with a clear direction.',
    description:
      'Understand the workflow, define the priorities, and agree on what the software needs to achieve.',
    outcome: 'A shared brief and delivery plan',
  },
  {
    title: 'Design',
    Icon: PenTool,
    headline: 'Make the important things intuitive.',
    description:
      'Turn requirements into practical journeys, clear interfaces, and a design that works across devices.',
    outcome: 'Workflows and interfaces to review',
  },
  {
    title: 'Development',
    Icon: Code2,
    headline: 'Build a dependable foundation.',
    description:
      'Develop in reviewable stages, connect your data, and test the workflows before release.',
    outcome: 'Working software and a documented handover',
  },
  {
    title: 'Long-term support',
    Icon: LifeBuoy,
    headline: 'Keep the system moving forward.',
    description:
      'Plan maintenance, resolve issues, and make considered improvements as your business changes.',
    outcome: 'A plan for maintenance and improvements',
  },
]
export default function DeliveryJourney() {
  const { isRTL } = useLanguage()
  const [active, setActive] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const stage = stages[active]
  const Icon = stage.Icon
  return (
    <section
      className="delivery-journey"
      aria-label={localizeText('From the first idea to a working product')}
    >
      <div className="container delivery-layout">
        <div className="delivery-heading">
          <span className="eyebrow">{localizeText('FROM THE FIRST IDEA')}</span>
          <h2>
            {localizeText('To a working')}
            <br />
            <span> {localizeText(' product.')}</span>
          </h2>
          <a className="delivery-scroll" href="#selected-work">
            {localizeText('Explore our work ')}
            <ArrowDown size={17} />
          </a>
        </div>
        <div className="delivery-workspace">
          <div
            className="delivery-tabs"
            role="tablist"
            aria-label={localizeText('Delivery stages')}
          >
            {localizeContent(
              stages.map(({ title, Icon: StageIcon }, index) => (
                <button
                  key={title}
                  ref={(node) => {
                    tabs.current[index] = node
                  }}
                  id={'delivery-tab-' + index}
                  role="tab"
                  aria-selected={active === index}
                  aria-controls="delivery-panel"
                  tabIndex={active === index ? 0 : -1}
                  onClick={() => setActive(index)}
                  onKeyDown={(event) => {
                    let next = index
                    if (event.key === 'ArrowRight')
                      next =
                        (index + (isRTL ? stages.length - 1 : 1)) %
                        stages.length
                    else if (event.key === 'ArrowLeft')
                      next =
                        (index + (isRTL ? 1 : stages.length - 1)) %
                        stages.length
                    else if (event.key === 'Home') next = 0
                    else if (event.key === 'End') next = stages.length - 1
                    else return
                    event.preventDefault()
                    setActive(next)
                    tabs.current[next]?.focus()
                  }}
                >
                  <StageIcon size={21} strokeWidth={1.6} aria-hidden="true" />
                  <span>{localizeContent(title)}</span>
                  <span className="delivery-tab-track" aria-hidden="true" />
                </button>
              ))
            )}
          </div>
          <div
            className="delivery-panel"
            id="delivery-panel"
            role="tabpanel"
            tabIndex={0}
            aria-labelledby={'delivery-tab-' + active}
          >
            <div key={active} className="delivery-panel-content">
              <span className="delivery-large-icon" aria-hidden="true">
                <Icon size={36} strokeWidth={1.25} />
              </span>
              <div>
                <h3>{localizeContent(stage.headline)}</h3>
                <p>{localizeContent(stage.description)}</p>
                <span className="delivery-outcome">
                  <ArrowRight size={15} aria-hidden="true" />
                  {localizeContent(stage.outcome)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
