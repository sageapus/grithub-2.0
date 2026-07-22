/**
 * Firebase service stub.
 * Firebase has not been configured for this project.
 * Replace this with a real Firebase implementation when ready.
 */
export default class FirebaseService {
  async setCollectionDocument({ rootCollection, rootDocument, documentCollection, key, data }) {
    console.warn(
      '[FirebaseService] Firebase is not configured. ' +
        `Attempted to write to ${rootCollection}/${rootDocument}/${documentCollection}/${key}`,
      data,
    )
    return { success: false, reason: 'Firebase not configured' }
  }

  async getCollectionDocument({ rootCollection, rootDocument, documentCollection, key }) {
    console.warn('[FirebaseService] Firebase is not configured.')
    return null
  }
}
