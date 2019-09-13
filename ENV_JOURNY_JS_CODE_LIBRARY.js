
/* CONFIGURATION OBJECTS (TEMPORARY) */

var tableSawConfigs = {
	default: {
		tableClass: 'tablesaw',
		tableAttributes: {
			'data-tablesaw-mode': 'columtoggle',
			//'data-tablesaw-minimap': '',
                        'data-tablesaw-sortable': ''
		},
		tableColumnAttributes: {
			firstColumnPersist: true,
			firstColumnSortable: false
		}
	},
nosorting: {
		tableClass: 'tablesaw',
		tableAttributes: {
			'data-tablesaw-mode': 'columtoggle'
			//'data-tablesaw-minimap': ''
		},
		tableColumnAttributes: {
			firstColumnPersist: true,
			firstColumnSortable: false
		}
	}
};


/* 
COLLECTION OF FUNCTION DEFFINITIONS
FUNCTIONS WILL BE INVOKED AFTER DOCUMENT IS FULLY LOADED
*/


// --------------------  HELP FUNCTIONS --------------------
   
//meta-creator, pass array of objects [{'prop', 'value'}]
function addMeta(arr) {
    if (Array.isArray(arr)) {
        arr.forEach(function (el) {
            if (el && typeof el === 'object') {
                var meta = document.createElement('meta');
                for (var prop in el) {
                    meta.setAttribute(prop, el[prop]);
                }
                document.head.appendChild(meta);
            }
        });
    }
};

// gets an ancestor element by class name
// @param {Element} el - the current element
// @param {string} cls- the class name requested
// @return {Element} - the nearest ancestor element with the specified class name
function findAncestor(el, cls) {
	while ((el = el.parentElement) && !el.classList.contains(cls));
	return el;
}


// gets the list of sibling elements of the current element
// @param {Element} el - the current element
// @return {array} - the list of sibling elements, i.e. get all the children of the parent element excluding the current node itself from the result set
function getSiblings(el) {      
	var siblings = [];
        var iter= el.parentNode.firstChild;
	for ( ; iter; iter= iter.nextSibling) 
	   if (iter.nodeType == 1 && iter  != el)
               siblings.push(iter);        
	return siblings;
}


// toggle view state of nav menu on small screens
// @param {string} nodeSelectorString - querySlector string defining the node (one)
// @param {string} addClass - class that will be added to the found node
// @param {string} removeClass - class that will be removed from the found node
function toggleViewState(nodeSelectorString, addClass, removeClass) {
	var node = document.querySelector(nodeSelectorString);	
	node.classList.add(addClass);
	node.classList.remove(removeClass);
}



//  function to get the height of a text node 
// @param {Node} textNode
// @return {Int} height of a text node

function getTextNodeHeight(textNode) {
    var height = 0;
    if (document.createRange) {
        var range = document.createRange();
        range.selectNodeContents(textNode);
        if (range.getBoundingClientRect) {
            var rect = range.getBoundingClientRect();
            if (rect) {
                height = rect.bottom - rect.top;
            }
        }
    }
    return height;
}


// --------------------  HELP FUNCTIONS END --------------------   

// --------------------  GENERAL NO DATA MESSAGE START --------------------   

function generalNoDataCheck(){

        // Get the display text from the config
       var strMessage = ReportTemplateConfig.noDataWarning;

        // Card Type: Card Content
	var trendCardContent = Array.prototype.slice.call(document.querySelectorAll(".card__content div"));
	trendCardContent.forEach(function (item) {

		// General card code
		if(item.innerHTML == strMessage){

			item.innerHTML = strMessage;

			item.classList.add("NoDatatoDisplay");
			item.classList.add("NoDatatoDisplay_FontMedium");
			//console.log("trendCardContent");

			// WordCloud needs this class to render but when no data, we remove so it sizes correctly on page
			if(item.classList.contains('cloud')){
				item.classList.remove('cloud');
			}
		}

	});

        // TREND CHART
        // object only renders if data present so we have to check if the container has children
        var trendChart = Array.prototype.slice.call(document.querySelectorAll(".card__chart-container"));
        trendChart.forEach(function (item) {
            if(item.children.length == 0 ){

                item.innerHTML = strMessage;

	        item.classList.add("NoDatatoDisplay");
                item.classList.add("NoDatatoDisplay_FontMedium");
                //console.log("trendChart");
            }
        });

        // TREND TABLE Type 1: No Data returned
        var trendTable_1 = Array.prototype.slice.call(document.querySelectorAll(".card__table-container .table-container_results #errtab tbody tr td"));
            trendTable_1.forEach(function (item) {

                item.innerHTML = strMessage;

		item.classList.add("NoDatatoDisplay");
                item.classList.add("NoDatatoDisplay_FontMedium");
                //console.log("trendTable_1");
        });

        // TREND TABLE Type 2: Error displayed
        var trendTable_2 = Array.prototype.slice.call(document.querySelectorAll(".card__table-container #errtab tbody tr td"));
            trendTable_2.forEach(function (item) {

                item.innerHTML = strMessage;

		item.classList.add("NoDatatoDisplay");
                item.classList.add("NoDatatoDisplay_FontMedium");
                //console.log("trendTable_2");
        });

        // TREND TABLE Type 3: No data at all
        var trendTable_3 = Array.prototype.slice.call(document.querySelectorAll(".card__table-container .table-container_results"));
            trendTable_3.forEach(function (item) {
                if(item.children.length == 0 ){

                    item.innerHTML = strMessage;

		    item.classList.add("NoDatatoDisplay");
                    item.classList.add("NoDatatoDisplay_FontMedium");
                    //console.log("trendTable_3");
                }
        });

        // Card Type: KPI Gauge
        var trendKPIGauge = Array.prototype.slice.call(document.querySelectorAll(".layout__card.card_type_kpi .full-gauge__score"));
            trendKPIGauge.forEach(function (item) {
                if(item.innerHTML == "N/A" ||  item.innerHTML == "NaN"){

                    item.innerHTML = strMessage;

		    item.classList.add("NoDatatoDisplay");
                    item.classList.add("NoDatatoDisplay_FontMedium");
                    //console.log("trendKPIGauge");
                }
        });

        // Card Type: card__hitlist-container empty (no children)
        var hitlist_01 = Array.prototype.slice.call(document.querySelectorAll(".card__hitlist-container"));
        hitlist_01.forEach(function (item) {
                if(item.children.length == 0 || item.querySelector('.hitlist') == null){

                    item.innerHTML = strMessage;

		    item.classList.add("NoDatatoDisplay");
                    item.classList.add("NoDatatoDisplay_FontMedium");
                    
                }
        });

        // Card Type: card__hitlist-container empty (specific scenario)
        var trendHitlist_02 = Array.prototype.slice.call(document.querySelectorAll(".card__chart-container .highcharts-no-data text tspan"));
            trendHitlist_02.forEach(function (item) {
                if(item.innerHTML.trim() == strMessage ){
		    item.classList.add("NoDatatoDisplay");
                    item.classList.add("NoDatatoDisplay_FontMedium");
                    //console.log("trendHitlist");
                }
        });

	// General error message detection
        /*
        // commenting out for now as looking at other scenarios as we don't want the global warning showing at the same time as other warnings being shown
	if(document.getElementsByClassName("global-warning").length == 1){
		// Add Class to get better layout
                document.querySelector(".global-warning").innerHTML = strMessage;

		document.querySelector(".global-warning").classList.add("NoDatatoDisplay");
		document.querySelector(".global-warning").classList.add("NoDatatoDisplay_FontMedium");

		// Special Cleanup
		if(document.getElementsByClassName("card_type_comments").length == 1){
			document.getElementsByClassName("card_type_comments")[0].remove();
		}

	}
        */

	/*  VERBATIM TABLE  */    
	var All_Verbatim_Page = Array.prototype.slice.call(document.querySelectorAll(".card__verbatim-container"));
	All_Verbatim_Page.forEach(function (verbatim) {
		
		// If only the hidden row is available then no actual data rows are present
                // Why || logic blocks - Verbatim table has question text or not so rendered table has slightly different layout
		if(verbatim.querySelectorAll("table tbody tr").length == 1 || verbatim.innerText == "" ){
			
	            // Apply styles so it aligns correctly
                    verbatim.innerHTML = strMessage;

		    verbatim.classList.add("NoDatatoDisplay");
	            verbatim.classList.add("NoDatatoDisplay_FontMedium");  
                    //console.log("trendHitlist");                 
		}

	});

}

// --------------------  GENERAL NO DATA MESSAGE END    --------------------

// --------------------  HEADER BLOCK BEGIN --------------------

// STICKY HEADER
// it sets page padding in order to have sticky header with changable height (client logos can be different)
// that does not hide main content when it's not scrolled
function stickyHeader() {
	
	// timeout needed because of iPhone issue; 
	// when device moves from portrait to landscape header gets ability to show statistics
	// but header width changes later than header height is calculated by resize event fires
	
	setTimeout( function() { 
		var pageHeader = document.querySelector('.page-header');
		var pageHeaderHeight = pageHeader.offsetHeight;
		var page = document.querySelector('.page');
		page.style.paddingTop = pageHeaderHeight + 'px';

		var filterPane = document.querySelector('.filter-pane');
		filterPane.style.top = pageHeaderHeight + 'px';
		filterPane.style.paddingBottom = pageHeaderHeight + 'px';  /* the same value as in the top property so the scroll-bar is enabled from the top to the end */
	}, 100);
}

// --------------------  HEADER BLOCK END --------------------


// --------------------  NAVIGATION BLOCK BEGIN --------------------  

function toggleMobileNavMenu (e) {

        var elem = e.target.tagName === 'path' ? e.target.parentElement : e.target;
	var elemClass = elem.getAttribute('class');
	if(elemClass.indexOf('nav-menu__icon_state_closed')>=0) {		
		showMobileNavMenu();
	} else {
		hideMobileNavMenu();
	}
}

// toggle view state of nav menu on small screens
function showMobileNavMenu() {
	var menu = document.querySelector('.nav-menu');
	menu.setAttribute('class', menu.className.replace(/nav-menu_mobile_closed/g,''));
}

function hideMobileNavMenu() {
	var menu = document.querySelector('.nav-menu');
	menu.classList.add('nav-menu_mobile_closed');
}

/**
* shos/hides pages as per report config
*/

