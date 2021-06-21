import { MockData } from "../Repo/MockData";
import { DataManager } from "../Repo/DataManager";
import { User } from "../model/User";

export class ServerUserCase{
    insertData(){
        const repo = new DataManager()
        const mockData = new MockData()
        const user:User = mockData.readUserData()[0]
        const result = repo.init()
        result.then((value)=>{
            repo.checkForNewUsers(["superuser@pwc.com", "nirvanadosco@gmail.com"])
            // repo.writeUserData(user)
            // repo.close()
        })


    }
}