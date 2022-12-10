Quite happy with the code after refactor. The first draft was checking for noop command and returning early, but the code becomes quite confusing as it was

```
tick();

if (command === "noop") {
    return;
}

tick();
...
```

Reversing the conditional to check for addx makes the code more straightforward to read.

Also, for the part two, I got stuck for a bit because I thought the sprite position would be in line as the cycle. It turns out the sprite position will always be in the range of 0-40 so I have to mod the cycle count before comparing it to the sprite position.
