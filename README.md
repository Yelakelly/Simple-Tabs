# Simple-Tabs
Плагин на jQuery.

## Использование

### HTML

```html
    <div class="j-tab">
        <div class="j-tab-nav">
          <div class="j-tab-button">First</div>
          <div class="j-tab-button">Second</div>
          <div class="j-tab-button">Third</div>
          <div class="j-tab-button">Fourth</div>
        </div>
        <div class="j-tab-content">
          <div class="j-tab-elem">1</div>
          <div class="j-tab-elem">2</div>
          <div class="j-tab-elem">3</div>
          <div class="j-tab-elem j-tab-elem--active">4</div>
        </div>
```

### Code

```javascript
var tabs = $('.j-tab').tab({
    tabNav: ".j-tab-nav",
    tabButton: ".j-tab-button",
    tabContent: ".j-tab-content",
    tabElem: ".j-tab-elem",
    tabElemActive: "j-tab-elem--active",
    tabButtonActive: "tab-button--active",
    defaultTab: 0,
    changeTab: this.changeTab,
    events: {
        beforeChangeTab: function(){console.log('Before changing the tab');},
        afterChangeTab: function(){console.log('After changing the tab');},
        onChangeTab: function(){console.log('On changing the tab');}
    }
});
```
