# How to select questions for the Battle

## Types of Room

    Novice:
        2 easy difficulty questions from LeetCode
        1 medium difficulty question from LeetCode
        1 hard difficulty question from LeetCode
    Intermediate:
        1 easy difficulty question from LeetCode
        2 medium difficulty questions from LeetCode
        1 hard difficulty question from LeetCode
    Expert:
        1 easy difficulty question from LeetCode
        1 medium difficulty question from LeetCode
        2 hard difficulty questions from LeetCode

## Implementations:

    [*] Basic UI
    [*] React Setup Done
    [*] Editor Page
        [] Make editor resizable
    [*] Made a create room page
        [*] Ask the difficulty of the contest
        [*] Ask the room name of the contest
        [*] Ask the name of the user
    [*] Setup the Terminals
        [*] Create a Tag that said Accepted and in same line there is Runtime 0ms
        [*] show the input field in the next line
        [*] show the stdout field in the next line
        [*] show the output field in the next line
        [*] show the expected field in the next line
    [*] Make the api for the create room page
        [*] create a endpoint to select difficulty
        [*] create a endpoint to show all the rooms
        [*] create a endpoint to join the room
    [*] Setup the Problems Page
        [*] Create the heading of problem
        [*] next create a tag of problem easy medium or hard and show likes and dislikes
        [*] next show the description of the problem
        [*]  add the state management to the page
        [*] add the timer to the page
        [*] make select option for lang,font and theme
        [*] add functionality to timer
        [*] Make a start timer button only owner of the room
        <!-- [] make tabs in the input terminal -->
        [*] make input Terminal to pass custom testcase
        [*] make run and submit button functional
        [*] make output Terminal functional
    [*] Setup the Problems api
        [*] Test case api
        [*] Editor data api
        [*] difficulty and problem title api
        [*] question data api
        [*] save all the questions in my database
        [*] remove all the premium and database questions
        [*] submit output api
        [*] run output api
        [*] make an endpoint to get all the rooms
        [*] make socket connection to show the timer
        [*] make cokkies input for all the users
        [*] check if the user cokkie is valid
        [*] check if the username provided by the user and leetcode username is same
        [*] Set the username from the leetcode api or cookie
        [*] remove the hardcoded username TestUser and Madhav in the Editor Page and JoinRoomPage and CreateRoomPage
        [] delete the room if no user is there
        [] show the number of users in the room in join room page
    [*] Add the routes to the pages
    [] Setup Local Storage
        [*] Check if the cookie is valid
        [*] Save the cookie and user info in the database
        [*] Pass username in each cookie function
        [*] Remove the globaly stored object in api
        [*] In get Userdata function or Validate function pass the cookie as argument
        [] Save the session in local storage
        [] Save the rooms in local storage
        [] Setup the Cookie

===============================================================================================================

## Bug

    [] After creating the room the batle page not open some problem in loading
    [] Make output and input toogle
    [] Save the user code in the state
    [] Resize functionality is needed

    [*] COOKIE is not set up in the api
    [*] Decode the cookie and get the csrf token
    [*] Problems is not visible perfectly
    [*] After submiting the problem the stats are not shown correctly
    [*] Remove the Join Room and Create Room Socket Options and Put in the RoomPage useEffect to Make socket in one place
    [*] leave the room is not working
    [*] language is not changing the language of the code
    [*] Font size is not changing
    [*] timer for different room is not creating
        need add to database
