import { OlistIcon } from '@sanity/icons';
import { TextIcon } from '@sanity/icons';

export default {
  name: 'homepage',
  type: 'document',
  fields: [
    {
      name: 'contents',
      type: 'array',
      of: [
        {
          name: "content",
          type: "object",
          fieldsets: [
            {
              name: 'media',
              options: { columns: 2 },
            },
          ],
          fields: [
            {
              type: "string",
              name: "kind",
              initialValue: 'media',
              options: {
                list: [
                  {title: 'Media', value: 'media'},
                  {title: 'Slider', value: 'slider'},
                  {title: 'Testo', value: 'text'},
                  {title: 'Menu', value: 'menu'}
                ]
              }
            },
            {
              title: 'Testo',
              name: 'text',
              type: 'localeText',
              hidden: ({parent}) => !(parent?.kind === 'text'),         
            },
            {
              name: 'menuTitle',
              title: 'Titolo del menu',
              type: 'localeString',
              hidden: ({parent}) => !(parent?.kind === 'menu'),
            },
            {
              name: 'menuContent',
              title: 'Contenuto del menu',
              type: 'object',
              hidden: ({parent}) => !(parent?.kind === 'menu'),
              fields: [
                {
                  title: 'Italiano',
                  name: 'it',
                  type: 'array',
                  of: [{
                    type: 'block',
                    styles: [
                      {title: 'Testo corrente', value: 'normal'},
                      {title: 'Titolo', value: 'h5'},
                      {title: 'Citazione', value: 'blockquote'},
                    ],
                  }]
                },
                {
                  title: 'Inglese',
                  name: 'en',
                  type: 'array',
                  of: [{
                    type: 'block',
                    styles: [
                      {title: 'Testo corrente', value: 'normal'},
                      {title: 'Titolo', value: 'h5'},
                      {title: 'Citazione', value: 'blockquote'},
                    ],
                  }]
                },
              ],
            },
            {
              name: 'sliderImages',
              title: 'Immagini Slider',
              type: 'array',
              hidden: ({parent}) => !(parent?.kind === 'slider'),
              of: [
                {
                  title: 'Immagine',
                  name: 'sliderImage',
                  type: "object",
                  fields: [
                    {
                      title: 'Immagine',
                      name: 'sliderImage',
                      type: 'image',
                    },
                    {
                      title: 'Didascalia',
                      name: 'sliderCaption',
                      type: 'localeString',
                    }
                  ],
                  preview: {
                    select: {
                      title: 'sliderImage.asset.url',
                      media: 'sliderImage',
                    },
                    prepare(selection) {
                      const { title, media } = selection;
                      return {
                        title: title,
                        media: media,
                      };
                    }
                  },
                }
              ],
            },
            {
              title: 'Immagine',
              name: 'image',
              type: 'image',
              fieldset: 'media',
              hidden: ({parent}) => !(parent?.kind === 'media' || parent?.kind === 'slider'),
            },
            {
              title: 'Immagine Mobile',
              name: 'imageMobile',
              type: 'image',
              fieldset: 'media',
              hidden: ({parent}) => !(parent?.kind === 'media'),
            },
            {
              name: 'video',
              type: 'file',
              fieldset: 'media',
              hidden: ({parent}) => !(parent?.kind === 'media' || parent?.kind === 'slider'),
            },
          ],
          preview: {
            select: {
              title: 'kind',
              media: 'image',
            },
            prepare(selection) {
              const { title, media } = selection;
              let icon;
              if (title === 'text') {
                icon = TextIcon;
              } else {
                icon = OlistIcon;
              }
              return {
                title: title ? title.charAt(0).toUpperCase() + title.slice(1) : 'Untitled',
                media: media,
                icon: icon,
              };
            }
          },
        }
      ],
    }
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      const {title} = selection
      return {
        title: 'Homepage'
      }
    }
  }
}