function pageVisibility (menuitem) {
	var menuItemTitle = menuitem.querySelector('li a').innerText.toLowerCase();

	if(!ReportTemplateConfig.pagesToShow.hasOwnProperty(menuItemTitle)) {
		menuitem.classList.add('css-menu-topitem_diplay_none');
	} else {		
		menuitem.querySelector('.css-menu-toplabel').innerHTML = ReportTemplateConfig.pagesToShow[menuItemTitle]; 
                
	}
}

function mobileNavMenuBlur(e) {
	if(e.target !== document.querySelector('.nav-menu__icon_state_closed')) {
		hideMobileNavMenu();
	}
}

// --------------------  NAVIGATION BLOCK END --------------------


// --------------------  ADMIN-MENU BLOCK BEGIN --------------------  

// toggle view state of nav menu on small screens
function toggleAdminMenu(e) {

	var menuOpened = document.querySelector('.admin-menu_state_opened');

	if(!menuOpened) {
		toggleViewState('.admin-menu_type_general', 'admin-menu_state_opened', 'admin-menu_state_closed');
	} else {	
		toggleViewState('.admin-menu_type_general', 'admin-menu_state_closed', 'admin-menu_state_opened');
	}
}

function adminMenuBlur(e) {
	if(e.target !== document.querySelector('.admin-menu_type_general')) {
		toggleViewState('.admin-menu_type_general', 'admin-menu_state_closed', 'admin-menu_state_opened');
	}
}

// --------------------  ADMIN-MENU BLOCK END --------------------


// --------------------  FILTER PANEL BLOCK BEGIN --------------------  

// Show/hide filter side paneL
function toggleFilterPanel() {

  var surveyBtnTxt = ReportTemplateConfig['survey'];
  var filterBtnTxt = ReportTemplateConfig['filters'];

  var panelElem = document.querySelector(".filter-pane");

  panelElem.classList.toggle("filter-pane_expanded");
  var bottom_arrows = Array.prototype.slice.call(panelElem.querySelectorAll(".icon_bottom-arrow"));
  bottom_arrows.forEach(function (el) {
    return el.classList.toggle("js-hidden");
  });
  var up_arrows = Array.prototype.slice.call(panelElem.querySelectorAll(".icon_up-arrow"));
  up_arrows.forEach(function (el) {
    return el.classList.toggle("js-hidden");
  });
  if (panelElem.classList.contains("filter-pane_expanded")) {
    panelElem.querySelector(".icon_survey").nextElementSibling.innerHTML = surveyBtnTxt;
    panelElem.querySelector(".icon_filter").nextElementSibling.innerHTML = filterBtnTxt;
    panelElem.querySelector(".icon_right-arrow").className+=" icon_left-arrow icon_right";   // replace the right arrow icon with the left arrow icon located on the right side
    panelElem.querySelector(".icon_right-arrow").classList.remove("icon_right-arrow");
  } else {
    panelElem.querySelector(".icon_survey").nextElementSibling.innerHTML = '';
    panelElem.querySelector(".icon_filter").nextElementSibling.innerHTML = '';
    panelElem.querySelector(".icon_left-arrow").classList.add("icon_right-arrow");
    panelElem.querySelector(".icon_left-arrow").classList.remove("icon_right");
    panelElem.querySelector(".icon_left-arrow").classList.remove("icon_left-arrow");
    var sections = Array.prototype.slice.call(document.querySelectorAll(".filter-pane__section"));
    sections.forEach(function (elem, index) {
        var submenu = elem.querySelector(".filter-pane__filter-content");
        if (!submenu.classList.contains('js-hidden')) {
          submenu.classList.add('js-hidden');
        }
       if(panelElem.querySelector(".icon_up-arrow")) {
        var arrow_up_btn = panelElem.querySelector(".icon_up-arrow");
	arrow_up_btn.classList.add('icon_bottom-arrow');
	arrow_up_btn.classList.remove('icon_up-arrow');
     }
    });
  }
}


// Show/hide filter section (Survey or Filter sections)
function toggleSubFilterPanel(e) {

	var panelElem = document.querySelector(".filter-pane");

	// if the side panel is collapsed, expand it first and then show/hide the sub-menu
	if (!panelElem.classList.contains("filter-pane_expanded")) {
		toggleFilterPanel();
	}
	var section = findAncestor(e.target, "filter-pane__section"); 
	var subFilterContent =  section.querySelector(".filter-pane__filter-content");
	var arrow_btn = section.querySelector(".icon_bottom-arrow") || section.querySelector(".icon_up-arrow");
	arrow_btn.classList.toggle('icon_bottom-arrow');
	arrow_btn.classList.toggle('icon_up-arrow');
	subFilterContent.classList.toggle('js-hidden');
}

function handleToggleFilter (e) {
     var filterElement = findAncestor(e.target, "filter");
     toggleFilter(filterElement);
}


// Show/hide the filter itself (its content)
function toggleFilter(filterElement) {

	filterElement.classList.toggle('filter_expanded');
	filterElement.querySelector('.filter__selector').classList.toggle('js-hidden');   // show or hide the filter content
	if (!filterElement.classList.contains("js-hidden")) {
	   var neighbourFilterElements =  getSiblings(filterElement);
	   neighbourFilterElements.forEach(function (elem) {
           if(!elem.querySelector('input:checked')) {
		   elem.classList.remove('filter_expanded');
                   var selector = elem.querySelector('.filter__selector');
		   if(selector) { 
                     selector.classList.add('js-hidden');
                  }
            }
       });
    }   
}


// Check/uncheck Reportal checkboxes
function toggleHiddenCheckbox (e) {

   var checkbox= e.target.parentElement.querySelector('input');
   checkbox.click();

}


function addFunctionalButtonsToFilterList(saveBtnText, resetBtnText) {
	window.addEventListener('load', function() {	
		var filterList = document.querySelector('.filter-pane__section_type_filters .filter-pane__filter-content');
		if (filterList) {
			var funcBtnsContainer = document.createElement('div');
			funcBtnsContainer.classList.add('filter-pane__func-btns');
			//funcBtnsContainer.classList.add('filter-list__item');

			var isFirefox = typeof InstallTrigger !== 'undefined';
			var isIE = /*@cc_on!@*/false || !!document.documentMode;
			var isEdge = !isIE && !!window.StyleMedia;
			if (isFirefox || isIE || isEdge) {
				funcBtnsContainer.style.marginBottom = '120px';
			}
			
			var saveBtn = document.createElement('div');
			saveBtn.classList.add('btn');
			saveBtn.classList.add('rpt-button');
			saveBtn.classList.add('redesigned-button');
			saveBtn.classList.add('filter-pane__save-btn');
			saveBtn.innerText = saveBtnText;
			saveBtn.addEventListener('click', function() { __doPostBack(); });
					
			var resetBtn = document.createElement('div');
			resetBtn.classList.add('btn');
			resetBtn.classList.add('rpt-button');
			resetBtn.classList.add('redesigned-button');
			resetBtn.classList.add('filter-pane__reset-btn');
			resetBtn.innerText = resetBtnText;
			resetBtn.addEventListener('click', function() {
				var filterOptions = Array.prototype.slice.call(document.querySelectorAll('.filter-pane__section_type_filters .filter__selector:not(.time-period-picker) input'));
				filterOptions.forEach(function(option) { option.checked = false; })
				var timeFilterOptions = Array.prototype.slice.call(document.querySelectorAll('.filter-pane__section_type_filters .filter__selector.time-period-picker input'));
				timeFilterOptions.forEach(function(option, index) { 
					option.checked = index === 0; 
					if (option.type === "text") {
						option.value = "";
					}
				});
				__doPostBack();
			});
			
			funcBtnsContainer.appendChild(saveBtn);
			funcBtnsContainer.appendChild(resetBtn);
			filterList.appendChild(funcBtnsContainer);
		}
	});
}

// --------------------  FILTER PANEL BLOCK END -------------------- 


// --------------------  CALENDAR BLOCK START -------------------- 

// show hide custom dates selctors
function toggleCustomDates(tpp){
		var customDates = tpp.querySelector('input[value="r:s:CUSTOM"]');
		if(customDates  && customDates.checked) {
			tpp.querySelector('.time-period-picker__calendars').classList.remove('time-period-picker__calendars_hidden');
		} else {
			tpp.querySelector('.time-period-picker__calendars').classList.add('time-period-picker__calendars_hidden');
		};
}

function toggleCustomDatesEventListener(e){

	if(e.target.tagName.toLowerCase() === 'input') {
		var tpp = this; //this = time period panel
		toggleCustomDates(tpp); 
		// if not custom dates option selected, then reload the page
		// and apply new filter
		// no auto-submit (TQA-4602)
                /*
                if(tpp.querySelector('.time-period-picker__calendars_hidden')) {
			 __doPostBack('','');  
		}*/
    }

}

// --------------------  CALENDAR BLOCK END  -------------------- 


// --------------------  CARD -------------------- 

// function to process card view mode switcher (table or chart) and 'remember' the last user's choice
function handleSwitchCardView() {
    switchCardView.call(this);
    sessionStorage['isChartView'] = (sessionStorage['isChartView']== 'true' || sessionStorage['isChartView']==undefined) ? 'false' : 'true';
}

// switch the card view mode - table or chart
function switchCardView() {
        var cardElem = findAncestor (this, 'card'); 
	cardElem.querySelector('.card__chart-container').classList.toggle('js-hidden');
	cardElem.querySelector('.card__table-container').classList.toggle('js-hidden');
        cardElem.querySelector('.icon_table').classList.toggle('js-hidden');
        cardElem.querySelector('.icon_chart').classList.toggle('js-hidden');
        cardElem.querySelector('.card__footnote').classList.toggle('js-hidden');  // footnote text is only for chart view
        if(cardElem.querySelector('.tablesaw-bar')) {
           if (cardElem.querySelector('.card__table-container').classList.contains('js-hidden')) {
               cardElem.querySelector('.tablesaw-bar').classList.add("js-hidden");
           } else {
               cardElem.querySelector('.tablesaw-bar').classList.remove("js-hidden");
           }
        }
}


// function to change the default chart view mode to table mode to keep user's choice
function restoreCardViewFromSession () {
   if (sessionStorage.getItem('isChartView') == 'false') {    
        var cardSwitchers = Array.prototype.slice.call(document.querySelectorAll(".card__switcher"));
        cardSwitchers.forEach(function (item) {
            switchCardView.call(item);
       });
    }
}

