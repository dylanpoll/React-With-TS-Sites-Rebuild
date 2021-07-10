import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core"
import { Request, Response } from "express"
import { Session, SessionData } from "express-session"
import { Redis } from "ioredis";

export type MyContext = {
  em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>
  redis: Redis;
  req: Request & {session: Session & Partial<SessionData> & { userId?: number } }
  res: Response
};

/*
import { Request, Response } from "express";
import { Redis } from "ioredis";
//import { createUserLoader } from "./utils/createUserLoader";
//import { createUpdootLoader } from "./utils/createUpdootLoader";

export type MyContext = {
  req: Request & { session: Express.Session };
  redis: Redis;
  res: Response;
//  userLoader: ReturnType<typeof createUserLoader>;
//  updootLoader: ReturnType<typeof createUpdootLoader>;
};
*/