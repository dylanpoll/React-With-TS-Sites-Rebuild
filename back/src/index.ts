import "reflect-metadata";
import "dotenv-safe/config"; //.env module for typescript so I can avoid hard coding anything that could even partially be a security issue. A little bit excessive but I enjoy security. 
import cors from "cors";
import { MikroORM } from "@mikro-orm/core";
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
import { ProjectResolver } from "./resolvers/project";
//import { Post } from "./entities/Posts";

// I will need to run a bloat check at the end of development and optimize accordingly https://create-react-app.dev/docs/analyzing-the-bundle-size/

//in order to keep repo commiting from exposing any potoentially less ideal information I localized much of the credentials and settings to the ENV file and that is in the gitIgnore. use the example if needed. also makes maintaining and re deploying nicer.
const trustProxy: any = process.env.CORS_TRUSTPROXY;
var importAgeValue: any = process.env.COOKIE_MAXAGE;
const maxCookieAge:number = +importAgeValue;//if I do not do this the compilers strict typing will see turning it into a number as potentialy a violation
const willDisableTouch: boolean = process.env.COOKIE_DISABLETOUCH === 'true';
const isHTTPonly: boolean = process.env.COOKIE_HTTPONLY === 'true';
const whatSameSite: any = process.env.COOKIE_SAMESITE;
const domainName: any = process.env.COOKIE_DOMAIN;
const willReSave: boolean = process.env.COOKIE_RESAVE === 'true';
const willSaveUninitialized: boolean = process.env.COOKIE_SAVEUNINITIALIZED === 'true';
const apolloCors: boolean = process.env.APOLLO_CORS === 'true';
const apolloValid: boolean = process.env.APOLLO_VALIDATE ==='true';

const RUNNING_ON: any = process.env.RUNNING_ON;

// this tells the system to only run debugging while in production mode, this works more or less by going in these steps as it is evaluating what the variable will equate out too before assigning it. 1) process.env.Node_ENV === process.env.NODE_ENVIRONMENT; --> true or false | 2) assign result to __prod__ | 3) assign __prod__ as export
export const __prod__: boolean = process.env.Node_ENV === 'production';  //if in production this will return false marking in the cookie -secure :false

const main = async () => {
        const orm = await MikroORM.init(mikroConfig);// I will not be automating the migrations process as I would rather manually handle migrations.
        //await orm.em.nativeDelete(Post, {});  // this will wipe all users or whatever you set.
        loadStatement();    //made a function for easy disabling by comment.
        //emailTester();    // run a test email on load to check a template or settings out.
        const app = express();
        // @ts-ignore
        const RedisStore = connectRedis(session);
        const redis = new Redis(process.env.REDIS_URL_VPS, { password: process.env.REDIS_PASSWORD });
        app.set(trustProxy, 1); //the following for trust proxy and the next app.use are about setting up cors. see https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
        app.use( cors({ origin: process.env.CORS_ORIGIN, credentials: true, }) );
        app.use(// @ts-ignore
        session({
            name: process.env.COOKIE_NAME,// @ts-ignore
            store: new RedisStore({ // @ts-ignore
                client: redis,                              //this is using ioredis because this is TS and we don't want to use the standard redis module
                disableTouch: willDisableTouch ,            // touching is used to keep a connected user auth token active, disabling this means they can sit idle and not have auth expire. less secure
                }),
            cookie: {
                maxAge: maxCookieAge ,                      
                httpOnly: isHTTPonly,
                sameSite: whatSameSite,                      
                secure: __prod__,                           
                domain: __prod__ ? domainName : undefined,  // the ? in TS It is to mark the parameter as optional.https://www.typescriptlang.org/docs/handbook/2/functions.html#optional-parameters this works with cors and more or less outlines where the cookie is valid and to be used
                },
            saveUninitialized: willSaveUninitialized,  // @ts-ignore     //creates a session by default, so to prevent that we turn it to false.
            secret: process.env.SESSION_SECRET,
            resave: willReSave,
            }),
        );
        console.log('Redis connection estalished.');
        const apolloServer = new ApolloServer({ 
            schema: await buildSchema({resolvers: [PostResolver, UserResolver, ProjectResolver], validate: apolloValid}),
            // @ts-ignore  
            context: ({req, res}): MyContext =>  ({ 
                em: orm.em, 
                req, res 
            }), 
        });// apollo is running the middlewares working with graphQL this contains type definitions for it to use among other things.
        apolloServer.applyMiddleware({ app, cors: apolloCors });
        console.log('Apollo is loaded.');
        app.listen(process.env.EXPRESS_PORT, () => { console.log('Express is loaded.'); console.log('  '); });
    };
    
declare module "express-session" { interface Session { userId: number; }  };
console.log("starting up the project.");
main().catch((err) => {
    console.error(err);
});

function loadStatement(){
    console.log('  ');
    console.log('Is build in live release? (if false will currently run in production mode with debugging) : ', __prod__); // console lof if in prod or not 
    console.log('  ');
    console.log('Starting up with the following settings.');
    console.log('CORS Origin: ', process.env.CORS_ORIGIN,', and ',trustProxy);
    console.log('Max Cookie Age: ',maxCookieAge);
    console.log('Disable Touch: ',willDisableTouch);
    console.log('HTTP only: ',isHTTPonly);
    console.log('Secure : ', __prod__);
    console.log('Same site: ',whatSameSite);
    console.log('Domain: ',domainName);
    console.log('ReSave : ', willReSave);
    console.log('Save Uninitialized : ', willSaveUninitialized);
    console.log('Apollo Cors : ', apolloCors);
    console.log('Apollo validate : ', process.env.APOLLO_VALIDATE);
    console.log('  ');
    console.log('IF MIGRATIONS DONT WORK CHECK MIKRO ORM GENERATED MIGRATION FOR DOUBLE PRINTING A TABLE CHANGE....');
    console.log('For some reason this keeps occuring..');
    console.log(' ');
    console.log('grpahql running on : ', RUNNING_ON + process.env.EXPRESS_PORT+ "/graphql");
    console.log('  ');
}