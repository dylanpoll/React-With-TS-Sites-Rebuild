import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";
//import { User } from "./User";

@ObjectType()// this makes the schema work with graphQL ran by apollo 
@Entity()// this states that the following will be entities
export class Post {
  @Field(() => Int) //the field tag allows this field value in the schema to be passed to graphql, without it graphql wont read this.
    @PrimaryKey() 
      id!: number// PrimaryKey -> this designates that this will be the db entree value that is usually randomized
  
  @Field(() => String) 
    @Property({ type: "date" }) 
      createdAt: Date = new Date();// Propery tag ->  decorates this as a database call
  
  @Field(() => String) 
    @Property({ type: "date", onUpdate: () => new Date() }) 
      updatedAt: Date = new Date();
  
  @Field(() => String) 
    @Property({ type: "text" }) 
      title!: string;

  @Field(() => String)  
    @Property({ type: "text" })  
      body!: string;

  @Field(() => String)  
    @Property({ type: "text" })  
      catagory!: string;

//  @Field(() => String)  
//    @Property({ type: "text" })  
//      owner!: string;
    
}
/*
entities are the listings for the shema values
*/
