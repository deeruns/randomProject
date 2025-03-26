import {
    RegisterRequest,
    AuthToken,
    User,
    RegisterResponse,
    PagedUserItemRequest,
    PagedUserItemResponse,
    getFollowCountRequest,
    getFollowCountResponse,
  } from "tweeter-shared";
  import "isomorphic-fetch";
  import {ServerFacade} from "../../../src/network/ServerFacade";
  
  describe("ServerFacade", () => {
    let serverFacade: ServerFacade = new ServerFacade();
  
    it("register a new account", async () => {
      const request: RegisterRequest = {
        firstName: "davin",
        lastName: "thompson",
        alias: "@deeruns",
        password: "password123",
        userImageBytes: new Uint8Array([0, 1, 2, 3]),
        imageFileExtension: ".jpg"
      };
  
      const [user, authToken]: [User, AuthToken] = await serverFacade.Register(request);
  
      expect(authToken).not.toBeNull();
      expect(user).not.toBeNull();
    });
  
    it("returns list of followers (10?)", async () => {
        const request: PagedUserItemRequest = {
            token: "x",
            userAlias: "@deeruns",
            pageSize: 10,
            lastItem: null
          };
  
      const [users, hasMore]: [User[], boolean] =
        await serverFacade.getMoreFollowers(request);
  
      expect(users).not.toBeNull();
      expect(users.length).toBeGreaterThanOrEqual(0);
      expect(hasMore).not.toBeNull();
    });
  
    it("return the number of followers", async () => {

        const request: getFollowCountRequest = {
            token: "x",
            user: new User("davin", "thompson", "@deeruns", "image")
        };
    
  
        const result: number =
            await serverFacade.getFollowerCount(request);

        expect(result).toBeGreaterThanOrEqual(0);
    });
  });