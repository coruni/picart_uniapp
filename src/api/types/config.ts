import type { ConfigPublicUsingGetResponse } from '@/service'

export type PublicConfig = Awaited<ConfigPublicUsingGetResponse>['data']
