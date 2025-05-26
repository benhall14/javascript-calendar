# Javascript Calendar
A simple ***lightweight (<3KB)*** pure javascript to generate calendars.

You can pass events using optional parameters.

***File Size is less than 3 KB*** - This is a pure javascript calendar, no jQuery or other dependencies required.

# Usage
Please make sure you have added the script tag added to the head of your page.
```html
<script type="text/javascript" src="js/calendar.min.js"></script>
```

You should probably also make sure you include the calendar.css stylesheet, unless you are creating your own stylesheet.
```html
<link rel="stylesheet" type="text/css" href="css/calendar.css">
```

It's really simple to implement a calendar by adding the HTML element to your page:

```html
    <div id="calendar"></div>
```

Then define your calendar:

```js
    Calendar(document.getElementById('calendar'))
```

By default, the calendar will use the current date as the calendar date, but you can specify a different date passing it through when you initialize.

```js
    Calendar(document.getElementById('calendar'), {date:new Date()})
```

You can add the optional parameters by passing a JavaScript object. For example, by default, the calendar uses the browsers local time for ***Month*** and ***Day*** names. You can override this by passing in your own:

```js
    Calendar(document.getElementById('calendar'), {date:new Date(), days:['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']})
```

Parameter options:
 * 'date' - The date of the calendar to be instantiated.
 * 'class_prefix' - The class prefix to be used for the calendar. Default is 'javascript-calendar'.
 * 'months' - Override the Month names i.e January, February, March, April, May, June, July, August, September, October, November, December.
 * 'days' - Override the day names i.e Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday.
 * 'events' - The formatted array of events.

The passed event array must be in the following format:

```js
var events = [
    {start: '2025/04/01', end: '2025/04/07', summary: "Example Event", mask: true},
    {start: '2025/04/14', end: '2025/04/20', summary: "Example Event #2", mask: true},
    {start: '2025/05/05', end: '2025/05/15', summary: "Example Event #3", mask: true}
];
```

Each event must have a start date, end date, summary string and a mask boolean. The mask boolean should be true if you want to 'mask'(block off) event dates, or false.

***Please make sure you include the calendar.css style sheet in the head of your page, unless you choose to use your own style declarations.***

# Requirements
None

# License
Copyright (c) Benjamin Hall, ben@conobe.co.uk
https://conobe.co.uk

Licensed under the MIT license

# Donate?
If you find this project helpful or useful in anyway, please consider getting me a cup of coffee - It's really appreciated :)

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://paypal.me/benhall14)