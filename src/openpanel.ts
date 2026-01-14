import { OpenPanel } from '@openpanel/web'

export const op = new OpenPanel({
  apiUrl: 'https://openpanel.blkdog.dev',
  clientId: '368d49f1-4272-479e-ab82-c39efae48f0b',
  trackScreenViews: true,
  trackOutgoingLinks: true,
  trackAttributes: true,
})
