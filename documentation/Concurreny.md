# Concurrency

I chose to handle transactions natively with `mongodb` to resolve conflicts and enhance overall performance. The `reserve` function in [reservation](../src/controllers/reservation.js) validates that all seats belong to the correct hall before proceeding with the reservation. It then initiates a database transaction to insert both the reservation details and seat data. This approach ensures that the operations are either fully completed or rolled back in case of an error, ultimately improving performance by reducing external dependencies for conflict management. Also, using a replica set on mongodb, I can make use of latest transaction functionalities, which was my way to go in order to solve this problem.

A script was made [concurrency](../scripts//concurrency.js) in order to test 
concurrent requests to book a seat, you may need to put a valid cookie before running

`npm run test:concurrency`

### Results testing with 10 concurrent requests

Running the script to book last file on session 5

[video](./Concurrency.mov)

logs also inform that only User 1 was able to book, while other 9 failed