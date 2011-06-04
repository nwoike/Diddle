Ext.define('Diddle.view.Layout', {
    extend: 'Ext.container.Container',
	requires: [
		'Diddle.view.Header',
		'Diddle.view.editor.CssEditorPanel', 
		'Diddle.view.editor.HtmlEditorPanel', 
		'Diddle.view.editor.JavaScriptEditorPanel', 
		'Diddle.view.Results',
	],
    alias: 'widget.layout',  
	layout: 'border',
	border: false,
	padding: '0 5 5 5',
	
	initComponent: function() {	
		Ext.apply(this, {
			items: [	
				this.buildHeader(),
				this.buildLeftColumn(),
				this.buildRightColumn()
			]
		});
		
		this.callParent(arguments);
	},
	
	buildHeader: function() {
		return {
			xtype: 'layoutheader',
			region: 'north',
			layout: 'fit',
			border: false,
			height: 38			
		};
	},
	
	buildLeftColumn: function() {
		return {
			layout: 'border',
			border: false,
			margins: '0 2',
			region: 'center',
			items: [
				this.buildHtmlEditor(),
				this.buildJavaScriptEditor()
			]
		};
	},
	
	buildRightColumn: function() {
		return {
			layout: 'border',
			border: false,
			margins: '0 2',
			region: 'east',	
			split: true,
			flex: 1,
			items: [
				this.buildCssEditor(),
				this.buildResultsView()
			]
		};
	},

	buildHtmlEditor: function() {
		return {
			xtype: 'htmleditorpanel',
			region: 'north',
			margins: '4 0',
			split: true,
			flex: 1			
		};
	},
	
	buildJavaScriptEditor: function() {
		return {
			xtype: 'jseditorpanel',
			region: 'center',
			layout: 'fit',
            flex: 2
		};
	},
	
	buildCssEditor: function() {
		return {
			xtype: 'csseditorpanel',
			region: 'north',
			margins: '4 0',
			split: true,
			flex: 1
		};
	},
	
	buildResultsView: function() {
		return {
			xtype: 'resultspanel',
			region: 'center',
            flex: 2		
		}
	}
});
