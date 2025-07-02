slightly more detailed comments are written inside the actual js file. 

Looking at the rubric, i finished all of the points except for the letters needing to be sequential/next to eachother. 
Every other function works on my end so please lmk if there are errors running. 


JAVASCRIPT:
=========================================================================
TILE CLASS:
- support class that templates the info and attributes required for the tiles.

BAG CLASS:
- Converts Jesse's Associative Array into an array of Tile Objects that matches the reccomended/required distribution.
- Has a function to draw and remove a random tile from the "Bag" and return the div/wrapper to be displayed.
- getter function to check if bag is empty

HAND CLASS:
- Manages all functionality around the player's hand/ tile rack
- can draw full new hand shuffling old tiles back into bag, or refill the hand with new letters without discard the existing ones. 
- getter func for checking current hand count, and also a discard function to clear everything. 

GAME CLASS:
- Handles all game logic.
- Constructor takes in supporting class objects, adds event listeners for tile moving functionality, and then sets up buttons.
- Draw function shuffles existing tiles back into bag and draws 7 new tiles. doesn't matter if its empty.
- scoreboard function manages internal "point" attributes and manages the ui scoreboard to accurately display the current score and total score.
- submitplay function activates with submit function. removes all tiles from board, adds round score to total, refills player hand, and updates scoreboard ui.

=========================================================================
HTML: is very simple. 
- Very basic page layout with a header body and footer.
- a css grid for the playable aspect of the board.
- buttons are all wired inside the JS classes where i thought made sense.
- totally ripped a random image off google for the website Tab Icon.

=========================================================================

CSS:
- I use flexboxes to manage everything's placement and used align-items/justify-content to center everything. 
- Basic margin and padding nothing special.
- Linear Gradient() Function for page background. Just fades one color into another.
- used URL() for double word and letter image backgrounds.
- i tried to organize em best i could. its prob stil random as heck tho sorry.
=========================================================================
Sources: No direct sources but some tutorials did help.
- https://youtu.be/XF1_MlZ5l6M?si=HxvUExji-oWF-SPK
- https://youtu.be/4AHot187Lj0?si=oCtethNqtj5UUb1x
- https://youtu.be/b13NSWyQ0tw?si=kHp2AFdnJHcTUsuo
- https://youtu.be/iiADhChRriM?si=B9XzgOrCDQu2l67Z
- https://developer.mozilla.org/en-US/docs/Web

