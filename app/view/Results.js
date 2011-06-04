Ext.define('Diddle.view.Results', {
	extend: 'Diddle.lib.IFramePanel',
	requires: ['Diddle.lib.IFramePanel', 'Diddle.lib.FadingTitle'],
	alias: 'widget.resultspanel',
	src: 'results.html',
	bodyPadding: 5,
	plugins: [
		{
			ptype: 'fadingtitle',
			title: 'Result',
			fade: false,
			opacity: .35						
		}
	],
	
	update: function(html, css, javascript) {
		this.getIframe().dom.contentWindow.update(html, css, javascript);
	},
	
	clear: function() {
		this.getIframe().dom.contentWindow.clear();
	}
});