function isStickySettingShiffted(setting) {
  return setting.offsetTop > 0;
}

function processStickySettingsOnResize(card){
    var cardClasses = card.className;
    var cardSettingsLine = Array.prototype.slice.call(card.querySelectorAll('.card__settings_sticky'))[0];
    var cardSettingsLineStyle = window.getComputedStyle(cardSettingsLine);
    var cardSettingsLineWidth = parseFloat(cardSettingsLine.offsetWidth) - parseFloat(cardSettingsLineStyle.paddingLeft) - parseFloat(cardSettingsLineStyle.paddingRight);
    var stickySettings = Array.prototype.slice.call(card.querySelectorAll('.card__settings_sticky .card__setting'));
    var settingsWidth = parseFloat(stickySettings.reduce(function (sum, setting) {
        return sum + setting.offsetWidth
    }, 0));

    if (settingsWidth >= cardSettingsLineWidth || (cardClasses.indexOf('card_has-sticky-settings') >= 0 && stickySettings.filter(isStickySettingShiffted).length > 0)) {
        card.classList.remove('card_has-sticky-settings'); // set standard padding
        card.classList.add('card__settings_sticky-disabled'); //style for small screen
    } else if (settingsWidth < cardSettingsLineWidth) {
        card.classList.remove('card__settings_sticky-disabled'); //style for big screen
        card.classList.add('card_has-sticky-settings'); // set padding for sticky settings
    }
}

function processStickyCardsOnResize() {
  var cards = Array.prototype.slice.call(document.querySelectorAll('.card_has-sticky-settings, .card__settings_sticky-disabled'));
  cards.forEach(processStickySettingsOnResize);
}

// --------------------  CARD END -------------------- 



// -------------------- TABLESAW -------------------

/**
*Get proper tablesaw config
*@param {Element} table container
*@return {Object} tablesaw config
*/

function isSortingAllowed(tableContainer) {
	return !tableContainer.querySelector('tbody td[rowspan]'); //if nested headers exist
}


/**
*Get proper tablesaw config
*@param {Element} table container
*@return {Object} tablesaw config
*/
function getTablesawConfig(tableContainer) {
	
	var configName = tableContainer.getAttribute('tablesaw-config');
	var config = tableSawConfigs[configName];

	 if(!config) {
		console.error('getTablesawConfig: Tablesaw config "'+configName+'" wasn\'t found for table')
		console.error(tableContainer);
		return;
	 } 
	 
	 if(!isSortingAllowed(tableContainer)) {
		 delete config.tableAttributes['data-tablesaw-sortable'];
	 }
	 
	 return config;
}

/**
*Apply tablesaw classes based on config
*@param {Element} table container
*@param {Object} tablesaw config
*/
function setTableClassPerConfig(table, config) {	
	table.setAttribute('class', config.tableClass);
}

/**
*Add tablesaw attributes based on config
*check https://github.com/filamentgroup/tablesaw for available attributes
*@param {Element} table container
*@param {Object} tablesaw config
*/
function setTableAttributesPerConfig(table, config) {
	
	var attributes = config.tableAttributes;
	
	for(var attr in attributes) {
		table.setAttribute(attr, attributes[attr]);
	}
}

/**
*Process table headers
*@param {Element} table container
*@param {Object} tablesaw config
*/
function processThPerConfig(table, config) {

	var theaders = Array.prototype.slice.call(table.querySelectorAll('th'));
	var columnAttributes = config.tableColumnAttributes;
	var sortingAttributes = getColumnSortingAttributes(table.querySelector('tbody tr'));

	theaders.forEach(function(th, colNum) {
		
		if(isHeaderNotEmpty(th)) {
			th.setAttribute('scope', 'col');
			if(colNum === 0){
				if(columnAttributes.firstColumnPersist) {
                                	th.setAttribute('data-tablesaw-priority', 'persist');
                                }                           
				columnAttributes.firstColumnSortable ? th.setAttribute('data-tablesaw-sortable-col','') : 0;
			} else {
				th.setAttribute('data-tablesaw-priority', 1);
				th.setAttribute('data-tablesaw-sortable-col','');
				config.tableAttributes['data-tablesaw-sortable'] ? th.setAttribute('data-tablesaw-sortable-col','') : 0;
			}

			th.setAttribute(sortingAttributes[colNum],'');	
		}		
	});
}


/**
*Define attributes that define how sorting works based on column content
*@param {Element} table row
*@param {Array} array of defined attributes; num of cols = num of array elements
*@param {Number} number of known attributes
*@return {Array} attributes
*/
function getColumnSortingAttributes(row, attributes, definedAttrNum) {

	var cells = row.querySelectorAll('td'); // get cells in a row
	
	if(!attributes) { // if attributes array is not defined create it
		attributes = new Array(cells.length);
		definedAttrNum = 1; // number of columns with known sorting type; 1 because of column with row headers
	}
		
	for(var i=1; i<cells.length; i++) { // loop through columns
		
		if(!attributes[i]) { // sorting type is not defined for the column
			var value = cells[i].innerHTML;
			var txtVal =  cells[i].innerText;
			
			if(txtVal !== '' && !isNaN(Number(value))) { // try to convert to number -> number sorting
				attributes[i] = 'data-tablesaw-sortable-num';
				definedAttrNum+=1;
			} else if(cells[i].querySelector('.barchart') && value.indexOf('barchart__bar_type_distribution')>=0) { // if distribution barchart is found
				attributes[i] = 'data-tablesaw-sortable-distribution';
				definedAttrNum+=1;
			} else if(cells[i].querySelector('.barchart') && value.indexOf('barchart__bar_type_score-vs-norm')>=0) { //if score vs norm barchart is found
				attributes[i] = 'data-tablesaw-sortable-scorevsnorm';
				definedAttrNum+=1;
			}
		}
	}
	
	if(cells.length === definedAttrNum || !row.nextElementSibling) { // all sorting attributes defined or table is over
		return attributes;
	}	
	
	getColumnSortingAttributes(row.nextElementSibling, attributes, definedAttrNum); // repeat the process
    return attributes;
}

/**
*@param {Number}
*@param {Element} 
*@return {Number}
*/
function calcChartSectionWidth(sum, node) {
	return sum + parseInt(node.style.width); 
};

/**
* Save value of norm vs score difference in an attribute (used in sorting)
*/
function setAttributesForScoreVsNormBarChart() {
	
	var positiveColor = ReportTemplateConfig.Styling.barChartColors_NormVsScore[0].color;//pull from Config
	var negativeColor = ReportTemplateConfig.Styling.barChartColors_NormVsScore[1].color;

	var posCells = Array.prototype.slice.call(document.querySelectorAll('.barchart__bar_type_score-vs-norm[style*="background:'+positiveColor+'"]'));
	var negCells =Array.prototype.slice.call(document.querySelectorAll('.barchart__bar_type_score-vs-norm[style*="background:'+negativeColor+'"]'));
	var value;

	posCells.forEach(function(cell) {
	   value = cell.parentElement.parentElement.nextElementSibling; // barchart value is in previous column
	   value.classList.add('table__cell_hidden');
	   cell.setAttribute('norm_vs_score_pos', value.innerHTML);
	});

	negCells.forEach(function(cell) {
	   value = cell.parentElement.parentElement.nextElementSibling;
	   value.classList.add('table__cell_hidden');
	   cell.setAttribute('norm_vs_score_neg', value.innerHTML);
	})
}

/**
*Assign sorting functions
*/
function applySorting() {	

	$( "th[data-tablesaw-sortable-num]" ).data( "tablesaw-sort", function( ascending ) {

		return function( a, b ) {
			
			var aVal = Number(a.element.innerHTML);
			var bVal = Number(b.element.innerHTML);
			
			aVal = isNaN(aVal) ? -100000 : aVal;
			bVal = isNaN(bVal) ? -100000 : bVal;
			
			if( ascending ) {
				return aVal >= bVal ? 1 : -1;
			} else { // descending
				return aVal < bVal ? 1 : -1;
			}

		};
	});

	

	$( "th[data-tablesaw-sortable-distribution]" ).data( "tablesaw-sort", function( ascending ) {
		return function( a, b ) {

			var aNodesPos =  Array.prototype.slice.call(a.element.querySelectorAll('.barchart__bar_type_distribution.Positive'));	   
			var bNodesPos =  Array.prototype.slice.call(b.element.querySelectorAll('.barchart__bar_type_distribution.Positive'));
			var aWidthPos = aNodesPos.reduce(calcChartSectionWidth, 0); // positive scale can consits of several parts, that's why reduce
			var bWidthPos = bNodesPos.reduce(calcChartSectionWidth, 0);

			if(aWidthPos+bWidthPos>0) {
				if( ascending ) {
					return aWidthPos >= bWidthPos ? 1 : -1;
				} else { // descending
					return aWidthPos < bWidthPos ? 1 : -1;
				}
			}
			
			var aNodesNeu =  Array.prototype.slice.call(a.element.querySelectorAll('.barchart__bar_type_distribution.Neutral'));	   
			var bNodesNeu =  Array.prototype.slice.call(b.element.querySelectorAll('.barchart__bar_type_distribution.Neutral'));
			var aWidthNeu = aNodesNeu.reduce(calcChartSectionWidth, 0);
			var bWidthNeu = bNodesNeu.reduce(calcChartSectionWidth, 0);

			if(aWidthNeu+bWidthNeu>0) {
				if( ascending ) {
					return aWidthNeu >= bWidthNeu ? 1 : -1;
				} else { // descending
					return aWidthNeu < bWidthNeu ? 1 : -1;
				}
			}
			
			var aNodesNeg =  Array.prototype.slice.call(a.element.querySelectorAll('.barchart__bar_type_distribution.Neutral'));	   
			var bNodesNeg =  Array.prototype.slice.call(b.element.querySelectorAll('.barchart__bar_type_distribution.Neutral'));
			
			if( ascending ) {
				return aNodesNeg.length >= bNodesNeg.length ? 1 : -1;
			} else { // descending
				return aNodesNeg.length < bNodesNeg.length ? 1 : -1;
			}

		};
	});
	
	$( "th[data-tablesaw-sortable-scorevsnorm]" ).data( "tablesaw-sort", function( ascending ) {

		return function( a, b ) {
			var aNode = a.element.querySelector('.barchart__bar_type_score-vs-norm');
			var bNode = b.element.querySelector('.barchart__bar_type_score-vs-norm');
			
			if(!aNode || !bNode) {
				if(ascending) {
					return ((!aNode && !bNode) || (aNode && !bNode)) ? 1 : -1;
				} else {
					return (aNode && !bNode) ? -1 : 1;			
				}
			}
			
			var aValue = aNode.getAttribute('norm_vs_score_pos')!=null ? parseInt(aNode.getAttribute('norm_vs_score_pos')) : parseInt(aNode.getAttribute('norm_vs_score_neg'));
			var bValue = bNode.getAttribute('norm_vs_score_pos')!=null ? parseInt(bNode.getAttribute('norm_vs_score_pos')) : parseInt(bNode.getAttribute('norm_vs_score_neg'));
			
			if( ascending ) {
				return aValue >= bValue ? 1 : -1;
			} else { // descending
				return aValue < bValue ? 1 : -1;
			}

		};
	});
}


