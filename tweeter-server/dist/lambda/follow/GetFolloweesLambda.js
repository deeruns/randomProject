"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const FollowService_1 = require("../../model/service/FollowService");
const handler = async (request) => {
    //get the request data
    //call load more followees?
    //wrap what we are passing in a request object
    //return a promise that cotains userdto[] and boolean whether there is more data or not, a success indicator, or error message, items and whether we have more items
    //call an instance of the method and call follow service 
    const followService = new FollowService_1.FollowService();
    const [items, hasMore] = await followService.loadMoreFollowees(request.token, request.userAlias, request.pageSize, request.lastItem);
    return {
        success: true,
        message: null,
        items: items,
        hasMore: hasMore
    };
};
exports.handler = handler;
