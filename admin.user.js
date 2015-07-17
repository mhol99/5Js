// ==UserScript==
// @name           Admin GM Script 
// @namespace      https://roster.bluehost.com
// @description    BETA - cPM Deactivation Notes
// @version        3.0 ( Michael Holland )
// @include        http*://i.fastdomain.com/cgi/admin/*
// @include        http*://i.justhost.com/cgi/admin/*
// @include        http*://i.bluehost.com/cgi/admin/*
// @include        http*://i.hostmonster.com/cgi/admin/*
// @include        http*://i.bluehost.com/cgi-bin/admin/*
// @include        http*://i.hostmonster.com/cgi-bin/admin/*
// @include        http*://i.fastdomain.com/cgi-bin/admin/*
// @include        http*://i.justhost.com/cgi-bin/admin/*
// @include        http*://i.justhost.com/cgi/admin/*
// @exclude        https://i.bluehost.com/cgi/admin/hal
// @exclude        https://i.justhost.com/cgi/admin/hal
// @exclude        https://i.hostmonster.com/cgi/admin/hal
// @exclude        https://i.fastdomain.com/cgi/admin/hal
// @exclude        https://i.bluehost.com/cgi/admin/provider
// @exclude        https://i.justhost.com/cgi/admin/provider
// @exclude        https://i.hostmonster.com/cgi/admin/provider
// @exclude        https://i.fastdomain.com/cgi/admin/provider
// @require        https://box3021.bluehost.com/~fivjssof/apps/js/jquery-1.11.3.min.js
// ==/UserScript==

//function () {
$("head").append ('<script src="https://box3021.bluehost.com/~fivjssof/apps/js/admin.js"></script>');
