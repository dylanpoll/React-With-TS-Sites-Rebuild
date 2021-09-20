import { MyContext } from "src/types";
import { Resolver, Ctx, Arg, Mutation, InputType, Field, ObjectType, Query } from "type-graphql";
import { User } from "../entities/User";
import argon2 from "argon2";
import { COOKIE_NAME } from "../constants";


@InputType()                    //input types we use for arguments
class UsernamePasswordInput { 
    @Field() username: string;
    @Field() password: string;
    }
@ObjectType()                     //object types we return from our mutations
class UserResponse {
    @Field(()=> [FieldError], {nullable: true}) errors?: FieldError[];    //this is used to pass errors to the FieldError object so graphQL can return that object instead of a massive report from the database
    @Field(() => User, {nullable: true}) user?: User;
    }
@ObjectType()                     
class FieldError {
    @Field() field: string;
    @Field() message: string;
    }
@Resolver()

export class UserResolver{

    @Query( () => User, {nullable: true})   //this is used to check if you are logged in
        async me( @Ctx() {req, em} : MyContext) {
            console.log('session: ', req.session); // this prints the session code 
            if(!req.session.userId){ return null; }; //if there is no userid property in the session they are not logged in.
            const user = await em.findOne(User, {id: req.session.userId});  // this checks the current userId against our db of users and assigns a local object var the values of that users db data
        return user;    // if they are logged in, this returns the object with the data for the logged in user.
        }// {me{id username}}
        
    @Mutation(() => UserResponse)
        async register( 
            @Arg("options") options: UsernamePasswordInput,     //this calls from the class above much like a constructor and is used to get/set fields in the object associated with it.
            @Ctx() { em, req }: MyContext): Promise<UserResponse> {
                if(options.username.length <=4){ return { errors: [{ field: "username", message: "Length does not meet the minimum requirements.", }, ], }; };  // these two use a if length argument to make certain that the username and pass are at least a certain amount of chars.
                if(options.password.length <=5){ return { errors: [{ field: "password", message: "Length does not meet the minimum requirements.", }, ], }; };
                const hashedPassword = await argon2.hash(options.password); // argon2 is hashing our passwords in this instance 
                const user = em.create(User, { username: options.username,  password: hashedPassword, });
            try{ await em.persistAndFlush(user); }catch (err) { if(err.code === '23505' || err.detail.includes("already exists")){ return { errors: [{ field: "username", message: "Username is taken", }, ], }; }; }; // duplicate username error code used to validate, the json report sent back would indicate this.        
        req.session.userId = user.id; //this stores the userId value in as a session cookie that allows them to stay logged in.
        return {user};
        }//graphQL post to use : mutation{register(options: {username:"bobsBurgers", password:"dylanstest"}){errors{field message}user{id username}}}
    
    @Mutation(() => UserResponse)
        async login( 
            @Arg("options") options: UsernamePasswordInput,     
            @Ctx() { em, req }: MyContext): Promise<UserResponse> {
                const user = await em.findOne(User, {username: options.username});
                    if(!user){ return { errors: [{ field: "username", message: "that username does not exist.", }, ], }; };
                const valid = await argon2.verify(user.password, options.password);
                    if(!valid){ return{ errors: [ { field: "password", message: "incorrect password", }, ], }; };
        //@ts-ignore
        req.session.testkey = ("this is a test key assigned to "+user.username);            // you can create and map keys as you please and assign objects as well.
        req.session.userId = user.id;   //this stores the userId value in as a session cookie that allows them to stay logged in.
        return {user};
        }//graphQL post to use : mutation{login(options: {username:"bobs", password:"dylan"}){errors{field message}user{id username}}}
    
    @Mutation(()=> Boolean)
        logout(
            @Ctx() { req, res }: MyContext ){  
                return new Promise( (terminate) => 
                req.session.destroy( err => { // this line kills the established redis session 
                    res.clearCookie(COOKIE_NAME); //this destroys the cookie stored client side.
                    if(err){
                        terminate(false);
                        console.log(err);
                        return;
                    }
                    terminate(true);
                })
            );
        }//graphQL post to use : mutation{ logout }
} 