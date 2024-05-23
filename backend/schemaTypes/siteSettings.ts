export default {
  name: 'siteSettings',
  title: 'Impostazioni del sito',
  type: 'document',
  fieldsets: [
    {
      name: 'contacts',
      title: 'Contatti',
      options: { columns: 2 },
    },
    {
      name: 'media',
      options: { columns: 2 },
    },
  ],
  groups: [
    {name: 'Homepage'},
    {name: 'Policy'},
    {name: 'SEO'},
  ],
  fields: [
    {
      name: 'title',
      title: 'Titolo',
      type: 'string',
      group: 'SEO'
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'inlineSvg',
      group: 'Homepage'
    },
    {
      name: 'maps',
      title: 'Indirizzo',
      type: 'string',
      fieldset: 'contacts',
      group: 'Homepage'
    },
    {
      name: 'mapsLink',
      title: 'Link Google Maps',
      type: 'url',
      fieldset: 'contacts',
      group: 'Homepage',
      validation: Rule => Rule.uri({
        scheme: ['https'],
      })
    },
    {
      name: 'instagramLink',
      title: 'Link Instagram',
      type: 'string',
      fieldset: 'contacts',
      group: 'Homepage'
    },
    {
      name: 'facebookLink',
      title: 'Link Facebook',
      type: 'url',
      fieldset: 'contacts',
      group: 'Homepage',
      validation: Rule => Rule.uri({
        scheme: ['https'],
      })
    },
    {
      name: 'mail',
      title: 'Email',
      type: 'string',
      fieldset: 'contacts',
      group: 'Homepage'
    },
    {
      name: 'phone',
      title: 'Numero di telefono',
      type: 'string',
      fieldset: 'contacts',
      group: 'Homepage'
    },
    {
      name: 'footerImage',
      title: 'Immagine footer',
      type: 'image',
      fieldset: 'media',
      group: 'Homepage'
    },
    {
      name: 'footerImageMobile',
      title: 'Immagine footer mobile',
      type: 'image',
      fieldset: 'media',
      group: 'Homepage'
    },
    {
      name: 'cookiePolicy',
      type: 'object',
      group: 'Policy',
      fields: [
        {
          title: 'Italiano',
          name: 'it',
          type: 'array',
          of: [{
            type: 'block',
            styles: [
              {title: 'Testo corrente', value: 'normal'},
              {title: 'Titolo', value: 'h1'},
              {title: 'Sottotitolo', value: 'h2'},
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
              {title: 'Titolo', value: 'h1'},
              {title: 'Sottotitolo', value: 'h2'},
            ],
          }]
        },
      ],
    },
    {
      name: 'privacyPolicy',
      type: 'object',
      group: 'Policy',
      fields: [
        {
          title: 'Italiano',
          name: 'it',
          type: 'array',
          of: [{
            type: 'block',
            styles: [
              {title: 'Testo corrente', value: 'normal'},
              {title: 'Titolo', value: 'h1'},
              {title: 'Sottotitolo', value: 'h2'},
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
              {title: 'Titolo', value: 'h1'},
              {title: 'Sottotitolo', value: 'h2'},
            ],
          }]
        },
      ],
    },
    {
      name: 'description',
      title: 'Descrizione',
      type: 'object',
      group: 'SEO',
      fields: [
        {
          title: "Italiano",
          name: "it",
          type: 'text'
        },
        {
          title: "Inglese",
          name: "en",
          type: 'text'
        }
      ]
    },
    {
      name: 'SEOImage',
      title: 'Immagine SEO (condivisione sui social)',
      type: 'image',
      group: 'SEO'
    },
  ]
}