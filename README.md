# Simple-Tabs
Плагин на jQuery.

#Использование

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
