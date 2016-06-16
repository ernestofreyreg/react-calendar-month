# React Calendar Month Component

React Calendar Month Component renders a calendar panel where you can 
put individual components on each day cell. It includes basic styling 
using flexbox css to layout the elements on the calendar.

## Usage

**Empty calendar panel**

```
<Month month={1} year={2016} />
```

**Calendar panel with daily data**

```
const data = {
  1: {component: <DayData>Jane</DayData>},
  3: {component: <DayData>Jon</DayData>},
  7: {component: <DayData>Max</DayData>},
  8: {component: <DayData>Lorraine</DayData>},
  9: {component: <DayData>Patrick</DayData>, className: 'today'},
  12: {component: <DayData>Sam</DayData>},
  20: {component: <DayData>Vera</DayData>},
  23: {component: <DayData>Loise</DayData>}
};

<Month month={2} year={2016} data={data}/>
```

**Calendar panel with custom styling**

```
// Styles
.MyMonth { background-color: #ddd; color: black; }
.MyMonth .Week .Day > .Day__number { font-size: 20px; color: #aaa; bottom: 4px; top: auto; }
.MyMonth .Week .EmptyCell { background-color: white; }

// JS
<Month month={2} year={2016} className="MyMonth"/>
```

## Storyboard and code examples

https://ernestofreyreg.github.io/react-calendar-month/

## Next

- More tests needed
- Flag to render week day names
- Other ideas, write me at @efreyreg