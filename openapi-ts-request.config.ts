import { defineConfig } from 'openapi-ts-request'

export default defineConfig([
  {
    describe: 'unibest-openapi-test',
    schemaPath: 'http://127.0.0.1:4523/export/openapi/2?version=3.0',
    serversPath: './src/service',
    requestLibPath: `import request from '@/http/vue-query';\n import { CustomRequestOptions_ } from '@/http/types';`,
    requestOptionsType: 'CustomRequestOptions_',
    isGenReactQuery: false,
    reactQueryMode: 'vue',
    isGenJavaScript: false,
  },
])
