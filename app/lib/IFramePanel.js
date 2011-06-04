Ext.define('Diddle.lib.IFramePanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.iframepanel',

	/**
	 * iframe source url
	 */
	src: 'about:blank',

	/**
	 * Loading text for the loading mask
	 */
	loadingText: 'Loading ...',

	/**
	 * Overwrites renderTpl for iframe inclusion
	 */
	renderTpl: [
		'<div class="{baseCls}-body<tpl if="bodyCls"> {bodyCls}</tpl><tpl if="frame"> {baseCls}-body-framed</tpl><tpl if="ui"> {baseCls}-body-{ui}</tpl>"<tpl if="bodyStyle"> style="{bodyStyle}"</tpl>>',
		'<iframe src="{src}" width="100%" height="100%" frameborder="0"></iframe>',
		'</div>'
	],

	/**
	 * overwritten, data method for the renderTemplate
	 */
	initRenderData: function() {
		return Ext.applyIf(this.callParent(), {
			bodyStyle: this.initBodyStyles(),
			bodyCls: this.initBodyCls(),
			src: this.getSource()
		});
	},

	/**
	 *  Delegates afterRender event
	 */
	initComponent: function() {
		this.callParent(arguments);
		this.on('afterrender', this.onAfterRender, this, {});
	},

	/**
	 * Gets the iframe element
	 */
	getIframe: function() {
		return this.getTargetEl().child('iframe');
	},

	/**
	 * Gets the iframe source url
	 *
	 * @return {String} iframe source url
	 */
	getSource: function() {
		return this.src;
	},

	/**
	 * Sets the iframe source url
	 *
	 * @param {String} source url
	 * @param {String} loading text or empty
	 * @return void
	 */
	setSource: function(src, loadingText) {
		this.src = src;
		var f = this.getIframe();
		if (loadingText || this.loadingText) {
			this.body.mask(loadingText || this.loadingText);
		}

		f.dom.src = src;
	},

	/**
	 * Reloads the iFrame
	 */
	resetUrl: function() {
		var f = this.getIframe();
		f.dom.contentDocument.location.reload(true);
	},

	/**
	 * Fired on panel's afterrender event
	 * Delegates iframe load event
	 */
	onAfterRender: function() {
		var f = this.getIframe();
		f.on('load', this.onIframeLoaded, this, {});
	},

	/**
	 * Fired if iframe url is loaded
	 */
	onIframeLoaded: function() {
		if (this.loadingText) {
			this.body.unmask();
		}
	}
});