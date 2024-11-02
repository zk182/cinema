/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async knex => {
	await knex.schema.createTable('seats', table => {
		table.increments('id').primary();
		table
			.integer('hall_id')
			.references('id')
			.inTable('halls')
			.onDelete('CASCADE');
		table.integer('row').notNullable();
		table.integer('number').notNullable();
		table
			.enum('type', ['vip', 'comfortable', 'regular'])
			.defaultTo('regular');
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async knex => {
	return knex.schema.dropTable('seats');
};
