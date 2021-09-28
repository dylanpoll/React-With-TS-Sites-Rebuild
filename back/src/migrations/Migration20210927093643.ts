import { Migration } from '@mikro-orm/migrations';

export class Migration20210927093643 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "post" add column "catagory" text not null;');
  }

}
