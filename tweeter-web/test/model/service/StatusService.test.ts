import "@testing-library/jest-dom";
import { AuthToken, Status, StoryItemsRequest, User } from "tweeter-shared";
import { StatusService } from "../../../src/model/StatusService";
import "isomorphic-fetch";

 describe("StatusService", () => {
   const statusService: StatusService = new StatusService();
 
   it("Return first two pagination's of story page", async () => {
    const authToken: AuthToken = new AuthToken("token", 0);
    const userAlias: string = "davin";

     let result: [Status[], boolean] =
       await statusService.loadMoreStoryItems(
            authToken,
            userAlias,
            10,
            null
       );
 
     expect(result).not.toBeNull();
     const statuses: Status[] = result[0];
     const hasMore: boolean = result[1];
     expect(statuses).not.toBeNull();
     expect(hasMore).not.toBeNull();
 
    //  if (hasMore === true) {
    //    expect(statuses.length).toBe(10);
 
    //    let moreResults: [Status[], boolean] =
    //      await statusService.loadMoreStoryItems(
    //             authToken,
    //             userAlias,
    //             10,
    //             statuses[9]
    //          );
 
    //    const nextStatuses: Status[] = moreResults[0];
    //    expect(nextStatuses).not.toBeNull();
    //    expect(nextStatuses.length).toBeGreaterThanOrEqual(1);
    //  }
   });
 });