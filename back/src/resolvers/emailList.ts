import "dotenv-safe/config";
import { MyContext } from "../types";
import { Resolver, Ctx, Arg, Mutation, 
    //InputType, Field, ObjectType, 
    Query} from "type-graphql";
import { EmailList } from "../entities/EmailList";

@Resolver()
export class EmailListResolver{
    @Query(() => [EmailList])
    emailListQuerry( @Ctx() { em }: MyContext): Promise<EmailList[]> {
        return em.find(EmailList, {});
    }//graphQL post to use : { EmailList {id name class email}}
    
    @Mutation(() => EmailList)  // Mutations are for updating/inserting/deleting db entrees while querry is for getting data
    async addEmailList(                       // this is made async due to the await used below
        @Arg('name') name: string, 
        @Arg('email') email: string,
        //@Arg('class') class: string,   
        @Ctx() { em }: MyContext): Promise<EmailList> {
            const addedEmailList = em.create(EmailList, 
                {
                    name,
                    email,
                    //class
                });      // making a Projects object named post to then post to the DB
            await em.persistAndFlush(EmailList);             // passing it to graphQL to post the object to the DB
            return addedEmailList;
        }//graphQL post to use : mutation{ createPost(title: "test post" ) { id createdAt updatedAt title }}

}