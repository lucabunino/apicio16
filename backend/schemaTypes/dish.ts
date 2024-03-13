import {CircleIcon} from '@sanity/icons'

export default {
  name: 'dish',
  title: 'Piatti',
  type: 'document',
  icon: CircleIcon,
  fields: [
    {
      title: "Title",
      name: "title",
      type: "localeString",
    },
    {
      name: "description",
      title: "Descrizione",
      type: "localeText",
    },
    {
      type: "number",
      name: "price",
      title: "Prezzo",
    },
    {
      name: "allergens",
      title: "Allergeni",
      type: 'array',
      of: [
        {
          name: "allergen",
          title: "Allergene",
          type: 'reference',
          to: [{
            type: 'allergen'
          }],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title.it',
    },
  }
}