import { localizeText, localizeContent } from '../lib/localization'
import { useState } from 'react'
import {
  Code2,
  Cloud,
  GitPullRequest,
  ShieldCheck,
  KeyRound,
  Network,
  FileText,
} from 'lucide-react'
import { technologyLogos } from '../config/technology-logos'

const capabilityIcons: Record<string, typeof Code2> = {
  'Cloud deployment': Cloud,
  'Release workflows': GitPullRequest,
  'JWT authentication': ShieldCheck,
  'OTP workflows': KeyRound,
  'REST APIs': Network,
  'REST API': Network,
  'API integration': Network,
  'File handling': FileText,
}

export default function TechnologyMark({
  name,
  showName = true,
}: {
  name: string
  showName?: boolean
}) {
  const [failed, setFailed] = useState(false)
  const file = technologyLogos[name]
  const CapabilityIcon = capabilityIcons[name] || Code2
  return (
    <span className="technology-mark">
      {localizeContent(
        file && !failed ? (
          <img
            src={'/images/technologies/' + file + '.svg'}
            width="32"
            height="32"
            alt={localizeText(showName ? '' : name)}
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
          />
        ) : (
          <CapabilityIcon size={23} aria-hidden="true" />
        )
      )}
      {localizeContent(showName && name)}
    </span>
  )
}
