"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowService = void 0;
const tweeter_shared_1 = require("tweeter-shared");
class FollowService {
    async loadMoreFollowers(token, userAlias, pageSize, lastItem) {
        // TODO: Replace with the result of calling server
        //generate user objec from dto so it works with fake data
        return this.getFakeData(lastItem, pageSize, userAlias);
    }
    async getFakeData(lastItem, pageSize, userAlias) {
        const [items, hasMore] = tweeter_shared_1.FakeData.instance.getPageOfUsers(tweeter_shared_1.User.fromDto(lastItem), pageSize, userAlias);
        const dtos = items.map((user) => user.dto);
        return [dtos, hasMore];
    }
    async loadMoreFollowees(token, userAlias, pageSize, lastItem) {
        // TODO: Replace with the result of calling server
        return this.getFakeData(lastItem, pageSize, userAlias);
    }
    // from the UserInfo file
    async getIsFollowerStatus(token, user, selectedUser) {
        // TODO: Replace with the result of calling server
        //returns boolean
        return tweeter_shared_1.FakeData.instance.isFollower();
    }
    async getFolloweeCount(token, user) {
        // TODO: Replace with the result of calling server
        return tweeter_shared_1.FakeData.instance.getFolloweeCount(user.alias);
    }
    async getFollowerCount(token, user) {
        // TODO: Replace with the result of calling server
        return tweeter_shared_1.FakeData.instance.getFollowerCount(user.alias);
    }
    async follow(token, userToFollow) {
        // Pause so we can see the follow message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000));
        // TODO: Call the server
        const followerCount = await this.getFollowerCount(token, userToFollow);
        const followeeCount = await this.getFolloweeCount(token, userToFollow);
        return [followerCount, followeeCount];
    }
    async unfollow(token, userToUnfollow) {
        // Pause so we can see the unfollow message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000));
        // TODO: Call the server
        const followerCount = await this.getFollowerCount(token, userToUnfollow);
        const followeeCount = await this.getFolloweeCount(token, userToUnfollow);
        return [followerCount, followeeCount];
    }
}
exports.FollowService = FollowService;
