import {ErrorOutlineIcon} from '@sanity/icons'

export default {
  name: 'allergen',
  title: 'Allergeni',
  type: 'document',
  icon: ErrorOutlineIcon,
  fields: [
    {
      name: "title",
      title: "Titolo",
      type: "localeString",
    },
    {
      name: "number",
      title: "Numero",
      type: "number",
    },
    {
      name: "description",
      title: "Descrizione",
      type: "localeText",
    },
  ],
  preview: {
    select: {
      title: 'title.it',
    },
  }
}