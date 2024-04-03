import {OlistIcon} from '@sanity/icons'
import {ProjectsIcon} from '@sanity/icons'
import {CircleIcon} from '@sanity/icons'
import {BlockElementIcon} from '@sanity/icons'


export default {
  name: 'menu',
  type: 'document',
  icon: OlistIcon,
  fieldsets: [
    {
      name: 'fromTo',
      title: 'Visibilità',
      options: { columns: 2 },
    },
  ],
  fields: [
    {
      type: "localeString",
      name: "title",
      title: "Titolo"
    },
    {
      type: "date",
      name: "from",
      fieldset: "fromTo",
      title: "Da",
    },
    {
      type: "date",
      name: "to",
      fieldset: "fromTo",
      title: "a",
    },
    {
      type: "array",
      name: "menuContents",
      title: "Menu",
      of: [
        {
          name: "menuContent",
          type: "object",
          icon: BlockElementIcon,
          fields: [
            {
              name: 'meal',
              title: "Pasto",
              type: 'localeString',
            },
            {
              type: "array",
              name: "mealContent",
              title: "Portate",
              of: [
                {
                  name: "courses",
                  type: "object",
                  icon: ProjectsIcon,
                  fields: [
                    {
                      name: 'course',
                      title: "Portata",
                      type: 'localeString',
                    },
                    {
                      title: "Piatti",
                      name: "dishes",
                      type: "array",
                      of: [
                        {
                          name: "singleDish",
                          type: "object",
                          icon: CircleIcon,
                          fields: [
                            {
                              name: 'dishReference',
                              title: 'Piatto',
                              type: 'reference',
                              to: [{type: 'dish'}],
                            },
                          ],
                          preview: {
                            select: {
                              title: 'dishReference.title.it', // Accessing the localized title of the referenced dish
                            },
                          },
                        },
                      ],
                    },
                  ],
                  preview: {
                    select: {
                      title: 'course.it', // Accessing the localized title of the course
                    },
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'meal.it', // Accessing the localized title of the meal
            },
          },
        },
      ],
    }    
  ],
  preview: {
    select: {
      title: 'title.it',
      from: 'from',
      to: 'to',
    },
    prepare(selection) {
      const {title, from, to} = selection
      return {
        title: title,
        subtitle: `Dal: ${from ? from : '–'} al: ${to ? to : '–'}`
      }
    }
  }
}