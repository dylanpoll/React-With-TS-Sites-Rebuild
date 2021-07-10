import { __prod__ } from "./constants";
import { Post } from "./entities/Posts";
import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { User } from "./entities/User";
require('dotenv/config');

const dbUser = process.env.MIKRO_ORM_USER;
const dbUserPassword = process.env.MIKRO_ORM_PASSWORD;
const dbName = process.env.DBNAME;
//const  = process.env.;
//const  = process.env.;

export default { //using a .env    https://mikro-orm.io/docs/configuration/#using-environment-variables 
    user: dbUser,
    password: dbUserPassword,      
    //host: 'localhost:5423',
    migrations: {
            tableName: 'mikro_orm_migrations', // name of database table with log of executed transactions
            path: path.join(__dirname,'./migrations'), // path to the folder with migrations
            pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
            transactional: true, // wrap each migration in a transaction    
            //disableForeignKeys: true, // wrap statements with `set foreign_key_checks = 0` or equivalent    
            allOrNothing: true, // wrap all migrations in master transaction    
            //dropTables: true, // allow to disable table dropping    
            //safe: false, // allow to disable table and column dropping    
            //emit: 'ts', // migration generation mode
          },
    entities: [Post,User],
    dbName: dbName,
    type: 'postgresql',
    debug: !__prod__, // this leaves debugging on only durring production

}as Parameters<typeof MikroORM.init>[0]; 
/* about the above parameters line
typescript works with types....so it sometimes 
is a good idea to set object types to const but if we do that it wont 
pass over auto complete suggestions so instead we pass if as
a parameter and import the libraries that are needed for auto completion
*/
