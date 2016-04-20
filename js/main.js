(function($){
  $.fn.tab = function(options){
  
    var settings = $.extend(true,{
          // These are the defaults.
          tabNav: ".j-tab-nav",
          tabButton: ".j-tab-button",
          tabContent: ".j-tab-content",
          tabElem: ".j-tab-elem",
          tabElemActive: "j-tab-elem--active",
          tabButtonActive: "tab-button--active",
          defaultTab: 0,
          changeTab: this.changeTab,
          events:{
            onChangeTab: function(){},
            afterChangeTab: function(){},
            beforeChangeTab: function(){}
          }
    }, options );

    var plugin = this;

    plugin.clearActiveElements = function(){
      $(settings.tabElem).removeClass(settings.tabElemActive);
      $(settings.tabButton).removeClass(settings.tabButtonActive);
    }

    plugin.addActiveElement = function(i,j){
      $(i).addClass(j);
    }

    plugin.changeTab = function(n){
      settings.events.beforeChangeTab.call();

      var tabButton = $(settings.tabButton).eq(n);
      var tabElem = $(settings.tabElem).eq(n);
      plugin.clearActiveElements();
            plugin.addActiveElement(tabButton,settings.tabButtonActive);
      plugin.addActiveElement(tabElem,settings.tabElemActive);

      settings.events.afterChangeTab.call();
    }
    
    $(settings.tabButton).bind('click',function(){
      settings.events.onChangeTab.call();
      currentIndex = $(this).index();
      plugin.changeTab(currentIndex);
    });
    
    return this;
   }
}(jQuery));

var tabs = $('.j-tab').tab({
  events: {
    beforeChangeTab: function(){console.log('Before changing the tab');},
    afterChangeTab: function(){console.log('After changing the tab');},
    onChangeTab: function(){console.log('On changing the tab');}
  }
});
