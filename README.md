# intu Digital 
## Frontend developer test

Firstly, thank you for taking the time to complete this test.

The basis of this test has been created with create-react-app and housed within a Docker container.

Please add any further NPM modules that you would like to complete this task. 

## The Test:
1. We would like you to create a simple stopwatch using React.
The stopwatch should have the following features:

    * A Start/Stop button
    * A Lap button 
        * This stores a snapshot of the current time whilst allowing the timer to continue)
    * A Reset button. 
    * A visual display of the current state of the stopwatch.
    * A visual display of the stored Lap times.

2. Include test coverage where appropriate.

3. Apply some simple Sass styling to the Stopwatch.

4. Feel free to include any other features to the Stopwatch that you think may improve the product.

## Docker commands:

* To build and run the container in a detached state:
`docker-compose up -d --build`
* To gain access to the bash prompt inside the container: 
`docker-compose run --rm intu-test bash`
* To stop the container
`docker-compose stop`


## Node Commands:

* To watch your Scss files
`npm run watch-css`
* To run your tests
`npm run test` 