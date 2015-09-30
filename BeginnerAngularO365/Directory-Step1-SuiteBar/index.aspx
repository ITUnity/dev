<html>

<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->

	<title>Employee Directory</title>
	<LINK REL=StyleSheet HREF="CSS/Directory.css">

	<!--SharePoint Online SuiteBar Support -->
	<!--WEX PreReq - Required for SuiteBar-->
	<script type="text/javascript" src="https://r3.res.outlook.com/o365/versionless/wexprereq_535a70ad.js"></script>

	<!--SharePoint Init - Required for SuiteBar-->
	<script type="text/javascript" src="https://cdn.sharepointonline.com/16148/_layouts/15/16.0.4420.1224/init.js"></script>

	<!--SharePoint Online SuiteNav - Required for SuiteBar-->
	<script type="text/javascript" src="https://cdn.sharepointonline.com/16148/_layouts/15/16.0.4420.1224//online/scripts/sposuitenav.js"></script>
	<!--End SharePoint Online SuiteBar Support-->



</head>

<body>

	<!--suite bar start -->
	<div id="suiteBarTop" class="ms-fullWidth ms-TopBarBackground-bgColor" style="height:50px; position:absolute;left=0px;background-color:black;">
	</div>
	<div id="shellTop" style="position:fixed;z-index:2"></div>
	<div id="pointPublishingAppControl" class="overallContainer focus-disable"></div>
	<div id="shellBottom">

		<script type="text/javascript">
			var pageUrl = window.location.href.toLowerCase();
		var siteColPath;
		
		if (pageUrl.indexOf("sites")>-1 || pageUrl.indexOf("teams")>-1 || pageUrl.indexOf("personal")>-1)
		{
			var pathArray = window.location.pathname.split( '/' );
			
			siteColPath =  window.location.protocol + '//' + window.location.host + '/' + pathArray[1] + '/' + pathArray[2] + '/';
			
		}
		else
		{
			siteColPath = window.location.protocol + '//' + window.location.host + '/';
		}
		
		var _spPageContextInfo={"webServerRelativeUrl":"/portals/hub","webAbsoluteUrl":siteColPath,"siteAbsoluteUrl":siteColPath,"siteId":"{1bea0090-29c2-4bda-a5dc-aa4e7c9c171f}","serverRequestPath":"/portals/hub/AppPages/PointPublishing.aspx","layoutsUrl":"_layouts/15","webId":"{3d59bbf0-db73-4947-8f4f-3813a0f3efd3}","webTitle":"PointPublishing Hub Site","webTemplate":"65","tenantAppVersion":"1515107166","isAppWeb":false,"webLogoUrl":"_layouts/15/images/siteicon.png","webLanguage":1033,"currentLanguage":1033,"currentUICultureName":"en-US","currentCultureName":"en-US","env":"Prod","nid":103,"fid":16148,"serverTime":"2015-07-10T18:09:07.7406487Z","siteClientTag":"0$$16.0.4208.1226","crossDomainPhotosEnabled":true,"webUIVersion":"15","webPermMasks":"{High:176,Low:138612833}","pageListId":"{5012f5d6-bc18-4194-8b64-36af255ead91}","pageItemId":1,"pagePersonalizationScope":1,"userId":"26","alertsEnabled":true,"siteServerRelativeUrl":"/portals/hub","allowSilverlightPrompt":true,"themeCacheToken":"/portals/hub::0:16.0.4208.1226","themedCssFolderUrl":null,"themedImageFileNames":null,"ExpFeatures":[-1935703536,1880353632,1496404048,33636636,320538416,-1796975744,12582918,40381469,4260902,-838729728,1065872,1610805528,939565568,25932035,34140806,1074659328,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1792,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,524288,0,0,32768],"CorrelationId":"4eb5189d-40f5-2000-20f7-0732e16566d2"};_spPageContextInfo.updateFormDigestPageLoaded=new Date(_spPageContextInfo.serverTime);_spPageContextInfo.clientServerTimeDelta=new Date(_spPageContextInfo.serverTime)-new Date();if(typeof(define)=='function'){define('SPPageContextInfo',[],function(){return _spPageContextInfo;});}
		RenderSuiteLinksFromShellData('suiteBarTop', 2);
		</script>
	</div>
	<!--suite bar end -->


</body>

</html>