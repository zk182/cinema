/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async knex => {
	await knex.schema.createTable('sessions', table => {
		table.increments('id').primary();
		table
			.integer('hall_id')
			.references('id')
			.inTable('halls')
			.onDelete('CASCADE');
		table.string('movie_name').notNullable();
		table.timestamp('start_time').notNullable();
		table.timestamp('end_time').notNullable();
		table.integer('available_seats_count').notNullable();
		table.timestamp('created_at').defaultTo(knex.fn.now());

		table.unique(['hall_id', 'start_time']); // Unique index for preventing overlapping sessions
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async knex => {
	return knex.schema.dropTable('sessions');
};
