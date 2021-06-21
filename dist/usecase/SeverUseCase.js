"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerUserCase = void 0;
const MockData_1 = require("../Repo/MockData");
const DataManager_1 = require("../Repo/DataManager");
class ServerUserCase {
    insertData() {
        const repo = new DataManager_1.DataManager();
        const mockData = new MockData_1.MockData();
        const user = mockData.readUserData()[0];
        const result = repo.init();
        result.then((value) => {
            repo.checkForNewUsers(["superuser@pwc.com", "nirvanadosco@gmail.com"]);
            // repo.writeUserData(user)
            // repo.close()
        });
    }
}
exports.ServerUserCase = ServerUserCase;
//# sourceMappingURL=SeverUseCase.js.map