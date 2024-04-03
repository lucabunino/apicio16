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
  fields: [
    {
      name: 'title',
      title: 'Titolo',
      type: 'string',
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'inlineSvg',
    },
    {
      name: 'maps',
      title: 'Indirizzo',
      type: 'string',
      fieldset: 'contacts',
    },
    {
      name: 'mapsLink',
      title: 'Link Google Maps',
      type: 'url',
      fieldset: 'contacts',
      validation: Rule => Rule.uri({
        scheme: ['https'],
      })
    },
    {
      name: 'instagramLink',
      title: 'Link Instagram',
      type: 'string',
      fieldset: 'contacts',
    },
    {
      name: 'facebookLink',
      title: 'Link Facebook',
      type: 'url',
      fieldset: 'contacts',
      validation: Rule => Rule.uri({
        scheme: ['https'],
      })
    },
    {
      name: 'mail',
      title: 'Email',
      type: 'string',
      fieldset: 'contacts',
    },
    {
      name: 'phone',
      title: 'Numero di telefono',
      type: 'string',
      fieldset: 'contacts',
    },
    {
      name: 'footerImage',
      title: 'Immagine footer',
      type: 'image',
      fieldset: 'media',
    },
    {
      name: 'footerImageMobile',
      title: 'Immagine footer mobile',
      type: 'image',
      fieldset: 'media',
    },
    {
      name: 'description',
      title: 'Descrizione',
      type: 'object',
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
  ]
}