<html xmlns:mso="urn:schemas-microsoft-com:office:office" xmlns:msdt="uuid:C2F41010-65B3-11d1-A29F-00AA00C14882">
	<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<head runat="server">
<meta charset="utf-8">
	    <meta http-equiv="X-UA-Compatible" content="IE=edge">
   		<meta name="viewport" content="width=device-width, initial-scale=1">
    	<!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
		<title>SharePoint Sites & O365 Groups Catalog</title>
		<LINK REL=StyleSheet HREF="CSS/SiteCatalog.css">
		 <!-- Bootstrap -->
	    <!-- Latest compiled and minified CSS -->
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
		
		<!-- Optional theme -->
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css">
		
		<!--font awesome -->
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
		
		<!--SharePoint Online Links -->
		<script type="text/javascript" src="https://r3.res.outlook.com/o365/versionless/wexprereq_86fff609.js"></script>
	
		<!--SharePoint Init - Required for SuiteBar-->
		<SharePoint:ScriptLink language="javascript" name="suitelinks.js" OnDemand="true" runat="server" Localizable="false" />
		
		
		
	

		<!-- SharePoint Js Libs -->
		<script type="text/javascript" src="/_layouts/15/SP.RequestExecutor.js"></script>


		<!--Angular CDN -->
		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.7/angular.min.js"></script>
		<script src="JavaScript/SiteCatalog.js"></script>
		
		
		
	
	    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
	    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
	    <!--[if lt IE 9]>
	      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
	      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
	    <![endif]-->
	
<!--[if gte mso 9]><SharePoint:CTFieldRefs runat=server Prefix="mso:" FieldList="FileLeafRef"><xml>
<mso:CustomDocumentProperties>
<mso:display_urn_x003a_schemas-microsoft-com_x003a_office_x003a_office_x0023_Editor msdt:dt="string">MOD Administrator</mso:display_urn_x003a_schemas-microsoft-com_x003a_office_x003a_office_x0023_Editor>
<mso:display_urn_x003a_schemas-microsoft-com_x003a_office_x003a_office_x0023_Author msdt:dt="string">MOD Administrator</mso:display_urn_x003a_schemas-microsoft-com_x003a_office_x003a_office_x0023_Author>
</mso:CustomDocumentProperties>
</xml></SharePoint:CTFieldRefs><![endif]-->
</head>
	<body>
		<!--suite bar start -->		
		<form id="form1" runat="server">
			<SharePoint:DelegateControl id="ID_SuiteLinksDelegate" ControlId="SuiteLinksDelegate" runat="server" />
		</form>
	
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
		
		var _spPageContextInfo={"webServerRelativeUrl":"/portals/hub","webAbsoluteUrl":siteColPath,"siteAbsoluteUrl":siteColPath,"siteId":"{1bea0090-29c2-4bda-a5dc-aa4e7c9c171f}","serverRequestPath":"/portals/hub/AppPages/PointPublishing.aspx","layoutsUrl":"_layouts/15","webId":"{3d59bbf0-db73-4947-8f4f-3813a0f3efd3}","webTitle":"PointPublishing Hub Site","webTemplate":"65","tenantAppVersion":"1515107166","isAppWeb":false,"webLogoUrl":"_layouts/15/images/siteicon.png","webLanguage":1033,"currentLanguage":1033,"currentUICultureName":"en-US","currentCultureName":"en-US","env":"Prod","nid":103,"fid":16148,"serverTime":"2015-07-10T18:09:07.7406487Z","siteClientTag":"0$$16.0.4208.1226","crossDomainPhotosEnabled":true,"webUIVersion":"15","webPermMasks":"{High:176,Low:138612833}","pageListId":"{5012f5d6-bc18-4194-8b64-36af255ead91}","pageItemId":1,"pagePersonalizationScope":1,"userId":"26","userLoginName":"teland@atrion.com","systemUserKey":"i:0h.f|membership|1003bffd8655f7b6@live.com","alertsEnabled":true,"siteServerRelativeUrl":"/portals/hub","allowSilverlightPrompt":true,"themeCacheToken":"/portals/hub::0:16.0.4208.1226","themedCssFolderUrl":null,"themedImageFileNames":null,"ExpFeatures":[-1935703536,1880353632,1496404048,33636636,320538416,-1796975744,12582918,40381469,4260902,-838729728,1065872,1610805528,939565568,25932035,34140806,1074659328,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1792,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,524288,0,0,32768],"CorrelationId":"4eb5189d-40f5-2000-20f7-0732e16566d2"};_spPageContextInfo.updateFormDigestPageLoaded=new Date(_spPageContextInfo.serverTime);_spPageContextInfo.clientServerTimeDelta=new Date(_spPageContextInfo.serverTime)-new Date();if(typeof(define)=='function'){define('SPPageContextInfo',[],function(){return _spPageContextInfo;});}
		RenderSuiteLinksFromShellData('suiteBarTop', 2);
		
		
	</script>
