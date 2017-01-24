# Quest-Guide
A website in progress aiming to simplify DND character creation, and facilitate Dungeon Master organization.

## Motivation

DND literature can be difficult to understand at times, so my goal is to create a fast paced
application to expedite the process while still showcasing important game details.

## Setup

This application uses Social Provider Logins such as Twitter and Google Plus. Before you can use these features you need Google, Microsoft, and Twitter OAuth Credentials. Collect the Client Id's and Client Secrets from this process and store them in a secure location. When you are finished, right-click the solution (.sln) file in the Solution Explorer window and click "Manage User Secrets". This will open a local file where you can store your confidential ID's and Secrets in the format shown below:

      {
        "GoogleConsumerKey": "Your Key Goes Here",
        "GoogleConsumerSecret": "Your Secret Goes Here",
        "TwitterConsumerKey": "Your Key Goes Here",
        "TwitterConsumerSecret": "Your Secret Goes Here"
      {

Alternatively, you can comment out lines 105 - 121 in Startup.cs and the app will function without Social Provider Logins. Beware that while the app is not dependent on Social Provider Logins, certain aspects will be altered if they are not present. 

Where to get OAuth Credentials:
https://apps.twitter.com
https://apps.dev.microsoft.com/
https://console.developers.google.com/apis

## Current Status
V.1.3 - Social Provider Logins added including Google Plus, Twitter, and Microsoft. Facebook was considered but wont allow logins from users who arent administrator's on the application until the application has been released and is reviewed, so it was skipped. Creation page scaffolding was updated to avoid clipping issues. New "Link to Top" button added on the Creation page to help user quickly navigate the document.
V.1.2 - Dungeon Master page added, Dungeon Master Beta app added, site styling rebuilt with background image, BS panels, Fontawesome icons, Fontawesome Icon animation, New Character form resizing and restyling, New Character form instructions button and modal added, Save Character form resizing and restyling. 

## Known Issues
V.1.3 - While Social Provider Logins were added, The following register page is unstyled and introduces a inconsistency into the program by registering user's by email - when in fact the website login process is intended to run with usernames to maintain anonymity. User's register with their email and while there is no inherant problem, it will cause issues eventually if not updated to also take a username upon registering this way. 
V.1.2 - Dungeon Master page is in beta, and its only functionality is making creature instances and viewing a short set of details about them. Links on the New Character form stay highlighted when clicked on a mobile device. Selecting a background in the form and then returning the option to blank does not clear the binded model, and the link will still jump you to the previous selection. 

## Languages

### HTML 5
HTML 5 is the building block for each view in the program, and is used heavily.

### CSS 3
CSS 3 controls a few animations in the application on the New Character form, as well as a set of custom styles and a font to add flair to the layout.

### Bootstrap 3
BS3 is the building block of the application's responsive scaffolding design, allowing it to be used by a variety of different devices with ease. BS3 also works with angular to create UX friendly directives such as the dropdown menu and alert. Aditionally, Bootstrap provides a rich selection of styling classes that give the website a finished touch. 

### Typescript
Typescript is a javascript superset that allows clean and smart coding with ease. Typescript handles the majority of the logic behind the applications UI - heavily in the CreationController, SaveController, and DungeonController. With Typescript I break up my logic between the view's controller and a service to keep my code read-able.

### Angular JS 1
Angular JS is like the glue of the front end - facilitating many important features within its UI including databinding and dependency injection and responsive directives like the modal dropdown and alert.

### C Sharp
C# is the language of the back-end of the application. C# handles the storage of all data to be kept in the database such as created characters or Dungeon Master templates. It also handles the storage of all user information in the program, and the validation of such.


