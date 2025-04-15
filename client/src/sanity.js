import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'flajebcz',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-10-01', // Stable and safe version
  token: 'skWmehmZzwLPDgysLHFQTQHLZXPG8RvXq1HLUqxaW5vq9dhBk6O9iPOWyc4qvgVGxbQct9fS8YQXuEB0ckOxC3kMyRFRauF3fzfnI40UHbnZhS2JfeZsPUpQeHTDmWXQM8tmSREZTabnPgPfBLy21DF7ZsBYm497EdwAmb09BaQpZXSWfmcO'
});