/**
*Filter off help empty headers/columns
*@param {Element} table header
*@return {Boolean}
*/
function isHeaderNotEmpty(th) {
	return th.innerHTML === '' ? false : true;
}

/**
* Reportal generated tables have td tags instead of th. This function fixes that.
* @param {Element} table
*/
function fixTheadCellTags(table) {
	var thead = table.querySelector('thead');
	thead.innerHTML = thead.innerHTML.replace(/td/g,'th');
}


/** when sorting is activated dimesion headers get hidden
*/

function hideDimensionHeaders(e) {
	var colHeader = e.target;
	var table = findAncestor(colHeader, 'tablesaw-sortable');
	var dimensionHeaders = Array.prototype.slice.call(table.querySelectorAll('.table-container__row_total'));
	
	dimensionHeaders.forEach(function(header){
		header.classList.add('table-container__row_hidden');
	});
}

/**
*modify table to support tablesaw plug-in
*@param {Element} table container
*/

function applyTableSawToATable(tableContainer) {

    var table = tableContainer.querySelector('table');
	var config = getTablesawConfig(tableContainer);

	if(table && table.querySelector('td')) {
		fixTheadCellTags(table);
		
		setTableClassPerConfig(table, config);
		setTableAttributesPerConfig(table, config);
		
		processThPerConfig(table, config);
	}
}

/**
* apply table saw to all tables
*/
function applyTableSaw() {

   var tables = Array.prototype.slice.call(document.querySelectorAll('.table-container'));
   tables.forEach(applyTableSawToATable);

   setAttributesForScoreVsNormBarChart();
   applySorting();
   Tablesaw.init();

   //otherwise native tablesaw script removes this event handler
   setTimeout(function() { 
        var colHeaders = Array.prototype.slice.call(document.querySelectorAll('.tablesaw-sortable-btn'));
	colHeaders.forEach(function(colHeader){
		colHeader.addEventListener('click', hideDimensionHeaders);
                colHeader.setAttribute('title', ReportTemplateConfig.translations.Sorting);
	});
   }, 500);

}

// -------------------- TABLESAW END -----------------


// --------------------  TABLE -------------------- 
/**
*Leave only title as dimension total
*@param {Element} table total row header
*/
function hideTotalData(totalHeader) {

	var totalRowCount = totalHeader.rowSpan;
	totalHeader.removeAttribute('rowspan'); //as we hide total info
	
	var currentTotalRow = totalHeader.parentNode;
	currentTotalRow.classList.add('table-container__row_total'); //1st total row with title remains	
	
	//hide all total cells except row title
	var totalCells = [];
	totalCells = Array.prototype.slice.call(currentTotalRow.querySelectorAll('td:not(:first-child)'));
	totalCells.forEach(function(cell) {
		currentTotalRow.removeChild(cell);
	});	
	
	//update cell and row with dimension title 
	currentTotalRow.querySelector('td').colSpan = totalCells.length + 1;
	currentTotalRow = currentTotalRow.nextElementSibling;
	totalRowCount -= 1;
	
	// remove not needed rows: nested inside total 
	while (totalRowCount) {
		var nextRow = currentTotalRow.nextElementSibling;		
		totalRowCount -= 1;	
		currentTotalRow.parentElement.removeChild(currentTotalRow);	//no need in this row
		currentTotalRow = nextRow;
	} 
	
}

/**
*Hide totals and mark nesting
*@param {Element} table container
*/
function processDimensionTotals (tableContainer) {
	
	if(tableContainer.className.indexOf('table-container_total-display_dimension-title')<0) {
		return;
	}

	var totalHeaders = Array.prototype.slice.call(tableContainer.querySelectorAll('tbody td[class*=_hc_total]'));
	totalHeaders.forEach(hideTotalData);

	var outerHeaders = Array.prototype.slice.call(tableContainer.querySelectorAll('td[rowspan]')); // add class to add space before nested headers
	outerHeaders.forEach(function(header) {
		 var row = header.parentElement;
		 row.classList.add('table-container__row_outer-header');
	});
}

/** save initial row order to reset sorting 
*/

function saveRowOrderInAttribute(tableContainer) {
	
	var resetSortingBtn = tableContainer.querySelector('.btn_resetTableSorting');
	
	if(!isSortingAllowed(tableContainer) && resetSortingBtn) {
		resetSortingBtn.classList.add('hidden');
		return;
	}

	resetSortingBtn && resetSortingBtn.classList.remove('hidden');
	
	var tableRows = Array.prototype.slice.call(tableContainer.querySelectorAll('tbody tr'));	
	tableRows.forEach(function(tr, rowNum){
		tr.setAttribute('row-number',rowNum);
	});
}


/**
* barchart title should be like: 'favorable 30%'
*/
function setBarTitle(bar){
	var title = bar.getAttribute('title');
	if (title) {
		bar.setAttribute('title', title+' '+bar.style.width);
	}

}


/**
*prepareTablesForStyling
*/
function prepareTablesForStyling() {
	var tables = Array.prototype.slice.call(document.querySelectorAll('.table-container'));
	tables.forEach(processDimensionTotals);
	tables.forEach(saveRowOrderInAttribute);

	//barchart title should be like: 'favorable 30%'
	var barCharts = Array.prototype.slice.call(document.querySelectorAll('.barchart__bar_type_distribution'));
	barCharts.forEach(setBarTitle);
}


/**
* define default sorting for tables based on row-number attribute
* row-number is assigned when table loads
*/

function defaultTableSorting(rowA, rowB) {	
	var rowNumA = Number(rowA.getAttribute('row-number'));
	var rowNumB = Number(rowB.getAttribute('row-number'));
	
	if( rowNumA > rowNumB) {
		return 1;
	} else if(rowNumA < rowNumB) {
		return -1;
	}	
}

/**
* event handler for reset sorting button
*/

function resetTableSorting(e) {

	var resetBtn = e.target;
	var table = findAncestor(resetBtn, 'card__table-container').querySelector('table');
	var tbody = table.querySelector('tbody');
	var sortedTh = table.querySelectorAll('.tablesaw-sortable-descending, .tablesaw-sortable-ascending'); //only one in fact
	var rows = Array.prototype.slice.call(tbody.querySelectorAll('tr'));
	
	sortedTh[0].classList.remove('tablesaw-sortable-descending'); //clear sorting styles
	sortedTh[0].classList.remove('tablesaw-sortable-ascending');	
	rows.sort(defaultTableSorting); //sort rows as at initial load
	
	for(var i=0; i<rows.length; i++) { //sort dom elements of rows
		tbody.appendChild(rows[i]);
		rows[i].classList.remove('table-container__row_hidden'); //show hidden rows
	}
}

// --------------------  TABLE END -------------------- 



// -------------------  EXPORT WINDOW BLOCK BEGIN ------------------
//opens Reportal export window and apply all styling 

