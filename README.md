# SearchLand E2E test

Here you should have everything you need to complete the test
## Process

1. Fork the repository
2. Clone and install your forked repo
3. Compelte the test and commit your changes
4. Send me the link to the forked repo and give me access to see it (archiekd (https://github.com/archiekd))


## Requirements

1. Create a popover component
   1. It should look the same as the following [popover](https://ant.design/components/popover/)
   2. You may not use antd to build this component or any other library
   3. It shoudl take the following props at a minimum
      1. trigger
      2. title
      3. content
      4. placement
   4. It should be able to take at least two position left and right
   5. It should be able to be triggered by hover or click 
   6. It does not require to have animations
   7. You must use styled components
   8. Any components you need you must build

## Completion notes

Limitations and solutions:
* As per requirements, we only support left and right, without animations
* The buttons aren't nicely styled as they werent in scope.
* The current implementation does not adapt when the popover content would appear off the screen (ie if the trigger is close to screen bounds)
   * I would solve this by detecting the popover position and width at run time, and switching the placement to the opposite side. This appears to be roughly how antd does it.
* The current implementation does not adapt to screen sizes, without first closing the popover and reopening.
   * I would solve this by using a resize observer, most likely, applied to the trigger element. Then, when the trigger element repositions, the popover positions would be updated accordingly.
* The usage of styled isn't overly complex. Could be greatly improved with theming, etc.