import conf from "../config/config"
import { Client, ID, TablesDB, Query } from "appwrite";

class Service {
    client = new Client();
    tablesDB;

    constructor() {
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.tablesDB = new TablesDB(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try{
            const result = await this.tablesDB.createRow({
            databaseId: conf.appwriteDatabaseId,
            tableId: conf.appwriteCollectionId,
            rowId: slug,
            data: {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            });
            return result;
        }catch(exception){
            console.log(`Error occured ${exception}`)
        }
    }
    async updatePost(slug, {title, content, featuredImage, status}){
        try{
            const result = await this.tablesDB.updateRow({
                    databaseId: conf.appwriteDatabaseId,
                    tableId: conf.appwriteCollectionId,
                    rowId: slug,
                    data: {
                        title,
                        content,
                        featuredImage,
                        status,
                    }
            });
            return result;
        }catch(exception){
            console.log(`Error occured while database making ${exception}`)
        }
    }

    async deletePost(slug){
        try{
            const result = await this.tablesDB.deleteRow({
                databaseId:conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: slug,
            });
            return true;
        }catch(e){
            console.log(`Error in database methods ${e}`)
            return false;
        }
    }

    async getPost(slug){
        try{
            const result = await this.tablesDB.getRow({
                databaseId:conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: slug
            });
            return result;  
        }catch(e){
            console.log(`Error in database methods ${e}`)
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
    try {
        const result = await this.tablesDB.listRows({
            databaseId: conf.appwriteDatabaseId,
            tableId: conf.appwriteCollectionId,
            queries,
        });
        return result;
        } catch (e) {
            console.log(`Error occurred in database methods ${e}`);
            throw e;
        }
    }

    async uploadFile(file)
    {
        try{
                return await this.bucket.createFile(
                    conf.appwriteBucketId,
                    ID.unique(),
                    file
                )
        }catch(err)
        {
            console.log("Appwrite Service ::uploadFile::error",error);
        }
    }

    async deleteFile(fileId)
    {
        try {
             await this.bucket.deleteFile(
                conf.appwriteBucketId,
                file
             )
        } catch (error) {
            console.log("delete error",error)
        }
    }

    getFilePreview(fileId)
    {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }

    
}
const service=new Service();

export default service;