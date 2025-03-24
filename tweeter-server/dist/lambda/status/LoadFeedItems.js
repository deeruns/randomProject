"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const StatusService_1 = require("../../model/service/StatusService");
//remove duplication with calls to functions
const handler = async (request) => {
    //get the request data with story items request
    // use status Items Dto 
    const statusService = new StatusService_1.StatusService();
    const [feed, hasMorePages] = await statusService.loadMoreFeedItems(request.token, request.userAlias, request.pageSize, request.lastItem);
    return {
        success: true,
        message: null,
        feed: feed,
        hasMorePages: hasMorePages
    };
};
exports.handler = handler;
