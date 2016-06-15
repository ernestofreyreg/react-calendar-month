import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Month from '../index';
import '../styles.css';
import './stories.css';

const STORY_WITH_STYLES = `// Styles
.MyMonth { background-color: #ddd; color: black; }
.MyMonth .Week .Day &gt; .Day__number { font-size: 20px; color: #aaa; bottom: 4px; top: auto; }
.MyMonth .Week .EmptyCell { background-color: white; }

// JS
&lt;Month month={2} year={2016} className=&quot;MyMonth&quot;/&gt;
`;

const STORY_WITH_DATA = `// Styles
.MyMonthWithData .Week .Day &gt; .Day__number { 
  background-color: #ccc; font-size: 10px; 
  color: #fff; bottom: 4px; top: auto; border-radius: 10px;  }
.MyMonthWithData .Week .Day.today { background-color: rgba(46, 175, 60, 0.25); }
.DayData { 
  margin: 3px; background-color: #0b97c4; 
  color: white; border-radius: 10px; line-height: 19px; 
  font-size: 12px; text-align: center; }

// JS
const data = {
  1: {component: &lt;DayData&gt;Jane&lt;/DayData&gt;},
  3: {component: &lt;DayData&gt;Jon&lt;/DayData&gt;},
  7: {component: &lt;DayData&gt;Max&lt;/DayData&gt;},
  8: {component: &lt;DayData&gt;Lorraine&lt;/DayData&gt;},
  9: {component: &lt;DayData&gt;Patrick&lt;/DayData&gt;, className: &#39;today&#39;},
  12: {component: &lt;DayData&gt;Sam&lt;/DayData&gt;},
  20: {component: &lt;DayData&gt;Vera&lt;/DayData&gt;},
  23: {component: &lt;DayData&gt;Loise&lt;/DayData&gt;}
};

&lt;Month month={2} year={2016} className=&quot;MyMonthWithData&quot; data={data}/&gt;
`;

function createMarkup(s) { return { __html: s }; }
class StoryWithCodeExample extends React.Component {
  static propTypes = {
    codeExample: React.PropTypes.string.isRequired,
    children: React.PropTypes.element.isRequired,
  };

  render() {
    return (
      <div className="story">
        <div className="code-example">
          <pre>
            <code dangerouslySetInnerHTML={createMarkup(this.props.codeExample)} />
          </pre>
        </div>
        <div className="component-example">
          {this.props.children}
        </div>
      </div>
    );
  }
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const singleMonth = storiesOf('Single Month 2016', module);
MONTH_NAMES.forEach((monthName, i) => {
  singleMonth.add(`${monthName}/2016`, () => (
    <StoryWithCodeExample codeExample={`&lt;Month month={${i + 1}} year={2016}/&gt;`}>
      <Month month={i + 1} year={2016} />
    </StoryWithCodeExample>
  ));
});

storiesOf('2 Months at once', module)
  .add('January - February / 2016', () => (
    <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
      <div style={{ display: 'inline-flex', flexGrow: 8, flexDirection: 'column' }}>
        <Month month={1} year={2016} />
      </div>
      <div style={{ display: 'inline-flex', flexGrow: 1 }}></div>
      <div style={{ display: 'inline-flex', flexGrow: 8, flexDirection: 'column' }}>
        <Month month={2} year={2016} />
      </div>
    </div>
  ));

storiesOf('CSS Styling', module)
  .add('January/2016', () => (
    <StoryWithCodeExample codeExample={STORY_WITH_STYLES}>
      <Month month={2} year={2016} className="MyMonth" />
    </StoryWithCodeExample>
  ));

class DayData extends React.Component {
  static propTypes = {
    children: React.PropTypes.element.isRequired,
  };

  render() {
    return (<div className="DayData">{this.props.children}</div>);
  }
}

storiesOf('With Data', module)
  .add('February/2016', () => {
    const data = {
      1: { component: <DayData>Jane</DayData> },
      3: { component: <DayData>Jon</DayData> },
      7: { component: <DayData>Max</DayData> },
      8: { component: <DayData>Lorraine</DayData> },
      9: { component: <DayData>Patrick</DayData>, className: 'today' },
      12: { component: <DayData>Sam</DayData> },
      20: { component: <DayData>Vera</DayData> },
      23: { component: <DayData>Loise</DayData> },
    };
    return (
      <StoryWithCodeExample codeExample={STORY_WITH_DATA}>
        <Month month={2} year={2016} className="MyMonthWithData" data={data} />
      </StoryWithCodeExample>
    );
  });
