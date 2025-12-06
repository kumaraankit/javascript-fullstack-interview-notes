# Event Bubbling vs Event Capturing (Trickling)

## Introduction

In the browser's event propagation model, there are **three phases**: 1.
**Capturing Phase (Event Trickling)** -- event moves **from the window →
document → root → down to the target**. 2. **Target Phase** -- event
reaches the exact element clicked. 3. **Bubbling Phase** -- event moves
**from the target → up to root → document → window**.

------------------------------------------------------------------------

## Event Capturing (Trickling)

Event Capturing means the event is caught **from outermost element
first** before reaching the inner target.

### Example -- Capturing

``` html
<!DOCTYPE html>
<html>
<body>
  <div id="parent" style="padding:20px; background:#d1e7dd;">
    Parent
    <button id="child">Click Me</button>
  </div>

  <script>
    document.getElementById("parent").addEventListener("click", () => {
      console.log("Parent clicked (capturing)");
    }, true); // capturing mode

    document.getElementById("child").addEventListener("click", () => {
      console.log("Child clicked (capturing)");
    }, true);
  </script>
</body>
</html>
```

### Output Order (Capturing Mode)

    Parent clicked (capturing)
    Child clicked (capturing)

------------------------------------------------------------------------

## Event Bubbling

Event Bubbling means the event is first handled by the **innermost
target**, then moves outward.

### Example -- Bubbling

``` html
<!DOCTYPE html>
<html>
<body>
  <div id="parent" style="padding:20px; background:#cfe2ff;">
    Parent
    <button id="child">Click Me</button>
  </div>

  <script>
    document.getElementById("parent").addEventListener("click", () => {
      console.log("Parent clicked (bubbling)");
    }); // bubbling (default)

    document.getElementById("child").addEventListener("click", () => {
      console.log("Child clicked (bubbling)");
    });
  </script>
</body>
</html>
```

### Output Order (Bubbling Mode)

    Child clicked (bubbling)
    Parent clicked (bubbling)

------------------------------------------------------------------------

## Key Differences

  -------------------------------------------------------------------------------------------
  Feature     Event Capturing (Trickling)                Event Bubbling
  ----------- ------------------------------------------ ------------------------------------
  Direction   Top → Down                                 Bottom → Up

  Default     No                                         Yes
  Behavior                                               

  Use Case    Rare; used for special control             Most common event model

  Event       `addEventListener(event, handler, true)`   `addEventListener(event, handler)`
  Listener                                               
  -------------------------------------------------------------------------------------------

------------------------------------------------------------------------

## Which One Should You Use?

-   **Bubbling** is the default and most widely used.
-   **Capturing** is used only when you need a parent to catch an event
    *before* it reaches children.

------------------------------------------------------------------------

## Stopping Propagation

You can stop both capturing and bubbling using:

``` js
event.stopPropagation();
```

------------------------------------------------------------------------

## Summary

-   **Capturing (trickling)** → event goes from **top to bottom**.
-   **Bubbling** → event goes from **bottom to top**.
-   Bubbling is the **default** and most common.
-   Capturing is used with the `true` flag in `addEventListener`.
