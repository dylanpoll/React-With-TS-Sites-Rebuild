import { Migration } from '@mikro-orm/migrations';

export class Migration20211006065432 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "post" add column "body" text not null;');
  }

}
