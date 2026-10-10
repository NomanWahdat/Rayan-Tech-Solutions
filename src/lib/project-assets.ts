let request: Promise<Set<string>> | undefined

export function resolveProjectAsset(src: string, assets: Set<string>) {
  return [
    src,
    ...['png', 'jpg', 'jpeg'].map((ext) => src.replace(/\.webp$/, '.' + ext)),
  ].find((candidate) => assets.has(candidate))
}

export function availableProjectAssets() {
  if (!request) {
    request = fetch('/portfolio-assets.json', { cache: 'no-cache' })
      .then(async (response) => {
        if (!response.ok) return new Set<string>()
        const files: unknown = await response.json()
        return new Set<string>(
          Array.isArray(files)
            ? files.filter((file) => typeof file === 'string')
            : []
        )
      })
      .catch(() => new Set<string>())
  }
  return request
}
