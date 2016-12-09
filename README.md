#JAR
##Motivating the completion of communal tasks, a dollar at a time.

###Instructions for Use:
1. Download 'Exponent' from the App Store
2. Open the app
3. In the auto-filled field 'Go to an Exponent link...,' enter the url 'exp.host/@tesserachin/jar'

###Special Gestures
* From the home screen, tap in the bottom left corner to simulate an incoming transfer request

###Limitations
* There is no backend implementation for this prototype, so all of the presented information is hard-coded.
* Notifications are simulated using timers and special gestures (see 'Special Gestures' and 'Notes' sections).
* The hamburger menu items are currently under construction; the 'Logout' button has no functionality at all.
* The Jar page cannot actually use money yet. The interactions are simulated (see 'Notes' section).

###Notes
* Once a transfer request is sent by the user, the app will simulate the acceptance of the request after five seconds, appearing as a notification on the homepage.
* The 'Use Jar' interaction is a hard-coded example. On pressing the 'Use' button, the app simulates the user holding the phone to an Apple Pay reader by waiting for three seconds, and then pops up a confirmation modal with information about the transaction.