function openRedesignedExportWindow(files, optionsSettings){
     var params = {"cssLink1": files.CSS_1page, "jsLink1": files.JS_1page, "cssLink2": files.CSS_2page, "jsLink2": files.JS_2page, "optionsFlags": optionsSettings.flags, "optionsIndexes": optionsSettings.indexes};
     
     ExportReport();
     waitForIframe(firstLoadIframeRedesign, params); //for the first 
     waitForIframe(onloadRedesign, params); //for all reloads
     waitForIframe(windowResizeListener, null);

      function windowResizeListener(){
         window.addEventListener("resize", function(){
                 var iframe = document.getElementById("innerContentFrame");
                 if (iframe == undefined || iframe == null) window.removeEventListener("resize", this);
                 else {resizeIframeWrapper();}
         });
     } 

     function getOkButton(){
       return  document.querySelector(".overlays-container .yui3-button-primary");
     }

     function getFooter(){ 
           return   document.getElementsByClassName("yui3-widget-ft")[0];
     }
   
     function getFormatSelector(){
       var iframe = document.getElementById("innerContentFrame");
       var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
       return innerDoc.getElementById("exp_exportFormatList");
     }
     
     
     function waitForReturn(funcForReturn, callback, cParams){
        var timerId = setInterval(function() {
           try{
              setTimeout(function(){clearInterval(timerId);}, 50000);
              var result = funcForReturn();
              if(result!= undefined && result!= null) {               
                 clearInterval(timerId);
                 callback(cParams); 
              }
              
           }
          catch(error){console.log(error);}
        }, 100);
     };
   
     function waitForIframe(callback, params){
        var timerId = setInterval(function() {
           setTimeout(function(){clearInterval(timerId);}, 100000);
           try{
              var iframe = document.getElementById("innerContentFrame");
              if(iframe != undefined && iframe != null)   iframe.style.visibility = "hidden";

              var innerDoc = iframe.contentDocument || iframe.contentWindow.document;

              var firstBodyChild = innerDoc.getElementsByTagName("body")[0].children[0];

              if(firstBodyChild != undefined && firstBodyChild != null) {               
                 clearInterval(timerId);
                 callback(params); 
                  //iframe.style.visibility = "visible";
                 addEventListenersForAllTagsInIframe({"tag": "select", "event": "change", "func": hideIframe});
              }
              
           }
          catch(error){console.log(error);}
        }, 100);
     }
      
     function firstLoadIframeRedesign(params){
         var params1 = {"cssLink": params.cssLink1, "jsLink": params.jsLink1, isFirstPage: true, optionsFlags: params.optionsFlags, optionsIndexes: params.optionsIndexes};
         var params2 = {"cssLink": params.cssLink2, "jsLink": params.jsLink2, isFirstPage: false};

         redesignIframe(params1);
     }
     function onloadRedesign(params){
         var iframe = document.getElementById("innerContentFrame");
         var params1 = {"cssLink": params.cssLink1, "jsLink": params.jsLink1, isFirstPage: true, optionsFlags: params.optionsFlags, optionsIndexes: params.optionsIndexes};
         var params2 = {"cssLink": params.cssLink2, "jsLink": params.jsLink2, isFirstPage: false};

       
         iframe.addEventListener("load", function(){   
                                                    waitForReturn(getFooter, function(){       
                                                                         if(getOkButton()!=undefined) var p = params1; else var p = params2;
                                                                         waitForIframe(redesignIframe,p);
                                                                             });
													}, null);
         }
 
     function resizeIframeWrapper(){
       var iframeWrapper = document.getElementsByClassName("yui3-widget-bd")[0];
       var iframe = document.getElementById("innerContentFrame");
       var innerDoc = iframe.contentDocument || iframe.contentWindow.document;

        var realHeight = innerDoc.getElementById("exportTableBody").offsetHeight;
        iframeWrapper.style.height = realHeight+"px";
     }

     function  addEventListenersForAllTagsInIframe(params){

         var iframe = document.getElementById("innerContentFrame");
         var innerDoc = iframe.contentDocument || iframe.contentWindow.document;

         var elements = innerDoc.getElementsByTagName(params.tag);
       
         for(var i= 0; i<elements.length; i++){

              elements[i].addEventListener(params.event, params.func);
         }
     }
     function hideIframe(){
	  var iframe = document.getElementById("innerContentFrame");     
          if(iframe != undefined && iframe != null)   iframe.style.visibility = "hidden";
	 }

     function hideSomeExportOptions(params){
     
       /*if(params.isFirstPage){*/
       
       var iframe = document.getElementById("innerContentFrame");
       var innerDoc = iframe.contentDocument || iframe.contentWindow.document;

       var formatSelector = innerDoc.getElementById("exp_exportFormatList");
       var exportFormatId = formatSelector.options[formatSelector.selectedIndex].value;

       var hideFlags = [];
       var hideIndexes = [];
       switch(exportFormatId.toString()){
           case "5": {var exportScopeSelect = innerDoc.getElementById("exp_exportScopeList");
                           var exportScopeValue = exportScopeSelect.options[exportScopeSelect.selectedIndex].value;
                          if(exportScopeValue.toString() =="1") {hideFlags = params.optionsFlags.excel; hideIndexes = params.optionsIndexes.excel;}
                          else  {hideFlags = params.optionsFlags.excelScopeExt; hideIndexes = params.optionsIndexes.excelScopeExt;}
            break; } //excel
           case "4": {hideFlags = params.optionsFlags.ppt; hideIndexes = params.optionsIndexes.ppt; break;} //ppt
           case "3": {hideFlags = params.optionsFlags.pdf; hideIndexes = params.optionsIndexes.pdf; break;} //pdf
       }

       
       var tableWithSettingsTrs = innerDoc.querySelectorAll("#exportTableBody table tr");

       for(var i=0; i<hideFlags.length; i++){
           if(!hideFlags[i]) tableWithSettingsTrs[hideIndexes[i]].style.display = "none";
       }
      
      //}
     }

     function redesignIframe(params){
        var iframe = document.getElementById("innerContentFrame");
        var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
        innerDoc.addEventListener('IFrameContentLoaded', function(){iframe.style.visibility = "visible";});
       
        var cssLink = innerDoc.createElement("link");
        cssLink.href = params.cssLink; 
        cssLink.rel = "stylesheet"; cssLink.type = "text/css"; 
        innerDoc.head.appendChild(cssLink);

        // add translations to export windows' texts
        var textsScript = innerDoc.createElement('script');
        textsScript.innerText = 'var exportTranslations = ' + JSON.stringify(ReportTemplateConfig.exportTranslations) + ';'; 
        textsScript.type = "text/javascript"; 
        innerDoc.head.appendChild(textsScript);

        var jsLink = innerDoc.createElement("script");
        jsLink.src = params.jsLink; 
        jsLink.type = "text/javascript"; 
        innerDoc.head.appendChild(jsLink);


        if(params.isFirstPage) { waitForReturn(getFormatSelector, hideSomeExportOptions,params);}
        waitForReturn(function(){ 
                                 var iframe = document.getElementById("innerContentFrame");  
                                // if (iframe == undefined || iframe == null) return true;
                                 var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
                                 return iframe.style.visibility == "hidden"? null: innerDoc.getElementById("exportTableBody");
                             }, resizeIframeWrapper, null);      
       
         waitForReturn(getOkButton, function(){             
                                 var okButton = getOkButton();
                                 okButton.addEventListener("click", function(){ hideIframe();
                                 waitForReturn(getExportTaskStatus, fireStatusChangeEvents, null);});
          }, null);

        setTimeout(function(){iframe.style.visibility = "visible";}, 50000);
      };

     function fireStatusChangeEvents(){
         var prevStatus = "";
         var prevStatusColor = "";

         var watchingProgress = setInterval(
               function(){
                 var status = getExportTaskStatus();
                 var statusColor =  getExportTaskColor();
                          

                 if(status == null || status == undefined || status == "" || prevStatus == "Completed" || prevStatus == "Aborted by system" ) 
                         clearInterval(watchingProgress);
                 else{
                    status = status.charAt(0).toUpperCase() + status.slice(1);
                    if(status != prevStatus){                   
                        var iframe = document.getElementById("innerContentFrame");       
                        var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
                        var hiddenStatusLine = innerDoc.getElementById("label_tasksStatus");
                      
                        var statusType = status.split(" ")[0];
              
			            if(GetIEVersion() == 0) {
                            var statusChangeEvent = new Event("exportStatus"+statusType, {bubbles: true});
						}
						else
						{
						    var statusChangeEvent = document.createEvent("Event");
						    statusChangeEvent.initEvent("exportStatus"+statusType, true, true);
						}
                        hiddenStatusLine.dispatchEvent(statusChangeEvent);
                       
                        prevStatus = status;
                        prevStatusColor = statusColor;

                       // if(statusColor == "rgb(0, 128, 0)" || statusColor == "rgb(255, 0, 0)") clearInterval(watchingProgress);
                       //if( status == "completed" || status == "aborted by system") clearInterval(watchingProgress);
                        
                       resizeIframeWrapper();
                  }
               }
               }, 500);
     }
     
	 function GetIEVersion() {
		var sAgent = window.navigator.userAgent;
		var Idx = sAgent.indexOf("MSIE");

		// If IE, return version number.
		if (Idx > 0) 
			return parseInt(sAgent.substring(Idx+ 5, sAgent.indexOf(".", Idx)));

		// If IE 11 then look for Updated user agent string.
		else if (!!navigator.userAgent.match(/Trident\/7\./)) 
			return 11;

			else
			return 0; //It is not IE
	 }

     function getExportTaskStatus(){
        try{
             var iframe = document.getElementById("innerContentFrame");
             var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
             return innerDoc.getElementById("label_tasksStatus").innerText.replace("\n\n"," ").split(": ")[2].toLowerCase().trim();
        }
        catch(error){
           
            return null;
        }
    }
      function getExportTaskId(){
        try{
             var iframe = document.getElementById("innerContentFrame");
             var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
             return innerDoc.getElementById("label_tasksStatus").innerText.replace("\n\n"," ").split(": ")[1];
        }
        catch(error){
          
            return null;
        }
    }
     function getExportTaskColor(){
        try{
             var iframe = document.getElementById("innerContentFrame");
             var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
            return innerDoc.getElementById("label_tasksStatus").style.backgroundColor;
        }
        catch(error){
            //console.log(error);
            return null;
        }
    }
     
}


// --------------------  EXPORT WINDOW BLOCK END --------------------  


// --------------------- VERBATIM TABLE -----------------------


/**
*Hide long texts in comments
*@param {int} max number of characters 
*/
String.prototype.truncateVerb = function(charLimit){
 
      var mainTxt = this.substr(0, charLimit-1);

      var readMore =  '<button type="button" class="rpt-button datatable-cell__btn cell-btn cell-btn_read-more">...</button>';
      var readLess =  '<button type="button" class="rpt-button datatable-cell__btn cell-btn cell-btn_read-less js-hidden">...</button>';

      fullTxt = '<span class="datatable-cell_full js-hidden">' + this.substr(charLimit-1)  + '"' + '</span>';     
      
      return '"' + mainTxt + (this.length > charLimit ? readMore +  fullTxt  + readLess : '"');
};

// Show comments
function toggleFullCommentViewVerbMore(e) {

  var cell= e.target;
       cell.classList.toggle("js-hidden");
       cell.nextSibling.classList.toggle("js-hidden");
       cell.nextSibling.nextSibling.classList.toggle("js-hidden");

}

// Hide comments
function toggleFullCommentViewVerbLess(e) {

  var cell= e.target;
       cell.classList.toggle("js-hidden");
       cell.previousSibling.classList.toggle("js-hidden");
       cell.previousSibling.nextSibling.classList.toggle("js-hidden");

}

function styleVerbatimTables() {
                 // Loop each of the verbatim tables verbatim cells
		var verbatim_cells = Array.prototype.slice.call(document.querySelectorAll(".card__verbatim-container table tr:not(.hidden) td:nth-child(1)"));

		toggleCommentButtonsDisplaying(verbatim_cells, 35);
		window.addEventListener('resize', function() {
		      closeAllComments(verbatim_cells);
		      toggleCommentButtonsDisplaying(verbatim_cells, 35);
		});

		// Add in new cells for the image
		var verbatim_rows = Array.prototype.slice.call(document.querySelectorAll(".card__verbatim-container table tr:not(.hidden)"));
		verbatim_rows.forEach(function (verbatim_row) {
		  verbatim_row.insertCell(0);
		});

}


// --------------------- HITLIST -----------------------


