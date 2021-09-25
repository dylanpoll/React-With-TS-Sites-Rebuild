import "reflect-metadata";
import "dotenv-safe/config";
import cors from "cors";
import { MikroORM } from "@mikro-orm/core";
import {__prod__ } from "./constants";
import mikroConfig from "./mikro-orm.config";
import  express  from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from './resolvers/user';
import { MyContext } from './types';
import Redis from "ioredis";//redis idle client timeout is set to 300 seconds at current. I am currently using my VPS hosted redis for development https://redis.io/commands/auth for more info on the params I am using
import session from "express-session";
import connectRedis from 'connect-redis';
//import { emailTester } from "./nodeMailer/testEmailSender";

const main = async () => {
        const orm = await MikroORM.init(mikroConfig);// I will not be automating the migrations process as I would rather manually handle migrations.
        //await orm.em.nativeDelete(User, {});  -> this will wipe all users or whatever you set.

        //emailTester();  // run a test email on load to check a template or settings out.

        const app = express();
        // @ts-ignore
        const RedisStore = connectRedis(session);
        const redis = new Redis(process.env.REDIS_URL_VPS, { password: process.env.REDIS_PASSWORD });
        app.set("trust proxy", 1); //the following for trust proxy and the next app.use are about setting up cors. see https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
        app.use( cors({ origin: process.env.CORS_ORIGIN, credentials: true, }) );
        app.use(// @ts-ignore
        session({
            name: process.env.COOKIE_NAME,// @ts-ignore
            store: new RedisStore({ // @ts-ignore
                client: redis,          //this is using ioredis because this is TS and we don't want to use the standard redis module
                disableTouch: true ,    // touching is used to keep a connected user auth token active, disabling this means they can sit idle and not have auth expire. less secure
                }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 365 * 10 , //this sets the age for the cookie to 10 years
                httpOnly: true,
                sameSite: "lax", // may need to change this... remember updates and issues with other projects and security settings 
                secure: __prod__, // cookie only works in https
                domain: __prod__ ? ".devdylan.me" : undefined, // this works with cors and more or less outlines where the cookie is valid and to be used
                },
            saveUninitialized: false,  // @ts-ignore     //creates a session by default, so to prevent that we turn it to false.
            secret: process.env.SESSION_SECRET,
            resave: false,
            })
        );
        // @ts-ignore 
        const apolloServer = new ApolloServer({ schema: await buildSchema({ resolvers: [PostResolver, UserResolver], validate: false }), context: ({req, res}): MyContext =>  ({ em: orm.em, req, res }), }); // apollo is running the middlewares working with graphQL this contains type definitions for it to use among other things.
        apolloServer.applyMiddleware({ app, cors: false });
        app.listen(4000, () => { console.log('express is running'); });
    };
declare module "express-session" { interface Session { userId: number; }  };
console.log("starting up the project.");
main().catch((err) => {
    console.error(err);
});



