Ext.define('Diddle.lib.FadingTitle', {
    extend: 'Ext.AbstractPlugin',
    alias: 'plugin.fadingtitle',
    constructor: function(config) {		
		config = config || {};
        Ext.apply(this, config);		
	},
    
    init: function(component) {
		var me = this;
	
		if (!this.title) this.title = component.title;
		
		this.label = Ext.create('Ext.Component', {
			autoEl: {
				tag: 'div',
				cls: 'fadingtitle',
				html: this.title
			},
			listeners: {
				render: function(component) {
					component.getEl().setOpacity(Ext.Number.from(me.opacity, 1));
				},
				single: true
			}
		});
		
		component.on({
			render: function() {
				if (me.fade !== false) {
					var el = component.getEl();
					el.on('mouseenter', me.onMouseEnter, me);
					el.on('mouseleave', me.onMouseLeave, me);
				}
				
				component.add(me.label);
			},
			single: true
		});		
	},
	
	destroy: function() {
		this.label.destroy();
	},
	
	onMouseEnter: function() {
		var label = this.label;
		
		label.stopAnimation();
		label.getEl().fadeOut({
			duration: 500			
		});
	},
	
	onMouseLeave: function() {
		var label = this.label;
		label.getEl().fadeIn();
	}
});