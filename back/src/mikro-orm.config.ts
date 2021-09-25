import { __prod__ } from "./index";
import { Post } from "./entities/Posts";
import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { User } from "./entities/User";
require('dotenv/config');

export default { //using a .env    https://mikro-orm.io/docs/configuration/#using-environment-variables 
    user: process.env.POSTGTRES_USER,
    password: process.env.POSTGTRES_PASSWORD,      
    host: process.env.DATABASE_URL, 
    migrations: {
            tableName: process.env.MIKRO_TABLENAME, // name of database table with log of executed transactions
            path: path.join(__dirname,'./migrations'), // path to the folder with migrations
            pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
            transactional: process.env.MIKRO_TRANSACTIONAL, // wrap each migration in a transaction    
            //disableForeignKeys: true, // wrap statements with `set foreign_key_checks = 0` or equivalent    
            allOrNothing: process.env.MIKRO_ALLORNOTHING, // wrap all migrations in master transaction    
            //dropTables: true, // allow to disable table dropping    
            //safe: false, // allow to disable table and column dropping    
            //emit: 'ts', // migration generation mode
          },
    entities: [Post,User],
    dbName: process.env.DBNAME,
    type: process.env.MIKRO_TYPE,
    debug: !__prod__, // this leaves debugging on only durring production

}as Parameters<typeof MikroORM.init>[0]; 
/* about the above parameters line
typescript works with types....so it sometimes 
is a good idea to set object types to const but if we do that it wont 
pass over auto complete suggestions so instead we pass if as
a parameter and import the libraries that are needed for auto completion
*/
