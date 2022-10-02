# battleship
Mimicking the battle ship board game and exercising some TDD practice.



---------
Notes: 

1) Array.fill(new Array()) will NOT populate the array with a *different* array in each index. Instead, all the indices will refer to the *same* array. This was uncovered when testing receiveAttack and trying to sink a ship. To get around this, instead use Array.from(new Array(1st dimension size), x => new Array(2nd dimension size)). This creates a new array with the mapping function to create a new array of the desired size for the second dimension.

This solidifies a major benefit of TDD. If I were not following TDD closely, I may have uncovered this issue when testing on the DOM, which would have been way later in the development process. For example, I would be testing the eventListener, any DOM manipulating methods, etc before I found the true cause. This probably saved a good amount of work tracking down exactly where the issue came from, due to this unit testing. 

