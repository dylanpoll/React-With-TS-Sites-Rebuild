import "dotenv-safe/config";
import { MyContext } from "../types";
import { Resolver, Ctx, Arg, Mutation, InputType, Field, ObjectType, Query, Int } from "type-graphql";
import { User } from "../entities/User";
import argon2 from "argon2";

// having a issue with adding additional cookie data using the mechanics in place will put related links below until resolved
// https://dev.to/kwabenberko/extend-express-s-request-object-with-typescript-declaration-merging-1nn5

@InputType()                    //input types we use for arguments
class UsernamePasswordInput { 
    @Field() 
        username: string;
    @Field() 
        email: string;
    @Field() 
        password: string;
    }


@ObjectType()                     //object types we return from our mutations
class UserResponse {
    @Field(()=> [FieldError], 
        {nullable: true}) errors?: FieldError[];  //this is used to pass errors to the FieldError object so graphQL can return that object instead of a massive report from the database

    @Field(() => User, 
        {nullable: true}) user?: User;
    }
@ObjectType()                     
class FieldError {
    @Field() 
        field: string;

    @Field() 
        message: string;
    }
@Resolver()

export class UserResolver{

    @Query( () => User, {nullable: true})   //this is used to check if you are logged in
        async me( @Ctx() {req, em} : MyContext) {
            console.log('session: ', req.session); // this prints the session code 
            if(!req.session.userId){ return null; }; //if there is no userid property in the session they are not logged in.

            const user = await em.findOne(User, {
                id: req.session.userId
            });  // this checks the current userId against our db of users and assigns a local object var the values of that users db data
        
        return user;    // if they are logged in, this returns the object with the data for the logged in user.
        }// {me{id username}}


    @Query( () => User, {nullable: true})   //this is used to check if you are logged in
        async userSearch( 
            @Arg("id", () => Int ) id: number,
            // eslint-disable-next-line no-empty-pattern
            @Ctx() {
                //req, 
                em
            } : MyContext) {
                if(!id){ return null; }; //if there is no userid property in the session they are not logged in.
                const user = await em.findOne( User, { id });  // this checks the current userId against our db of users and assigns a local object var the values of that users db data
                if(user?.userRole === null){ user.userRole = "blank" } //this is until I fill in the values for all active users    
    return user;    // if they are logged in, this returns the object with the data for the logged in user.
    }// 

    @Mutation(() => UserResponse)
        async register( 
            @Arg("options") options: UsernamePasswordInput,     //this calls from the class above much like a constructor and is used to get/set fields in the object associated with it.
            // eslint-disable-next-line no-empty-pattern
            @Ctx() { 
                em, req // removed while account registration is disbaled.
            }: MyContext): Promise<UserResponse> {
                if(options.username.length <=4){ return { errors: [{ field: "username", message: "Length does not meet the minimum requirements.", }, ], }; };  // these two use a if length argument to make certain that the username and pass are at least a certain amount of chars.
                if(options.password.length <=5){ return { errors: [{ field: "password", message: "Length does not meet the minimum requirements.", }, ], }; };
                if(!options.email.includes('@')){ return { errors: [{ field: "email", message: "Needs to be a valid email address.", }, ], }; };  
                if(options.username.includes('@')){ return { errors: [{ field: "username", message: "Usernames cannot include an @ symbol.", }, ], }; };  

// disabled account creation until I have more security in place..              
                const hashedPassword = await argon2.hash(
                    options.password
                    ); // argon2 is hashing our passwords in this instance 
                
                const user = em.create(User, { // constructing the user object the send to the DB.
                    username: options.username,  
                    email: options.email, 
                    password: hashedPassword,
                    userRole: "restricted" // default for new users. could use a bool and do admin but this allows for more than two user groups..
                });
            try{ 
                await em.persistAndFlush(user); // https://mikro-orm.io/docs/repositories-api/#persistandflushentity-anyentity--anyentity-promisevoid
            }catch (err) { 
                if(err.code === '23505' || err.detail.includes("already exists")){ 
                    return { errors: [{ field: "username", message: "Username is taken", }, ], }; }; 
            }; // duplicate username error code used to validate, the json report sent back would indicate this.        
        
        req.session.userId = user.id; //this stores the userId value in as a session cookie that allows them to stay logged in.
                return {user};

                //return { errors: [{ field: "username", message: "sorry, I have disabled account registration until I have configured non admin accounts.", }, ], };       
            }//graphQL post to use : mutation{register(options: {username:"bobsBurgers", password:"dylanstest"}){errors{field message}user{id username}}}


    @Mutation(() => UserResponse)
        async login( 
            @Arg("loginType") loginType: string,     
            @Arg("password") password: string,
            @Ctx() { em, req }: MyContext): Promise<UserResponse> {
                
                const user = await em.findOne(User,                     
                    loginType.includes('@')
                    ?{ email: loginType }
                    :{ username: loginType }
                );

                    if(!user){ 
                        return { 
                            errors: [{ 
                                field: "username", 
                                message: "the username or password is incorrect or does not exist.", }, ], }; 
                    };
            
                const valid = await argon2.verify(
                    user.password, 
                    password
                    );
                    
                    if(!valid){
                         return{ 
                             errors: [ { 
                                 field: "password", 
                                 message: "the username or password is incorrect or does not exist.", }, ], }; 
                    };
            //@ts-ignore
            req.session.testkey = ("this is a test key assigned to " + user.username); // you can create and map keys as you please and assign objects as well.
            req.session.userId = user.id; //this stores the userId value in as a session cookie that allows them to stay logged in.
            console.log(user)
        return {user};
        }//graphQL post to use : mutation{login(options: {username:"bobs", password:"dylan"}){errors{field message}user{id username}}}
    
    @Mutation(()=> Boolean)
        logout(
            @Ctx() { req, res }: MyContext ){  
                let cookieName: any | undefined = process.env.COOKIE_NAME;  //can't change the expected type from string | undefined to string, to this is where I am.
                return new Promise( (terminate) => 
                req.session.destroy( err => {    // this line kills the established redis session 
                    res.clearCookie(cookieName); //this destroys the cookie stored client side.
                    if(err){
                        console.log(err);
                        terminate(false);
                        return;
                    }
                    terminate(true);
                })
            );
        }//graphQL post to use : mutation{ logout }
    
    @Mutation(()=> Boolean)
        async forgotPass(
//            @Arg('email') email:string,
//            @Ctx() {em}: MyContext
        ){
//            const user = await em.findOne(Post, {email})
            return true;
        }
        
} 