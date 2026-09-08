import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const document = readFileSync(new URL('../index.html', import.meta.url), 'utf8')
const entrypoint = readFileSync(new URL('../src/main.jsx', import.meta.url), 'utf8')
const app = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8')
const contract = JSON.parse(readFileSync(new URL('../fixed-type-contract.json', import.meta.url), 'utf8'))
const manifest = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))

test('the document mounts #app and leaves hashed asset names to the Hub Vite build', () => {
  assert.match(document, /<div[^>]*\bid\s*=\s*(?:"app"|'app')/)
  assert.match(document, /src="\/src\/main\.jsx"/)
  assert.doesNotMatch(document, /web\.app/)
})

test('the entry uses hash routing rather than a document-path SPA fallback', () => {
  assert.match(entrypoint, /HashRouter/)
  assert.match(app, /<Routes>/)
  assert.match(app, /path="\/about"/)
})

test('the contract declares Hub Vite and the lockfile-backed install has no production vite', () => {
  assert.equal(contract.typeDeclaration.builderProfile, 'frontend-js-vite/v1')
  assert.equal(contract.typeDeclaration.entryPointPath, 'src/main.jsx')
  assert.equal(manifest.dependencies?.vite, undefined)
  assert.equal(manifest.dependencies?.esbuild, undefined)
})
