const conf={
    appwriteUrl:String(import.mata.env.VITE_APPWRITE_URL),
    appwritePeojectId:String(import.mata.env.VITE_APP_APPWRITE_PROJECT_ID),
    appwriteDatabaseId:String(import.mata.env.VITE_APP_APPWRITE_DATABASE_ID),
    appwriteCollectionId:String(import.mata.env.VITE_APP_APPWRITE_COLLECTION_ID),
    appwriteBucketId:String(import.mata.env.VITE_APP_APPWRITE_BUCKET_ID)
}

export default conf