import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

@ObjectType()                  
@Entity()                               
export class User {
  @Field() 
    @PrimaryKey() 
      id!: number;
  
  @Field(() => String)  
    @Property({type: "date" })   
      createdAt: Date = new Date();

  @Field(() => String)  
    @Property({type: "date", onUpdate: () => new Date() })  
      updatedAt: Date = new Date();

  @Field(() => String)  
    @Property({ type: "text", unique: true }) 
      username!: string;    // we use the unique property because there should be 1 person with a username so no repeating usernames 
  
  @Field(() => String)    
    @Property({ type: "text"}) 
      password!: string;                   //passwords will be hashed and no field added as should not be seen by call

  @Field(() => String)  
    @Property({ type: "text" })  
      email!: string;

//  @Field(() => String)  
//    @Property({ type: "text" })  
//      owned!: string;

}