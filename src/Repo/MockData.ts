import { Status } from "../model/Status";
import { Group } from "../model/Group";
import { Tracker } from "../model/Tracker";
import { User } from "../model/User";
import { ReadDataDao } from "./ReadDataDao";

export class MockData implements ReadDataDao{
    readUserData(): User[] {
        return [
            new User("1", ["1", "2"], "Super User", "superuser@pwc.com", "https://img.url.com", [new Status("1", true), new Status("2", false), new Status("3", false)]),
            new User("2", [], "", "newUser@pwc.com", "", [new Status("1", false), new Status("2", false), new Status("3", false)])
        ]
    }
    readTrackerData(): Tracker[] {
        return [
            new Tracker("1", "tracker 1", "https://google.com", "https://img.url", "21/6/2021", "14/6/2021", "This is a trakcer for tracke 1"),
            new Tracker("2", "tracker 2", "https://yahoo.com", "https://img.url", "21/6/2021", "14/6/2021", "This is a trakcer for tracke 2"),
            new Tracker("3", "tracker 3", "https://msn.com", "https://img.url", "21/6/2021", "14/6/2021", "This is a trakcer for tracke 3")
        ]
    }
    readGroupData(): Group[] {
        return [
            new Group("1", ["1", "2"], "group1", "this is a group containing T1 and T2", "https://img.url", ["superuser@pwc.com", "newUser@pwc.com"]),
            new Group("2", ["3"], "group2", "this is a group containing T3", "https://img.url", ["superuser@pwc.com", "newUser@pwc.com"])
        ]
    }

}