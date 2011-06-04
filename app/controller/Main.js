Ext.define('Diddle.controller.Main', {
    extend: 'Ext.app.Controller',
    models: ['Diddle'],
    views: ['Layout'],

    refs: [
        {
			ref: 'viewport',
			selector: 'viewport'
		},
		{
			ref: 'htmlEditor',
			selector: 'htmleditorpanel'
		},
		{
			ref: 'cssEditor',
			selector: 'csseditorpanel'
		},
		{
			ref: 'javaScriptEditor',
			selector: 'jseditorpanel'
		},
		{
			ref: 'results',
			selector: 'resultspanel'
		}		
    ],

    init: function() {
        this.control({
            'button[action="run"]': {
                click: this.run
            },			
			'button[action="save"]': {
				click: this.save
			},
			'button[action="reset"]': {
				click: this.confirmReset
			},
            'editorpanel codeeditorfield': {
                focus: this.onEditorFocus
            }
        });
	},
	
	onLaunch: function() {   
        this.buildKeyShortcuts();
        this.loadSavedDiddle();
    },
	
	loadSavedDiddle: function() {
		var Diddle = this.getModel('Diddle');

		try {			
			Diddle.load(1, {
				scope: this,
				success: function(diddle) {
					this.diddle = diddle;
					this.loadDiddle(diddle);
				}
			});			
			
		} catch(e) {
			// Model failure callback doesn't fire when nothing is in local storage but an exception is thrown. Workaround for now.
			// Suppose this could be a cookie but wanted to try out local storage proxy and model.

			this.diddle = Diddle.create({
				id: 1,
				html: '',
				css: '', 
				javascript: ''
			});
			
			this.diddle.save();
		}
	},
	
    buildKeyShortcuts: function() {
        return new Ext.util.KeyMap(document, [
            {
                key: Ext.EventObject.ENTER,
                ctrl: true,
                scope: this,
                fn: this.run
            },
            {
                key: Ext.EventObject.S,
                ctrl: true,
                scope: this,
                fn: this.save
            },
            {
                key: [Ext.EventObject.UP, Ext.EventObject.DOWN],
                ctrl: true,
                scope: this, 
                fn: this.nextEditor
            }
        ]);
    },
 
    onEditorFocus: function(editor) {
         this.currentEditor = editor.up('editorpanel');
    },
	
	loadDiddle: function(diddle) {
		this.getJavaScriptEditor().setValue(diddle.get("javascript"));
		this.getCssEditor().setValue(diddle.get("css"));
		this.getHtmlEditor().setValue(diddle.get("html"));
	},
    
	run: function() {
		var html = this.getHtmlEditor().getValue(),
			css = this.getCssEditor().getValue(),
			javascript = this.getJavaScriptEditor().getValue();
		
		this.getResults().update(html, css, javascript);
	},
	
	save: function(key, event) {
		event.preventDefault();
		
		this.diddle.set('html', this.getHtmlEditor().getValue());
		this.diddle.set('css', this.getCssEditor().getValue());
		this.diddle.set('javascript', this.getJavaScriptEditor().getValue());
        this.diddle.save();
	},
	
	confirmReset: function() {
		Ext.MessageBox.show({
			title: 'Reset Example?',
			msg: 'Are you sure you want to reset all editors?',
			buttons: Ext.MessageBox.OKCANCEL,
			icon: Ext.MessageBox.QUESTION,
			scope: this,
			fn: this.reset
		});		
	},
	
	reset: function(action) {
		if (action === 'ok') {									
			this.resetEditors();
		}
	},
    
	resetEditors: function() {
		this.getHtmlEditor().reset();
		this.getCssEditor().reset();
		this.getJavaScriptEditor().reset();				
		this.getResults().clear()
	},
	
    nextEditor: function(key) {
        var editors = Ext.ComponentQuery.query('editorpanel'), 
            idx = Ext.Array.indexOf(editors, this.currentEditor),
            newIdx;

        if (key === Ext.EventObject.DOWN) {
            newIdx = (idx === editors.length - 1) ? 0 : idx + 1;
        } 
        else {
            newIdx = (idx === 0) ? editors.length - 1 : idx - 1;
        }
        
        editors[newIdx].focus();
    }
});