# Quest-Guide
A website in progress aiming to simplify DND character creation, and facilitate Dungeon Master organization.

## Motivation

DND literature can be difficult to understand at times, so my goal is to create a fast paced
application to expedite the process while still showcasing important game details.

## Current Status
V.1.2 - Dungeon Master page added, Dungeon Master Beta app added, site styling rebuilt with background image, BS panels, Fontawesome icons, Fontawesome Icon animation, New Character form resizing and restyling, New Character form instructions button and modal added, Save Character form resizing and restyling. 

## Known Issues 
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


