"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const tweeter_shared_1 = require("tweeter-shared");
const buffer_1 = require("buffer");
class UserService {
    // put the stuff in here that uses fake data and will eventually contact the server to send or recieve data
    // this is from Post.tsx
    async getUser(token, alias) {
        // TODO: Replace with the result of calling server
        const user = tweeter_shared_1.FakeData.instance.findUserByAlias(alias);
        return user ? user.dto : null;
    }
    // this is from register.tsx
    async register(firstName, lastName, alias, password, userImageBytes, imageFileExtension) {
        // Not neded now, but will be needed when you make the request to the server in milestone 3
        const imageStringBase64 = buffer_1.Buffer.from(userImageBytes).toString("base64");
        // TODO: Replace with the result of calling the server
        const user = tweeter_shared_1.FakeData.instance.firstUser;
        let firstuser = user ? user.dto : null;
        if (firstuser === null) {
            throw new Error("Invalid registration");
        }
        return [firstuser, tweeter_shared_1.FakeData.instance.authToken];
    }
    async login(alias, password) {
        // TODO: Replace with the result of calling the server
        const user = tweeter_shared_1.FakeData.instance.firstUser;
        let firstuser = user ? user.dto : null;
        if (firstuser === null) {
            throw new Error("Invalid alias or password");
        }
        return [firstuser, tweeter_shared_1.FakeData.instance.authToken];
    }
    logout = async (userAuthToken) => {
        // Pause so we can see the logging out message. Delete when the call to the server is implemented.
        await new Promise((res) => setTimeout(res, 1000));
    };
}
exports.UserService = UserService;
