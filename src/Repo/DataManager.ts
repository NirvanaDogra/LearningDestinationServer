/* tslint:disable no-var-requires */
import { Group } from "../model/Group";
import { Tracker } from "../model/Tracker";
import { User } from "../model/User";
import { DatabaseEnvSettor } from "./DatabaseEnvSettor";
import { ReadDataDao } from "./ReadDataDao";
import { WriteDataDao } from "./WriteDataDao"

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://trackerDatabase:mydb123@cluster0.fcgzr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

export class DataManager implements ReadDataDao, WriteDataDao{
    client = new MongoClient(uri);
    async init():Promise<boolean>{
        try{
          await this.client.connect();
            // tslint:disable-next-line:no-console
          console.log("Database connection status: "+this.client.isConnected())
          return this.client.isConnected() as boolean
        }catch(e){
          // tslint:disable-next-line:no-console
          console.log(e)
          return false
        }
    }

    async close(){
        this.client.close()
    }


    writeUserData(user:User): void {
         // tslint:disable-next-line:no-console
         console.log(user)
        this.client.db(DatabaseEnvSettor.databaseName)
        .collection(DatabaseEnvSettor.userCollection, null, null)
        .insertOne(user, (error:any, resp:any) =>{
            if(error)
                // tslint:disable-next-line:no-console
                console.log("Failed to insert user: "+ error)

            // tslint:disable-next-line:no-console
            console.log("Inserted "+ resp.ops[0]._id)

        })

    }
    writeTrackerData(tracker:Tracker): void {
        this.client.db(DatabaseEnvSettor.databaseName)
        .collection(DatabaseEnvSettor.trackerCollection, null, null)
        .insertOne(tracker, null, (error:any)=>{
            // tslint:disable-next-line:no-console
            console.log("Failed to insert tracker: "+ error)
        })
    }
    writeGroupData(group:Group): void {
        this.client.db(DatabaseEnvSettor.databaseName)
        .collection(DatabaseEnvSettor.groupsCollection, null, null)
        .insertOne(group, null, (error:any)=>{
            // tslint:disable-next-line:no-console
            console.log("Failed to insert group: "+ error)
        })

        this.checkForNewUsers(group.email)
    }

    readUserData(): User[] {
        throw new Error("Method not implemented.");
    }
    readTrackerData(): Tracker[] {
        throw new Error("Method not implemented.");
    }
    readGroupData(): Group[] {
        throw new Error("Method not implemented.");
    }

    checkForNewUsers(emails:string[]){
        // tslint:disable-next-line:no-console
        console.log(emails)
        for(const email in emails){
            if (emails.hasOwnProperty(email)) {
                let isEmailFound = false
                this.client.db(DatabaseEnvSettor.databaseName)
                .collection(DatabaseEnvSettor.userCollection, null, null)
                .find({"email": emails[email]}).toArray((error:any, respo:any)=> {
                    if(error){
                        isEmailFound = false
                    }else{
                        if(respo.length > 0) {
                            isEmailFound = true
                            // tslint:disable-next-line:no-console
                            console.log([respo]+":"+respo.length)
                        }
                        else{
                            this.writeUserData(new User("55", [], "", emails[email], "", []))
                        }
                        // tslint:disable-next-line:no-console
                        console.log(emails[email]+":"+isEmailFound)
                    }
                })

            }
        }

    }

}