/**
*Hide long texts in comments
*@param {int} max number of characters 
*/
String.prototype.truncate = function(charLimit){
 
      var mainTxt = this.substr(0, charLimit-1);

      var readMore =  '<button type="button" class="rpt-button datatable-cell__btn cell-btn cell-btn_read-more">...</button>';
      var readLess =  '<button type="button" class="rpt-button datatable-cell__btn cell-btn cell-btn_read-less js-hidden">...</button>';
      fullTxt = '<span class="datatable-cell_full js-hidden">' + this.substr(charLimit-1) + '</span>';     
     
      return mainTxt + (this.length > charLimit ? readMore + fullTxt + readLess : '');
};



// Show/hide long comments
function toggleFullCommentView (e) {

  var cell = e.target.parentNode;
  cell.querySelector(".cell-btn_read-more").classList.toggle("js-hidden");
  cell.querySelector(".cell-btn_read-less").classList.toggle("js-hidden");
  
  var commentText = cell.querySelector(".comment-text");
  commentText.classList.toggle("comment-text_truncated");
}

// Show the number of comments on the hitlist header
function showCommentsNumber () {

	var header = document.querySelector('th.utilityCol');

	// retrieve the number of comments inside brackets from the hitlist page navigation
	var regExp = /\((.*?)\)/;  
	var numberOfComments = document.querySelector('.hitlist-pagination-count').textContent ? document.querySelector('.hitlist-pagination-count').textContent.match(regExp)[1] : 0;
	var elem = document.createElement('div');
        elem.className = 'utilityCol__cell'; 
	elem.textContent = numberOfComments;
	 
	// replace all reportal in-built content of the the 1st column with the number
	while(header.firstChild) {
		header.removeChild(header.firstChild);
	}
	header.appendChild(elem);
        // tooltip text with the number of records
        header.title = ReportTemplateConfig.commentNumber + numberOfComments;
}


/*
* @function DisplayColumnsAsTags 
* @description function to render comment hitlist columns as tags
* @param {array} tagColumnNumbers - hitlist columns which will be displayed as tags. They must be 1-based column indexes 
* @param {int} targetColumnNumber - the column index where tags will be moved to. 1-based column index
*/

function displayColumnsAsTags(tagColumnNumbers, targetColumnNumber, nonTagColumnsCount) {
    var hitlistTable = document.querySelector('.hitlist table');    
    if (hitlistTable) {
        tagColumnNumbers.forEach(function (tagColumnNumber, index) {
            var headerRow = hitlistTable.querySelector('thead tr');
	    if (headerRow.cells.length > nonTagColumnsCount) {			  
               hitlistTable.querySelector('thead tr').deleteCell(tagColumnNumber-1);			  
	    }  
        });

        var rows = Array.prototype.slice.call(hitlistTable.querySelectorAll('tbody.yui3-datatable-data tr'));
        rows.forEach(function (row, index) {
            var tagContainer = document.createElement('div');
            tagContainer.className = 'hitlist__tags-container';

            tagColumnNumbers.forEach(function (tagColumnNumber, index) {        
                var categories =  row.querySelector('td:nth-child(' + tagColumnNumber + ')').textContent.split(',');
                categories.forEach(function (category) {
                    if (category != '-') {
                        var tagNode = document.createElement('div');
                        tagNode.textContent = category;
                        tagNode.className = 'hitlist__tag';
                        tagContainer.appendChild(tagNode);
                    }
                });
                row.deleteCell(tagColumnNumber-1);
            });

            hitlistTable.rows[index + 2].cells[targetColumnNumber].appendChild(tagContainer);
        });
    }
}



function toggleCommentButtonsDisplaying(commentCells, oneLineCommentHeight) {  // for some unknown reasons height value of comment changes depending on where this function is executed from, so oneLineCommentHeight should be passed into function as parameter
	
    commentCells.forEach(function (comment) {

		var commentText = comment.querySelector('.comment-text');
		if (commentText) {
			commentText.classList.remove('comment-text_truncated');
		}

                var commentTextNode =  comment.childNodes[0];
		if (getTextNodeHeight(commentTextNode) > oneLineCommentHeight) {                      
			var tagsContainer = comment.children[comment.children.length - 1];
			var readMore =  '<button type="button" class="rpt-button datatable-cell__btn cell-btn cell-btn_read-more">...</button>';
			var readLess =  '<button type="button" class="rpt-button datatable-cell__btn cell-btn cell-btn_read-less js-hidden">...</button>';
			var commentTextValue = commentText ? commentText.textContent : comment.textContent;
			comment.innerHTML = '<span class="comment-text comment-text_truncated">' + commentTextValue + '</span>' + readMore + readLess;
			if (tagsContainer) {
				comment.appendChild(tagsContainer);
			}
		} else {                     
			var readMore = comment.querySelector('.rpt-button.cell-btn_read-more');
			var readLess = comment.querySelector('.rpt-button.cell-btn_read-less');
			if (readMore && readLess) {
				comment.removeChild(readMore);
				comment.removeChild(readLess);
			}
		}
	});

	var readMoreBtns = Array.prototype.slice.call(document.querySelectorAll(".cell-btn_read-more"));
	readMoreBtns.forEach(function (item) {
		item.addEventListener('click', toggleFullCommentView);
	});

	var readLessBtns = Array.prototype.slice.call(document.querySelectorAll(".cell-btn_read-less"));
	readLessBtns.forEach(function (item) {
		item.addEventListener('click', toggleFullCommentView);
	});
}

function closeAllComments(commentCells) {
	commentCells.forEach(function (comment) {	
		var readMore = comment.querySelector(".cell-btn_read-more");
		var readLess = comment.querySelector(".cell-btn_read-less");
		if (readMore && readLess) {
			if (readMore.classList.contains("js-hidden")) {
				readMore.classList.remove("js-hidden");
			}
			if (!readLess.classList.contains("js-hidden")) {
				readLess.classList.add("js-hidden");
			}
		}
	});
}

function enableResetHitlistSortingButton(containerForHitlist) {
    var hitlist = containerForHitlist.querySelector('.hitlist');
    if (!hitlist) {
        return;
    }
    var hitlistControls = containerForHitlist.querySelector('.hitlist-container__controls');
    if (!hitlistControls) {
        return;
    }
    var hitlistResetSortingBtn = hitlistControls.querySelector('.btn_resetHitlistSorting');
    if (!hitlistResetSortingBtn) {
        return;
    }
    var parameterForHitlistReset = hitlistControls.querySelector('.parameter_resetHitlistSorting select');
    if (!parameterForHitlistReset) {
        return;
    }
    hitlistResetSortingBtn.setAttribute('title', ReportTemplateConfig.translations.ResetSorting);
    hitlistResetSortingBtn.addEventListener('click', hitlistResetSortingButtonClickHandler);
    hitlistResetSortingBtn.sortedHitlist = hitlist;
    hitlistResetSortingBtn.hitlistResetParameter = parameterForHitlistReset;
}

function hitlistResetSortingButtonClickHandler(e) {
    var sortedColumns = Array.prototype.slice.call(e.target.sortedHitlist.querySelectorAll('th[aria-sort]'));
    if (sortedColumns.length > 0) {
        var selectedOption = e.target.hitlistResetParameter.querySelector('option[selected="selected"]');
        if (selectedOption.value == 'r:s:firstReset') {
            $(e.target.hitlistResetParameter).val('r:s:secondReset').trigger('change');
        } else {
            $(e.target.hitlistResetParameter).val('r:s:firstReset').trigger('change');
        }
    }
};

// --------------------  HITLIST END -------------------- 



// --------------------  DROPDOWNS -------------------- 

/*
* @function formatSelectedDropdownOption 
* @description function to format the selected option in select2 dropdown
* @param {object} item - selected item
* @return {string} formatted text
*/
function formatSelectedDropdownOption (item) {

    var prefix = '';
    var text = item.text;

    // add text 'Score' as a prefix for score dropdowns
    if (item.element && findAncestor(item.element, 'reportal-select_type-score')) {
       prefix = ReportTemplateConfig.score+': ';
    }

    return prefix + text;
}



/*
* @function getDefaultPlaceholderText 
* @description function to get default placeholder text for dropdowns where placeholder isn't specified as a separate option in Parameter library
* @param {object} element - dropdown
* @return {string} placeholder text for dropdowns based on optional parameters or multi-parameters
*/
function getDefaultPlaceholderText (element) {
 
    // add text 'Select a tag' for tag dropdowns
    if (findAncestor(element, 'reportal-select_type-tag')) {
       return ReportTemplateConfig.tagPlaceholderTxt;
    }
    return ReportTemplateConfig.defaultPlaceholderTxt;
}



function initialiseSelect2 () {
      try {
	  var selects = document.getElementsByTagName('select');
	  for (var i = 0; i < selects.length; i++) {
		var selectOptions = selects[i].getElementsByTagName('option');
		if (selectOptions.length == 0) {
		  selects[i].style.display = "none";
		  selects[i].className = selects[i].className + ' select-hidden';
		}
                else {
                  var thisItem = selects[i];
		  var thisItemOptions = thisItem.getElementsByTagName('option');
		  var isClearable = false;
		  var placeholderText = getDefaultPlaceholderText (selects[i]); 
		  for (var j = 0; j < thisItemOptions.length; j++) {
			if (!thisItemOptions[j].innerHTML) {
			  isClearable = true;
			}
			if (thisItemOptions[j].getAttribute('value').indexOf('placeholder') != -1) {
			  placeholderText = thisItemOptions[j].innerHTML;
			  jQuery(thisItemOptions[j]).remove();
			}
		  }
		  jQuery(thisItem).select2({
			dropdownAutoWidth: true,
			width: 'auto',
			allowClear: isClearable,
			placeholder: placeholderText,
			minimumResultsForSearch: Infinity,
			templateSelection: formatSelectedDropdownOption,
                        //dropdownParent: ($(".card_type_trend"))
		  });
                }
	  }
	} catch (e) {
	  console.log('something\'s wrong with select2 for filters:' + e);
	}
}

// --------------------  DROPDOWNS END ------------------- 


// --------------------  PAGE CATEGORICAL -------------------- 

function hideCategoricalDrilldownTable() {
	var drilldownParam = document.querySelector("#drilldownParam input");
	var drilldownTable = document.querySelector("#drilldown-table");
	
	if (drilldownTable) {
		if (drilldownParam) {
			if (drilldownParam.value) {
				drilldownTable.classList.remove('hidden');
			} else {
				drilldownTable.classList.add('hidden');
			}
		} else {
			if (ReportTemplateConfig.drilldownId) {
				drilldownTable.classList.remove('hidden');
			} else {
				drilldownTable.classList.add('hidden');
			}
		}
	}
}

