import { Post } from "../entities/Posts";
import { MyContext } from "../types";
import { Resolver, Query, Ctx, Arg, Int, Mutation } from "type-graphql";

@Resolver()
export class PostResolver {
    @Query(() => [Post])
    posts( @Ctx() { em }: MyContext): Promise<Post[]> {
        return em.find(Post, {});
    }//graphQL post to use : { posts {id createdAt updatedAt title}}

    @Query(() => Post, {nullable: true})  // this is tagged to allow for no object to be returned without breaking the service
    post(                                  // in order to set something to nullable you have to explicitly set the type. 
        @Arg('id', () => Int) id: number, 
        @Ctx() { em }: MyContext): Promise<Post | null> {  // this returns a object or handles it as null
            return em.findOne(Post, { id });
        }//graphQL post to use : { post (id: 2 ) { createdAt updatedAt title}}

    @Mutation(() => Post)  // Mutations are for updating/inserting/deleting db entrees while querry is for getting data
    async createPost(                       // this is made async due to the await used below
        @Arg('title') title: string,        //graphQL can infer types as well, above I manually set the types, appears to not always be needed but sometimes does need to be done.
        @Arg('body') body: string, 
        @Arg('catagory') catagory: string,   
        @Ctx() { em }: MyContext): Promise<Post> {
            const post = em.create(Post, 
                {
                    title,
                    body,
                    catagory
                });      // making a Post object named post to then post to the DB
            await em.persistAndFlush(post);             // passing it to graphQL to post the object to the DB
            return post;
        }//graphQL post to use : mutation{ createPost(title: "test post" ) { id createdAt updatedAt title }}

    @Mutation(() => Post, {nullable: true})  
    async updatePost(                       
        @Arg('id') id: number,  
        @Arg('title', () => String, {nullable: true }) title: string,        
        @Ctx() { em }: MyContext): Promise<Post | null> {
            const post = await em.findOne(Post,{id});   // creates a object and fills it with the data from the db entree with the ID that matches
            if(!post){                                  //uses data attaced to object to validate
                return null;
            }
            if(typeof title !== 'undefined'){            //if the title is not undefined than it has a prior listing so we then know to change we re write it
                post.title = title;                      //the object value for title from the db is assigned the value from the querry submission so we can change just that one value  
                await em.persistAndFlush(post);          // we send it back to the DB
            }           
            return post;
        }//graphQL post to use : mutation{updatePost(id: 1, title: "re wrote"){id createdAt updatedAt title}}

    @Mutation(() => Boolean)                    //we made it a boolean as deletion does not need a return from the db
    async deletePost(                           
        @Arg('id') id: number,                  
        @Ctx() { em }: MyContext): Promise<boolean> {                   
            await em.nativeDelete(Post,{id});   // this is the command for deleting db listings
            return true;
        }//graphQL post to use : mutation{deletePost(id: 1)}

}
