

# Design

Basic design is [here](./Design.pdf)


### Why this approach

A `Postgres` database is used to store `Users`, `Seats`, `Sessions` & `Halls`.
The reasons are

- **Strict schema**: PostgreSQL enforces a structured schema, ensuring data integrity and consistency.
- **Relational data**: The data model requires relational handling, which PostgreSQL supports effectively.
- **Complex joins**: Many queries need to join multiple tables, which PostgreSQL is optimized for.
- **Index lookups**: PostgreSQL provides efficient index lookups, making data retrieval fast.
- **ACID compliance**: Ensures reliable transactions, maintaining data accuracy and consistency even during failures.

Some indexes to allow faster executions were
- **id, username, email**: in Users Table, to allow fast fetch of particular users
- **id, name**: in Halls Table, to look up for particular halls
- **id**: in Seats Table
- **id, hall_id, 'start_time**: in Sessions Table.

Also, `mongodb` database is used to store `Reservations` & particular `Session Seats`,
the reasons being

**Optimistic Locking** is implemented to allow concurrent reads with no immediate locking, reducing initial delays and enabling smoother seat reservation attempts.
- **Data-intensive workload**: Reservations and seat bookings require high responsiveness, and MongoDB’s design enables rapid handling of these operations.
- **High throughput for IOPS**: Optimized for handling a high number of input/output operations per second.
- **Store many TB (or PB) of data**: It scales well, handling large volumes of data effortlessly.
- **Non-relational data**: MongoDB is ideal for handling non-relational structures.
- **Dynamic or flexible schema**: The schema can easily adapt to changes, making it suitable for evolving data models.
- **No need for complex joins**: MongoDB is efficient for use cases where joins are minimal or unnecessary.

Some indexes here were
- **_id, session_id, user_id, is_reserved**: in `Reservations` collection, to get `users` historical reservations
- **_id, session_id + seat_id**: in `sessionsSeat`, to check particular `seats` in a `session` faster


### Next Steps

To further improve the system, we could reduce the need to recalculate hall layouts each time a changes the selection of one. Instead, layouts could be cached in **Redis**, as hall structures are unlikely to change frequently. 

By setting a time-to-live (TTL) of at least three weeks on these cached layouts, we would enhance retrieval speed for these layout calculations. Additionally, an endpoint could be implemented to force a refresh from the database for any halls with updated layouts, ensuring data consistency when changes occur.