function addStylesToCategoricalDrilldownTable() {
	var dimensionTitles = Array.prototype.slice.call(document.querySelectorAll('.table-container_categorical tbody tr td[rowspan]'));
	dimensionTitles.forEach(function(dimensionTitle, index) {
		var firstDimensionRow = dimensionTitle.parentNode;
		firstDimensionRow.classList.add('table-container_categorical__row_dimension-title');
		
		if (index !== 0) {
			var lastDimensionRow = firstDimensionRow.previousSibling.previousSibling;
			lastDimensionRow.classList.add('table-container_categorical__row_dimension-footer');			
		}
	});

}

function clickCategoricalButton(e) {
	var drilldownParam = document.querySelector('#drilldownParam input');
	var drilldownBtn = document.querySelector('#drilldownBtn input');
	var cardId = e.target.id.replace('categorical-button-', '');
	drilldownParam.value = drilldownParam.value == cardId ? '' : cardId;
	
	var drilldownTable = document.querySelector('#drilldown-table');
	if (drilldownParam.value) {
		sessionStorage.setItem('drilldownScrollingTarget', 'table');
	} else {
		sessionStorage.setItem('drilldownScrollingTarget', '');
	}
	
	viewmode.showWait();
	drilldownBtn.click();
}

function scrollOnCategoricalPage() {
	var drilldownScrollingTarget = sessionStorage.getItem('drilldownScrollingTarget');
	var drilldownParam = document.querySelector('#drilldownParam input');
	var pageHeader = document.querySelector('.page-header');
	switch (drilldownScrollingTarget) {
		case 'table' :
			scrollPage(document.querySelector('#drilldown-table').offsetTop - pageHeader.offsetHeight);
			break;
		case 'card': 
			scrollPage(document.querySelector('.card_active').offsetTop);
			break;
		default:
			break;
	}
}

function scrollPage(drilldownScrollingOffset) {		
	var destinationOffsetToScroll = Math.round(drilldownScrollingOffset - 10);	
	window.scroll(0, destinationOffsetToScroll);
}

function scrollToActiveCard() {
	var activeCard = document.querySelector('.card_active');
	var pageHeader = document.querySelector('.page-header');
	if (activeCard) {
		scrollPage(activeCard.offsetTop - pageHeader.offsetHeight);
	}
}

function addClickFunctionsToCategoricalButtons() {
	var categoricalButtons = Array.prototype.slice.call(document.querySelectorAll('.redesigned-button[id^="categorical-button"]'));
	categoricalButtons.forEach(function(button) { button.addEventListener('click', clickCategoricalButton); });
}

function addClickFunctionToCategoricalScrollUpButton() {
	var scrollUpButton = document.querySelector('.btn_scrollUp.table-container__control');
	if (scrollUpButton) {
		scrollUpButton.addEventListener('click', scrollToActiveCard);
	}
}

// --------------------  PAGE CATEGORICAL END -------------------- 


// --------------------  PAGE WORDCLOUDS --------------------

function executeAllWCCLickFunctions(e) {
	chooseWordInHitlist(ReportTemplateConfig.wordcloudQuestionId, e.target.childNodes[0].wholeText);
	changeHitlistColumnHeader(e.target.childNodes[0].wholeText);	

	var hitlist = document.querySelector('.card_type_wordcloud.card_type_comments');
	if (hitlist) {
		reportal.showWait();
		if (hitlist.classList.contains('hidden')) {
			changeWCSize(false);
			hitlist.classList.remove('hidden');
			changeWCQuestionsListVisibility(false);
			chartResize();	
		}
	}

	changeWCTagsColor(ReportTemplateConfig.wordcloudSecondaryColor);
	e.target.style.fill = ReportTemplateConfig.wordcloudMainColor;
}

function chooseWordInHitlist(wordcloudQuestionId, word) {
	document.querySelector('.hitlist-dropdown-button').click();
	document.querySelector('.hitlist-dropdown-panel').style.display = 'none';
	document.getElementById(wordcloudQuestionId + '_field').value = '*' + word + '*'; 
	document.querySelector('.hitlist-dropdown-filter-apply').click();
	document.querySelector('.hitlist-dropdown-button').click();
	document.querySelector('.hitlist-dropdown-panel').style.display = '';	
}

function changeWCSize(isFull) {
	var wcCard = document.querySelector('.card_type_wordcloud ');
	if (wcCard) {
		if (isFull) {
			if (wcCard.classList.contains('card_width_half')) {
				wcCard.classList.remove('card_width_half');
			}
			if (!wcCard.classList.contains('card_width_full')) {
				wcCard.classList.add('card_width_full');
			}
		} else {
			if (!wcCard.classList.contains('card_width_half')) {
				wcCard.classList.add('card_width_half');
			}
			if (wcCard.classList.contains('card_width_full')) {
				wcCard.classList.remove('card_width_full');
			}
		}
	}
}

function chartResize() {
      var event;

      if(typeof(Event) === 'function') {
        event = new Event('resize');
      } else {
        event = document.createEvent('Event');
        event.initEvent('resize', true, true);
      }

      window.dispatchEvent(event);
}

function changeHitlistColumnHeader(word) {
	var commentsColumnHeader = document.querySelector('.hitlist table thead tr th:nth-child(2)');
	if (commentsColumnHeader && commentsColumnHeader.children[0] && commentsColumnHeader.children[0].childNodes[1]) {
		var commentsColumnHeaderSortingButton = commentsColumnHeader.children[0].childNodes[1];
		commentsColumnHeader.children[0].innerHTML = word;
		commentsColumnHeader.children[0].appendChild(commentsColumnHeaderSortingButton);
	}
}

function changeWCTagsColor(color) {
	var wcTags = Array.prototype.slice.call(document.querySelectorAll('.cloud__tag'));
	wcTags.forEach(function(tag) { tag.style.fill = color; });
}

function changeWCQuestionsListVisibility(isVisible) {
	var wcQuestionList = document.querySelector('.card_type_wordcloud .card__settings');
	if (wcQuestionList) {
		if (isVisible) {
			if (wcQuestionList.classList.contains('hidden')) {
				wcQuestionList.classList.remove('hidden');
			}
		} else {
			if (!wcQuestionList.classList.contains('hidden')) {
				wcQuestionList.classList.add('hidden');
			}
		}
	}
}

function clickHitlistCloseButton() {
	var hitlistCard = document.querySelector('.card_type_wordcloud.card_type_comments');
	if (hitlistCard) {
		hitlistCard.classList.add('hidden');
	}
	changeWCSize(true);
	changeWCTagsColor(ReportTemplateConfig.wordcloudMainColor);
	changeWCQuestionsListVisibility(true);
	chartResize();
}



// --------------------  PAGE WORDCLOUDS END --------------------



