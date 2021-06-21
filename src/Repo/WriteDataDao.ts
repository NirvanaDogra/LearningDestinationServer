import { Group } from "../model/Group";
import { Tracker } from "../model/Tracker";
import { User } from "../model/User";

export interface WriteDataDao{
    writeUserData(user:User):void
    writeTrackerData(tracker:Tracker):void
    writeGroupData(group:Group):void
}