</div>

		<!--suite bar end -->
		
		<div class="mainBody" ng-app="myApp" ng-controller="myCtrl" ng-init="init()"">
		<div class="appBody">
			<!--Start the refiner panel on the left 
			<div class="refinerPanel" id="refinerPanel">
				<p>Search for: <input type="text"></p>

				<h3>Refiner Panel</h3>
				<BR/>
				<div class="refinerCategory">DEPARTMENTS</div>	
				<ul>
					<li class="CardText">
						<button  class="RefinerItem">Sample Department</button>
					</li>
				</ul>		

			
			</div>-->
			<!--start the main content panel on the right-->
			<div class="contentPanel" id="contentPanel">
			
				<!--Header Area -->
				<div class="profileHeaderContainer" id="profileHeaderContainer">
					<div class="profileHeaderContainerName" id="profileHeaderContainerName">SharePoint Sites & O365 Groups Catalog</div>
					<!--<div class="profileHeaderSubTitle" id="profileHeaderSubTitle">Looking for Search Value</div>-->
					<div class="profileHeaderSubTitle" id="profileHeaderSubTitle">Search for: <input type="text"  ng-change="getResults(searchValue,false)" ng-model-options="{debounce: 500}"  ng-model="searchValue" style="width:200px;color:black;"></div>					
					<!-- A-Z Search buttons-->
					<div class="Header-actions">
						<a id="RefinerLetter" class="RefinerLetter" ng-click="getResults('A',false)">
							A
						</a>
						<a id="RefinerLetter" class="RefinerLetter"  ng-click="getResults('B',false)">
							B
						</a>
						<a id="RefinerLetter" class="RefinerLetter"  ng-click="getResults('C',false)">
							C
						</a>
						<a  id="RefinerLetter" class="RefinerLetter" ng-click="getResults('D',false)">
							D
						</a>
						<a id="RefinerLetter"  class="RefinerLetter" ng-click="getResults('E',false)">
							E
						</a>
						<a id="RefinerLetter"  class="RefinerLetter" ng-click="getResults('F',false)">
							F
						</a>
						<a  id="RefinerLetter" class="RefinerLetter" ng-click="getResults('G',false)">
							G
						</a>
						<a  id="RefinerLetter" class="RefinerLetter" ng-click="getResults('H',false)">
							H
						</a>
						<a  id="RefinerLetter" class="RefinerLetter" ng-click="getResults('I',false)">
							I
						</a>
						<a  id="RefinerLetter" class="RefinerLetter" ng-click="getResults('J',false)">
							J
						</a>
						<a id="RefinerLetter"  class="RefinerLetter" ng-click="getResults('J',false)">
							K
						</a>
						<a  id="RefinerLetter" class="RefinerLetter" ng-click="getResults('L',false)">
							L
						</a>
						<a  id="RefinerLetter" class="RefinerLetter" ng-click="getResults('M',false)">
							M
						</a>
						<a id="RefinerLetter"  class="RefinerLetter" ng-click="getResults('N',false)">
							N
						</a>
						<a  id="RefinerLetter" class="RefinerLetter" ng-click="getResults('O',false)">
							O
						</a>
						<a  id="RefinerLetter" class="RefinerLetter" ng-click="getResults('P',false)">
							P
						</a>
						<a  id="RefinerLetter" class="RefinerLetter" ng-click="getResults('Q',false)">
							Q
						</a>
						<a  id="RefinerLetter" class="RefinerLetter" ng-click="getResults('R',false)">
							R
						</a>
						<a  id="RefinerLetter" class="RefinerLetter" ng-click="getResults('S',false)">
							S
						</a>
						<a  id="RefinerLetter" class="RefinerLetter" ng-click="getResults('T',false)">
							T
						</a>
						<a  id="RefinerLetter" class="RefinerLetter" ng-click="getResults('U',false)">
							U
						</a>
						<a  id="RefinerLetter" class="RefinerLetter" ng-click="getResults('V',false)">
							V
						</a>
						<a  id="RefinerLetter" class="RefinerLetter" ng-click="getResults('W',false)">
							W
						</a>
						<a  id="RefinerLetter" class="RefinerLetter" ng-click="getResults('X',false)">
							X
						</a>
						<a  id="RefinerLetter" class="RefinerLetter" ng-click="getResults('Y',false)">
							Y
						</a>
						<a  id="RefinerLetter" class="RefinerLetter" ng-click="getResults('Z',false)">
							Z
						</a>
					</div>
				</div>
				<!--Start the main content body -->
				<div class="contentBody" id="contentBody">
					
					<div class="cardPanel" id="cardPanel">
						<ul class="cardPanelUL" id="cardPanelUL" >
							<!-- Individual Card Template-->
							<li  class="cardBox" id="cardBox"  ng-repeat="x in searchResults" >
								<a href="{{x.WebUrl}}" target="_new" style="text-decoration:none;">
								<div class="SiteImageBackground">
									<div class="SiteImage"></div>
								</div>
									<div class="SiteName">{{x.SiteTitle}}</div>
								
							 	<ul class="cardPanelUL" >
							 		<li class="CardTitle">{{x.contentclass}}</li>
							 		<li class="CardText">{{x.DisplayAuthor}}</li>
									<li class="CardLogo"><img src="{{x.SiteLogo}}"/></li>
							 	</ul>	
								</a>
							 </li>
							 <!-- Individual Card Template-->
							
						</ul>
					</div>
					
				</div>
			</div>	
			</div>	
		</div>
		
		<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
   		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
   		
		<script type="text/javascript">
			var h = document.getElementById("contentBody").offsetHeight-250;
			document.getElementById("cardPanel").style.height = h + "px";
		</script>

	
		<!-- Latest compiled and minified JavaScript -->
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
	</body>
</html>