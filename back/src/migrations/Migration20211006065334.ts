import { Migration } from '@mikro-orm/migrations';

export class Migration20211006065334 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "post" drop column "body";');
  }

}
