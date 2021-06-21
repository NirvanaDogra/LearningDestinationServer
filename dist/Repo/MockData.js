"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockData = void 0;
const Status_1 = require("../model/Status");
const Group_1 = require("../model/Group");
const Tracker_1 = require("../model/Tracker");
const User_1 = require("../model/User");
class MockData {
    readUserData() {
        return [
            new User_1.User("1", ["1", "2"], "Super User", "superuser@pwc.com", "https://img.url.com", [new Status_1.Status("1", true), new Status_1.Status("2", false), new Status_1.Status("3", false)]),
            new User_1.User("2", [], "", "newUser@pwc.com", "", [new Status_1.Status("1", false), new Status_1.Status("2", false), new Status_1.Status("3", false)])
        ];
    }
    readTrackerData() {
        return [
            new Tracker_1.Tracker("1", "tracker 1", "https://google.com", "https://img.url", "21/6/2021", "14/6/2021", "This is a trakcer for tracke 1"),
            new Tracker_1.Tracker("2", "tracker 2", "https://yahoo.com", "https://img.url", "21/6/2021", "14/6/2021", "This is a trakcer for tracke 2"),
            new Tracker_1.Tracker("3", "tracker 3", "https://msn.com", "https://img.url", "21/6/2021", "14/6/2021", "This is a trakcer for tracke 3")
        ];
    }
    readGroupData() {
        return [
            new Group_1.Group("1", ["1", "2"], "group1", "this is a group containing T1 and T2", "https://img.url", ["superuser@pwc.com", "newUser@pwc.com"]),
            new Group_1.Group("2", ["3"], "group2", "this is a group containing T3", "https://img.url", ["superuser@pwc.com", "newUser@pwc.com"])
        ];
    }
}
exports.MockData = MockData;
//# sourceMappingURL=MockData.js.map