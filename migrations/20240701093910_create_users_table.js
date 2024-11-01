/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async knex => {
	await knex.schema.createTable('users', table => {
		table.increments('id').primary();
		table.string('username').unique();
		table.string('email').unique();
		table.string('password').notNullable();
		table.string('country').nullable();
		table.string('ip').nullable();
		table.string('last_ip').nullable();
		table.timestamp('last_login').defaultTo(knex.fn.now());
		table.timestamp('created_at').defaultTo(knex.fn.now());
		table.timestamp('updated_at').defaultTo(knex.fn.now());
	});

	await knex.raw(`
		CREATE OR REPLACE FUNCTION update_users_updated_at()
		RETURNS TRIGGER AS $$
		BEGIN
			NEW.updated_at = NOW(); 
			RETURN NEW; 
		END;
		$$ LANGUAGE plpgsql;

		CREATE TRIGGER users_before_update
		BEFORE UPDATE ON users
		FOR EACH ROW 
		EXECUTE FUNCTION update_users_updated_at();
	`);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async knex => {
	await knex.raw(`DROP TRIGGER IF EXISTS users_before_update ON users`);
	await knex.raw(`DROP FUNCTION IF EXISTS update_users_updated_at`);
	return knex.schema.dropTable('users');
};
