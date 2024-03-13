import siteSettings from './siteSettings'
import homepage from './homepage'
import menu from './menu'
import dish from './dish'
import allergen from './allergen'

const localeString = {
    name: "localeString",
    type: "object",
    fields: [
      {
        title: "Italiano",
        name: "it",
        type: "string",
      },
      {
        title: "Inglese",
        name: "en",
        type: "string",
      }
    ],
}

const localeText = {
  name: "localeText",
  type: "object",
  fields: [
    {
      title: "Italiano",
      name: "it",
      type: "text",
      rows: 3,
    },
    {
      title: "Inglese",
      name: "en",
      type: "text",
      rows: 3,
    }
  ],
}

export const schemaTypes = [
  siteSettings,
  homepage,
  menu,
  allergen,
  dish,
  localeString,
  localeText,
]