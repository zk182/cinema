/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async knex => {
	await knex.schema.createTable('halls', table => {
		table.increments('id').primary();
		table.string('name').unique();
		table.jsonb('seat_configuration');
		table.integer('total_seats').notNullable();
		table.timestamp('created_at').defaultTo(knex.fn.now());
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async knex => {
	return knex.schema.dropTable('halls');
};
