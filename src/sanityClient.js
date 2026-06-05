import { createClient } from '@sanity/client'

const isPreview =
  new URLSearchParams(window.location.search).get('preview') === 'true'

export const client = createClient({
  projectId: 'hvxcwgu7',
  dataset: 'production',
  apiVersion: '2026-06-03',
  useCdn: !isPreview,
  perspective: isPreview ? 'drafts' : 'published',
})