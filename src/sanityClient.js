import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'hvxcwgu7',
  dataset: 'production',
  apiVersion: '2026-06-03',
  useCdn: true,
})