function pageInit() {

	  //make reportal a web-app via  tags
	  addMeta([{ name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' }]);

	  //PAGE-HEADER
	  window.addEventListener('load', stickyHeader);
	  window.addEventListener('resize', stickyHeader);
          window.addEventListener('orientationchange', stickyHeader);
          document.querySelector('.company-info_logo').setAttribute('src', ReportTemplateConfig.logoLink);
	
	  //NAV-MENU
          document.querySelector('.nav-menu__icon').addEventListener('click', toggleMobileNavMenu);
	  window.addEventListener('click', mobileNavMenuBlur);

          //hide not needed pages
          var menuItems = Array.prototype.slice.call(document.querySelectorAll('.nav-menu .yui3-menuitem'));
          menuItems.forEach(pageVisibility);

          var currentPage = document.querySelector('.page-title .page-title__label');
          var currentPageTxt = currentPage.innerText;         
          var selectedSurvey = document.querySelector('.filter-pane__section_type_surveys input[checked]+label');
          var postfix = selectedSurvey ? ' '+ReportTemplateConfig.translations.pageTitlePostfix+' '+selectedSurvey.innerHTML : '';
          currentPage.innerText = ReportTemplateConfig.pagesToShow[currentPageTxt.toLowerCase().replace(/ /,'')]+postfix;

	  //ADMIN-MENU
	  document.querySelector('.admin-menu_type_general').addEventListener('click', toggleAdminMenu);
	  window.addEventListener('click', adminMenuBlur);

          //FILTER-PANE
	  document.querySelector('.filter-pane__btn').addEventListener('click', toggleFilterPanel);
	  var filterBtns = Array.prototype.slice.call(document.querySelectorAll('.filter-pane__section .filter-pane__btn'));
	  filterBtns.forEach(function (el) {
		el.addEventListener('click', toggleSubFilterPanel);
	  });
	  var filterNames = Array.prototype.slice.call(document.querySelectorAll('.filter-pane__section .filter__name'));
	  filterNames.forEach(function (el) {
		el.addEventListener('click', handleToggleFilter);
	  });
	  // redesign reportal checkboxes for filters
	  var filterBoxes = Array.prototype.slice.call(document.querySelectorAll('.filter__selector td'));
	  filterBoxes.forEach(function (item) {
		var checkbox = document.createElement('span');
		checkbox.className = 'filter__checkmark';
		item.appendChild(checkbox);
                checkbox.addEventListener('click', toggleHiddenCheckbox);
	  });
          // check if there is an active hierarchy to be shown
          var hierContainer = document.querySelector('.filter__hierarchy');
          if (hierContainer  && !hierContainer.children.length) { 
            findAncestor(hierContainer, 'filter').classList.add('hidden');
          }
          // check if there are active filters to be shown expanded          
          var filterSelectors = Array.prototype.slice.call(document.querySelectorAll('.filter-pane__section_type_filters .filter'));
          var activeFilterSelectors = filterSelectors.filter(function (selector) {
             return !!selector.querySelector('input:checked');
          });
          activeFilterSelectors.forEach(function(item){
                toggleFilter(item);
          });
          addFunctionalButtonsToFilterList(ReportTemplateConfig.translations.Apply, ReportTemplateConfig.translations.Reset);
         

          // CALENDARS

          //hide time period filter if disabled
          if(ReportTemplateConfig.hideTimePeriodFilters) {
          	var timeperiod = document.querySelector('.filter-pane .time-period-picker');
          	findAncestor(timeperiod, 'filter').classList.add('js-hidden');	
          }

          // if time period filter needed
          if(!ReportTemplateConfig.hideTimePeriodFilters && ReportTemplateConfig.executionMode != 'PdfExport') {
          	//show/hide custom dates selectors
          	var tpps = Array.prototype.slice.call(document.querySelectorAll('.time-period-picker'));

          	tpps.forEach(function (tpp) {
          		toggleCustomDates(tpp);
          		tpp.addEventListener('click', toggleCustomDatesEventListener);
          	});

          	var datePickerPlaceholders = [ReportTemplateConfig.translations.From, ReportTemplateConfig.translations.To];
		var datePickers = Array.prototype.slice.call(document.querySelectorAll('.calendar__control'));
		datePickers.forEach(function (datePicker, index) {

			// simulate auto-submit for date-pickers.  Not needed so far (TQA-4602)
			/*datePicker.addEventListener('change', function (event) {
				__doPostBack('', '')
			});*/

			// simulate clicking on the image to pick a date in the calendar
			datePicker.addEventListener('click', function (event) {
				var imgElement = findAncestor(event.target, 'calendar__control').querySelector('img');
				imgElement.click();
			});

			// update placeholder texts for inputs  
			if (datePicker.querySelector('input') && index < datePickerPlaceholders.length) {
				datePicker.querySelector('input').placeholder = datePickerPlaceholders[index];
			}

			//disable autocomplete          
			datePicker.querySelector('input').setAttribute("autocomplete", "off");

		});

		//update calendar image
		var calendars = Array.prototype.slice.call(document.querySelectorAll('.calendar__control img'));
			calendars.forEach(function(calendar){
			calendar.setAttribute('src','https://author.euro.confirmit.com/isa/BDJPFRDMEYBPBKLVADAYFQCDAVIOEQJR/ENNOVA%20TEMPLATE%20(Reportal)/calender.PNG');
		});
	}

	  // HITLIST
          /*Fix for https://jiraosl.firmglobal.com/browse/TQA-4590*/
          if (!String.prototype.includes) {
            String.prototype.includes = function(search, start) {
                if (typeof start !== 'number') {
                 start = 0;
                }

               if (start + search.length > this.length) {
                return false;
               } else {
            return this.indexOf(search, start) !== -1;
               }
             };
           }

	  Y.Global.on('hitlistloaded', function (e) {
                // rename the score column
                if (document.querySelector('.card_type_comments')) {
                      
		      var commentCells =  Array.prototype.slice.call(document.querySelectorAll(".card_type_comments .hitlist td.yui3-datatable-cell:nth-child(2)"));
		      toggleCommentButtonsDisplaying(commentCells, 35);

                      if (document.querySelector('#page_wordclouds')) {
		          window.addEventListener('resize', function() {
		              closeAllComments(commentCells);
		              toggleCommentButtonsDisplaying(commentCells, 35);
		          });
                      }

		      showCommentsNumber();
                      if (ReportTemplateConfig.tagColumnNumbers) {
                          displayColumnsAsTags (ReportTemplateConfig.tagColumnNumbers, 1, ReportTemplateConfig.nonTagColumnsCount);
                      }

                      // rename score column
                      if (!document.querySelector('#page_wordclouds')) {
                            document.querySelector(".card_type_comments .hitlist th:nth-child(3) div").fullText = ReportTemplateConfig.score;
                            document.querySelector(".card_type_comments .hitlist th:nth-child(3) div").childNodes[0].textContent = ReportTemplateConfig.score;
                            document.querySelector(".card_type_comments .hitlist th:nth-child(3) div").childNodes[1].textContent = '';
                            if (document.querySelector(".card_type_comments .hitlist th:nth-child(3) div").childNodes[2]) {
                               document.querySelector(".card_type_comments .hitlist th:nth-child(3) div").childNodes[2].textContent = '';
                            }
                            if (document.querySelector(".card_type_comments .hitlist th:nth-child(3) div").childNodes[3]) {
                               document.querySelector(".card_type_comments .hitlist th:nth-child(3) div").childNodes[3].textContent = '';
                            }
                      }

	  	      // remove loading animation
	  	      reportal.hideWait();

                      // Card Type: card__hitlist-container no data message
                      var trendHitlist_03 = Array.prototype.slice.call(document.querySelectorAll(".card__hitlist-container .yui3-datatable-message-content"));
                      trendHitlist_03.forEach(function (item) {
                          var strMessage = ReportTemplateConfig.noDataWarning;
                          if(item.innerHTML.trim() == strMessage ){
		              item.classList.add("NoDatatoDisplay");
                              item.classList.add("NoDatatoDisplay_FontMedium");
                              //console.log("trendHitlist");
                          }
                      });
                     var hitlistContainer = document.querySelector(".card__hitlist-container");
                     enableResetHitlistSortingButton(hitlistContainer);
                }
	  });

          // VERBATIM TABLES
          window.addEventListener('load', styleVerbatimTables);

 
          //  HIGHCHARTS 	
          YUI().use('event-custom', function (Y) {
		Y.Global.on('cf:chartBeforeCreate', function (eventData) {

                        var chart = eventData.chartOptions.chart;

                        // make all charts resizeable, but for export set width based on the article container the chart is placed in
			//chart.width = null;
                       
			//console.log(ReportTemplateConfig.executionMode);
			if(ReportTemplateConfig.executionMode == 'PdfExport') {
			  var hostElement = document.getElementById(eventData.chartInfo.hostId);
			  if(hostElement) {
			    while(hostElement.tagName != 'ARTICLE' && hostElement.tagName != 'MAIN') {
 			     hostElement = hostElement.parentElement;
 			   }
			    if(hostElement.tagName == 'ARTICLE') {
			      chart.width = hostElement.offsetWidth - 50;
 			   }
			  }
			} else {
 			 chart.width = null;
			}

                       
                        // allow advanced formatting for tooltips
                        eventData.chartOptions.tooltip.useHTML = true;
                        eventData.chartOptions.tooltip.formatter = function() {
                              if (eventData.chartOptions.series.length == 1) {
                                 return this.key +  '<br>' + ReportTemplateConfig.translations.Avg +': '+ this.y.toFixed(ReportTemplateConfig.Decimal);
                              }

                              // if more than 1 line in the trend chart, series names should be displayed to distinguish KPIs 
                              return  this.key +  '<br>' + ReportTemplateConfig.translations.Avg +': '+ this.y.toFixed(ReportTemplateConfig.Decimal) + '<br><br>' + this.series.name.replace(/ *\([^)]*\) */g, "");
                        }

                        //  prevent wrapping and overlapping of x labels
                        eventData.chartOptions.xAxis.labels.step = undefined;
                        eventData.chartOptions.xAxis.labels.style.whiteSpace = 'nowrap';
		
                        //  add space between chart and xAxis labels
                        eventData.chartOptions.xAxis.offset = 15;

			// make point bigger
			eventData.chartOptions.plotOptions.series.marker = {
				enabled: true,
				symbol: 'circle', 
				radius: 5			
			};  
 
                        // avoid overlapping data labels and markers
			eventData.chartOptions.plotOptions.series.dataLabels.padding= 10;
   
		});

                Y.Global.on('cf:chartCreated', function (eventData) {
                      // change the default card view if necessary
                      restoreCardViewFromSession();
                 });
	});



        //TABLES
        applyTableSaw();
        prepareTablesForStyling();
        
        var resetSortBtns = Array.prototype.slice.call(document.querySelectorAll('.btn_resetTableSorting '));
        resetSortBtns.forEach(function(btn) {
        	btn.addEventListener('click', resetTableSorting);                
        	btn.setAttribute('title', ReportTemplateConfig.translations.ResetSorting);
        });



       // CARD
       var cardSwitchers = Array.prototype.slice.call(document.querySelectorAll(".card__switcher"));
       cardSwitchers.forEach(function (item) {
           item.addEventListener('click', handleSwitchCardView);
       });

       window.addEventListener('load',processStickyCardsOnResize);
       window.addEventListener('resize',processStickyCardsOnResize);

       // add title to scroll up button
       var scrollUpBtns = Array.prototype.slice.call(document.querySelectorAll('.btn_scrollUp'));
       scrollUpBtns.forEach(function(btn){
              btn.setAttribute('title', ReportTemplateConfig.translations.UpToCard);
       })


	//KPI_CARDS
        if (ReportTemplateConfig.gaugeData) {
		ReportTemplateConfig.gaugeData.forEach(function(currentGaugeData) {
        		var value = currentGaugeData.score;
        		var container = document.getElementById("gauge-container-" + currentGaugeData.qid);
        		container.classList.add("gauge");
        		createGauge({
        			container: container, 
        			colors: ReportTemplateConfig.gaugeThreshold, 
        			greyColor: ReportTemplateConfig.Styling.greyColor, 
        			type: ReportTemplateConfig.gaugeType, 
        			value: currentGaugeData.score
        		});
		});	
	}


	//PAGE_CATEGORICAL
        if (document.querySelector('#page_categorical')) {
		hideCategoricalDrilldownTable();
 		addStylesToCategoricalDrilldownTable();	
                addClickFunctionsToCategoricalButtons();
		addClickFunctionToCategoricalScrollUpButton();
		// timeout needed because of iPhone issue of stickyHeader function
		window.addEventListener('load', function() { setTimeout(scrollOnCategoricalPage, 100); });
	}


        //PAGE_WORDCLOUDS
        if (document.querySelector('#page_wordclouds')) {
		var hitlistCloseButton = document.querySelector('.card_type_wordcloud.card_type_comments .card__header__close-btn');
		if (hitlistCloseButton) {
			hitlistCloseButton.addEventListener('click', function() {clickHitlistCloseButton()});;
		}

		// timeout needed because of iPhone issue of stickyHeader function
		window.addEventListener('load', function() { 
			setTimeout(function() {
				window.wordcloud = makeCloudLayout({
					elementFromId: 'wordcloud-table',
					elementToId:  'wordcloud',
					clickFunc: executeAllWCCLickFunctions,
					colorConfig: {color: ReportTemplateConfig.wordcloudMainColor},
					isOneColored: true,
					countId: 1,
					translations: ReportTemplateConfig.translations
				});	
			}, 100);
		});

	}

 
       //DROPDOWNS
       initialiseSelect2();

        // General No Data Message Checks
       window.addEventListener('load', generalNoDataCheck);

}