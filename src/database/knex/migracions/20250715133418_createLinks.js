exports.up = knex => knex.schema.createTable("links", table => {
    table.increments("id");
    table.text("url").notNullable(); // corrigido
    table.integer("note_id")
        .references("id")
        .inTable("notes")
        .onDelete("CASCADE");
    table.timestamp("created_at").defaultTo(knex.fn.now()); // corrigido
});

exports.down = knex => knex.schema.dropTable("links");
