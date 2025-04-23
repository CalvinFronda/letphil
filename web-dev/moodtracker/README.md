# 7 day mood tracker

A simple app to practice using state with arrays, numbers and strings.

# How it works

The main functionality is in `handleMoodChange`. We need a way to keep the `recentMood` state length <= 7. We can achieve this by using modulus (% 7) to create a loop from 0 - 7. When we set the `recentMood`, we check if the length of the array is 7 and if it is, use slice to remove the first entry.

# What it doesn't do

- Accurately shows the correct number day. We are simply keeping a counter and incrementing todays day + 1 so it won't know if that day is real.
- Stores any data. No database is saving these previous moods. Refreshing the page will reset the app.




https://github.com/user-attachments/assets/64b1c531-b0ba-4f71-999a-c0200e2d621e

