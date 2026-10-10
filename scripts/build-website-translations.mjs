import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
// Each authored row contains the English source, Afghan Dari, and Pashto.
const rows = ['website-translations.txt', 'project-translations.txt']
  .flatMap((file) => readFileSync('src/locales/' + file, 'utf8').split(/\r?\n/))
  .filter((row) => row && !row.startsWith('#'))
const dictionaries = { fa: {}, ps: {} }
for (const row of rows) {
  const [en, fa, ps, extra] = row.split('|')
  if (!en || !fa || !ps || extra)
    throw new Error('Invalid translation row: ' + row)
  if (dictionaries.fa[en] && dictionaries.fa[en] !== fa)
    throw new Error('Conflicting translation: ' + en)
  if (dictionaries.ps[en] && dictionaries.ps[en] !== ps)
    throw new Error('Conflicting Pashto translation: ' + en)
  dictionaries.fa[en] = fa
  dictionaries.ps[en] = ps
}
for (const language of ['fa', 'ps']) {
  mkdirSync('src/locales/' + language, { recursive: true })
  writeFileSync(
    'src/locales/' + language + '/website.json',
    JSON.stringify(dictionaries[language], null, 2) + '\n'
  )
}
console.log(
  'Compiled ' +
    Object.keys(dictionaries.fa).length +
    ' website translations per language.'
)
