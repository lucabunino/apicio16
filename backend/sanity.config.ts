import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {myStructure} from './deskStructure'
import {schemaTypes} from './schemaTypes'
import {media} from 'sanity-plugin-media'
import {inlineSvgInput} from '@focus-reactive/sanity-plugin-inline-svg-input'



export default defineConfig({
  name: 'default',
  title: 'apicio16',

  projectId: '56lqtkew',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: myStructure,
    }),
    visionTool(),
    media(),
    inlineSvgInput(),
  ],

  schema: {
    types: schemaTypes,
  },
})
