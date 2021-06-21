"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataManager = void 0;
const User_1 = require("../model/User");
const DatabaseEnvSettor_1 = require("./DatabaseEnvSettor");
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://trackerDatabase:mydb123@cluster0.fcgzr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
class DataManager {
    constructor() {
        this.client = new MongoClient(uri);
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.connect();
                // tslint:disable-next-line:no-console
                console.log("Database connection status: " + this.client.isConnected());
                return this.client.isConnected();
            }
            catch (e) {
                // tslint:disable-next-line:no-console
                console.log(e);
                return false;
            }
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            this.client.close();
        });
    }
    writeUserData(user) {
        // tslint:disable-next-line:no-console
        console.log(user);
        this.client.db(DatabaseEnvSettor_1.DatabaseEnvSettor.databaseName)
            .collection(DatabaseEnvSettor_1.DatabaseEnvSettor.userCollection, null, null)
            .insertOne(user, (error, resp) => {
            if (error)
                // tslint:disable-next-line:no-console
                console.log("Failed to insert user: " + error);
            // tslint:disable-next-line:no-console
            console.log("Inserted " + resp.ops[0]._id);
        });
    }
    writeTrackerData(tracker) {
        this.client.db(DatabaseEnvSettor_1.DatabaseEnvSettor.databaseName)
            .collection(DatabaseEnvSettor_1.DatabaseEnvSettor.trackerCollection, null, null)
            .insertOne(tracker, null, (error) => {
            // tslint:disable-next-line:no-console
            console.log("Failed to insert tracker: " + error);
        });
    }
    writeGroupData(group) {
        this.client.db(DatabaseEnvSettor_1.DatabaseEnvSettor.databaseName)
            .collection(DatabaseEnvSettor_1.DatabaseEnvSettor.groupsCollection, null, null)
            .insertOne(group, null, (error) => {
            // tslint:disable-next-line:no-console
            console.log("Failed to insert group: " + error);
        });
        this.checkForNewUsers(group.email);
    }
    readUserData() {
        throw new Error("Method not implemented.");
    }
    readTrackerData() {
        throw new Error("Method not implemented.");
    }
    readGroupData() {
        throw new Error("Method not implemented.");
    }
    checkForNewUsers(emails) {
        // tslint:disable-next-line:no-console
        console.log(emails);
        for (const email in emails) {
            if (emails.hasOwnProperty(email)) {
                let isEmailFound = false;
                this.client.db(DatabaseEnvSettor_1.DatabaseEnvSettor.databaseName)
                    .collection(DatabaseEnvSettor_1.DatabaseEnvSettor.userCollection, null, null)
                    .find({ "email": emails[email] }).toArray((error, respo) => {
                    if (error) {
                        isEmailFound = false;
                    }
                    else {
                        if (respo.length > 0) {
                            isEmailFound = true;
                            // tslint:disable-next-line:no-console
                            console.log([respo] + ":" + respo.length);
                        }
                        else {
                            this.writeUserData(new User_1.User("55", [], "", emails[email], "", []));
                        }
                        // tslint:disable-next-line:no-console
                        console.log(emails[email] + ":" + isEmailFound);
                    }
                });
            }
        }
    }
}
exports.DataManager = DataManager;
//# sourceMappingURL=DataManager.js.map