import { Group } from "../model/Group";
import { Tracker } from "../model/Tracker";
import { User } from "../model/User";

export interface ReadDataDao{
    readUserData():User[]
    readTrackerData():Tracker[]
    readGroupData():Group[]
}