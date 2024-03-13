import { HomeIcon } from '@sanity/icons'
import { CogIcon } from '@sanity/icons'

export const myStructure = (S) => {
  const customListItems = [
    S.listItem()
      .title('Homepage')
      .icon(HomeIcon)
      .child(S.document().schemaType('homepage').documentId('homepage')),
    S.listItem()
      .title('Menu')
      .child(
        S.documentTypeList('menu')
          .title('Menu')
          .child(documentId =>
            S.document()
              .documentId(documentId)
              .schemaType('menu')
          )
      ),
    S.listItem()
      .title('Piatti')
      .child(
        S.documentTypeList('dish')
          .title('Piatti')
          .child(documentId =>
            S.document()
              .documentId(documentId)
              .schemaType('dish')
          )
      ),
    S.listItem()
      .title('Allergeni')
      .child(
        S.documentTypeList('allergen')
          .title('Allergeni')
          .child(documentId =>
            S.document()
              .documentId(documentId)
              .schemaType('allergen')
          )
      ),
    S.divider(),
    S.listItem()
      .title('Impostazioni del sito')
      .icon(CogIcon)
      .child(S.document().schemaType('siteSettings').documentId('siteSettings'))
  ];

  // Filter out document types that are already included in customListItems
  const otherListItems = S.documentTypeListItems().filter(listItem => {
    const includedDocumentTypes = ['homepage', 'menu', 'allergen', 'dish', 'siteSettings', 'mediaTag'];
    return !includedDocumentTypes.includes(listItem.getId());
  });

  return S.list()
    .title('Base')
    .items([
      ...customListItems,
      ...otherListItems
    ]);
};
