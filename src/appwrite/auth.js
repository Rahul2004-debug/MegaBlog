import conf from "../config/config"
import { Client, Account, ID } from "appwrite";

// export class AuthService{
//     client=new Client();
//     account;

//     constructor()
//     {
//         this.client
//         .setEndpoint('conf.appwriteUrl')
//         .setProject('conf.appwritePeojectId');
        
//         this.account=new Account(this.client)
//     }

//     async createAccount({email,password,name})
//     {
//         try{

//            const userAccount= await this.account.create(ID.unique(),email,password,name)

//            if(userAccount)
//            {
//                 //add another method
//            }
//            else
//            {
//                 return userAccount;
//            }



//         }catch(err)
//         {
//             throw err;
//         }
//     }
// }

// const authservice=new AuthService();

// export default authservice;

export class AuthService{
     client = new Client();
     account;

     constructor()
     {
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.account=new Account(this.client)
     }  

     async createAccount({email,password,name})
     {
        try{
            const userAccount= await this.account.create({
            userId: ID.unique(), 
            email,
            password,
            name,
            });
            if(userAccount)
            {
                //add another method
                return await this.login({email,password})
            }
            else
            {
                return userAccount;
            }
        }catch(err)
        {
            console.error("Signup Error Details:", {
                message: err.message,
                code: err.code,
                status: err.status,
                response: err.response,
                fullError: err
            });
            throw err;
        }
    }

     async login({email,password})
     {
        try{
           return  await this.account.createEmailPasswordSession({
            email: email, 
            password: password
        });

        }catch(err)
        {
            throw err;
        }
     }

     async getCurrentUser(){
        try
        {     
            return await this.account.get();
        } catch (error) {
            if (error?.code === 401 || error?.response?.code === 401) {
                return null;
            }
            console.log("Appwrite server:GetUserError",error);
            return null;
        }
    }

    async logout()
    {
        try
        {
            await this.account.deleteSession("current");
        }
        catch(err)
        {
            console.log("Logout error",err);
        }
    }
}

const authservice=new AuthService();

export default authservice;


