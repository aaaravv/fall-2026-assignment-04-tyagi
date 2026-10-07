import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('genres')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('name', 'varchar(255)', (col) => col.notNull().unique())
    .addColumn('description', 'text')
    .execute();

  await db.schema
    .createTable('authors')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('name', 'varchar(255)', (col) => col.notNull())
    .addColumn('bio', 'text')
    .execute();

  await db.schema
    .createTable('books')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('title', 'varchar(255)', (col) => col.notNull())
    .addColumn('isbn', 'varchar(20)', (col) => col.notNull().unique())
    .addColumn('author_id', 'integer', (col) =>
      col.references('authors.id').onDelete('cascade')
    )
    .addColumn('genre_id', 'integer', (col) =>
      col.references('genres.id').onDelete('cascade')
    )
    .addColumn('publication_year', 'integer')
    .addColumn('total_copies', 'integer', (col) => col.notNull().defaultTo(1))
    .addColumn('available_copies', 'integer', (col) => col.notNull().defaultTo(1))
    .execute();

  await db.schema
    .createTable('borrowers')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('user_id', 'integer', (col) =>
      col.references('users.id').onDelete('cascade').unique().notNull()
    )
    .addColumn('membership_number', 'varchar(50)', (col) => col.notNull().unique())
    .addColumn('phone', 'varchar(50)')
    .execute();

  await db.schema
    .createTable('loans')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('book_id', 'integer', (col) =>
      col.references('books.id').onDelete('cascade').notNull()
    )
    .addColumn('borrower_id', 'integer', (col) =>
      col.references('borrowers.id').onDelete('cascade').notNull()
    )
    .addColumn('loan_date', 'timestamp', (col) =>
      col.defaultTo(sql`NOW()`).notNull()
    )
    .addColumn('due_date', 'timestamp', (col) => col.notNull())
    .addColumn('return_date', 'timestamp')
    .addColumn('status', 'varchar(50)', (col) => col.notNull().defaultTo('borrowed'))
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('loans').execute();
  await db.schema.dropTable('borrowers').execute();
  await db.schema.dropTable('books').execute();
  await db.schema.dropTable('authors').execute();
  await db.schema.dropTable('genres').execute();
}
