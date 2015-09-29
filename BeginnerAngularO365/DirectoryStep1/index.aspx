<html>
	<head>
<meta charset="utf-8">
	    <meta http-equiv="X-UA-Compatible" content="IE=edge">
   		<meta name="viewport" content="width=device-width, initial-scale=1">
    	<!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
		<title>Employee Directory</title>
		<LINK REL=StyleSheet HREF="CSS/Directory.css">
		 <!-- Bootstrap -->
	    <!-- Latest compiled and minified CSS -->
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
		
		<!-- Optional theme -->
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css">
		
		<!--font awesome -->
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
		
		<!--SharePoint Online Links -->
		<link type="text/css" rel="stylesheet" href="https://r3.res.outlook.com/o365/versionless/wexstyles_e33c2966.css" />
		<script type="text/javascript" src="https://ajax.aspnetcdn.com/ajax/jquery/jquery-1.11.0.min.js"></script>
		<script type="text/javascript" src="https://r3.res.outlook.com/o365/versionless/wexprereq_86fff609.js"></script>
		<script type="text/javascript" src="https://r3.res.outlook.com/o365/versionless/jsmvvm_d380fc7f.js"></script>
		<script type="text/javascript" src="https://r3.res.outlook.com/o365/versionless/wexstrings_3682b144.js"></script>
		<script type="text/javascript" src="https://r3.res.outlook.com/o365/versionless/wexpulse_a84c21f4.js"></script>
		<script type="text/javascript" src="https://r3.res.outlook.com/o365/versionless/wex_e563c15b.js"></script>
		<script type="text/javascript" src="https://cdn.sharepointonline.com/16148/_layouts/15/16.0.4208.1226/init.js"></script>
		<script type="text/javascript" src="https://cdn.sharepointonline.com/16148/_layouts/15/16.0.4208.1226//online/scripts/sposuitenav.js"></script>

		<!-- SharePoint Js Libs -->
		<script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
		<script type="text/javascript" src="/_layouts/15/sp.js"></script>
		<script type="text/javascript" src="/_layouts/15/SP.RequestExecutor.js"></script>


		
		
		
	
	    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
	    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
	    <!--[if lt IE 9]>
	      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
	      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
	    <![endif]-->
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
		
		var _spPageContextInfo={"webServerRelativeUrl":"/portals/hub","webAbsoluteUrl":siteColPath,"siteAbsoluteUrl":siteColPath,"siteId":"{1bea0090-29c2-4bda-a5dc-aa4e7c9c171f}","serverRequestPath":"/portals/hub/AppPages/PointPublishing.aspx","layoutsUrl":"_layouts/15","webId":"{3d59bbf0-db73-4947-8f4f-3813a0f3efd3}","webTitle":"PointPublishing Hub Site","webTemplate":"65","tenantAppVersion":"1515107166","isAppWeb":false,"webLogoUrl":"_layouts/15/images/siteicon.png","webLanguage":1033,"currentLanguage":1033,"currentUICultureName":"en-US","currentCultureName":"en-US","env":"Prod","nid":103,"fid":16148,"serverTime":"2015-07-10T18:09:07.7406487Z","siteClientTag":"0$$16.0.4208.1226","crossDomainPhotosEnabled":true,"webUIVersion":"15","webPermMasks":"{High:176,Low:138612833}","pageListId":"{5012f5d6-bc18-4194-8b64-36af255ead91}","pageItemId":1,"pagePersonalizationScope":1,"userId":"26","userLoginName":"teland@atrion.com","systemUserKey":"i:0h.f|membership|1003bffd8655f7b6@live.com","alertsEnabled":true,"siteServerRelativeUrl":"/portals/hub","allowSilverlightPrompt":true,"themeCacheToken":"/portals/hub::0:16.0.4208.1226","themedCssFolderUrl":null,"themedImageFileNames":null,"ExpFeatures":[-1935703536,1880353632,1496404048,33636636,320538416,-1796975744,12582918,40381469,4260902,-838729728,1065872,1610805528,939565568,25932035,34140806,1074659328,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1792,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,524288,0,0,32768],"CorrelationId":"4eb5189d-40f5-2000-20f7-0732e16566d2"};_spPageContextInfo.updateFormDigestPageLoaded=new Date(_spPageContextInfo.serverTime);_spPageContextInfo.clientServerTimeDelta=new Date(_spPageContextInfo.serverTime)-new Date();if(typeof(define)=='function'){define('SPPageContextInfo',[],function(){return _spPageContextInfo;});}
		RenderSuiteLinksFromShellData('suiteBarTop', 2);
		
		
	</script>
</div>

		<!--suite bar end -->
		
		<div class="mainBody">
		<div class="appBody">
			<!--Start the refiner panel on the left -->
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

			
			</div>
			<!--start the main content panel on the right-->
			<div class="contentPanel" id="contentPanel">
			
				<!--Header Area -->
				<div class="profileHeaderContainer" id="profileHeaderContainer">
					<div class="profileHeaderContainerName" id="profileHeaderContainerName">Employee Directory</div>
					<div class="profileHeaderSubTitle" id="profileHeaderSubTitle">Looking for Search Value</div>
					<div class="profileHeaderSubTitleEdit" id="profileHeaderSubTitleEdit">Search for: <input type="text" style="width:200px"></div>					
					<!-- A-Z Search buttons-->
					<div class="Header-actions">
						<a id="RefinerLetter" class="RefinerLetter">
							A
						</a>
						<a id="RefinerLetter" class="RefinerLetter">
							B
						</a>
						<a id="RefinerLetter" class="RefinerLetter">
							C
						</a>
						<a  id="RefinerLetter" class="RefinerLetter">
							D
						</a>
						<a id="RefinerLetter"  class="RefinerLetter">
							E
						</a>
						<a id="RefinerLetter"  class="RefinerLetter">
							F
						</a>
						<a  id="RefinerLetter" class="RefinerLetter">
							G
						</a>
						<a  id="RefinerLetter" class="RefinerLetter">
							H
						</a>
						<a  id="RefinerLetter" class="RefinerLetter">
							I
						</a>
						<a  id="RefinerLetter" class="RefinerLetter">
							J
						</a>
						<a id="RefinerLetter"  class="RefinerLetter">
							K
						</a>
						<a  id="RefinerLetter" class="RefinerLetter">
							L
						</a>
						<a  id="RefinerLetter" class="RefinerLetter">
							M
						</a>
						<a id="RefinerLetter"  class="RefinerLetter">
							N
						</a>
						<a  id="RefinerLetter" class="RefinerLetter">
							O
						</a>
						<a  id="RefinerLetter" class="RefinerLetter">
							P
						</a>
						<a  id="RefinerLetter" class="RefinerLetter">
							Q
						</a>
						<a  id="RefinerLetter" class="RefinerLetter">
							R
						</a>
						<a  id="RefinerLetter" class="RefinerLetter">
							S
						</a>
						<a  id="RefinerLetter" class="RefinerLetter">
							T
						</a>
						<a  id="RefinerLetter" class="RefinerLetter">
							U
						</a>
						<a  id="RefinerLetter" class="RefinerLetter">
							V
						</a>
						<a  id="RefinerLetter" class="RefinerLetter">
							W
						</a>
						<a  id="RefinerLetter" class="RefinerLetter">
							X
						</a>
						<a  id="RefinerLetter" class="RefinerLetter">
							Y
						</a>
						<a  id="RefinerLetter" class="RefinerLetter">
							Z
						</a>
					</div>
				</div>
				<!--Start the main content body -->
				<div class="contentBody" id="contentBody">
					
					<div class="cardPanel" id="cardPanel">
						<ul class="cardPanelUL" id="cardPanelUL">
							<li  class="cardBox" id="cardBox" >
							 	<ul class="cardPanelUL" >
							 		<li class="CardTitle">User Preferred Name</li>
							 		<li class="CardText"> </li>
							 		<li class="CardText">User Department</li>
							 		<li class="CardText"><img class="CardPhoto" src="https://outlook.office365.com/owa/service.svc/s/GetPersonaPhoto?email=me@office365.com"/></li>
							 		<li class="CardText"><a href="https://delveURL"><img class="CardDelve" src="Images/delve.png"/></a></li>
							 		<li class="CardText"><a href="https://ProfileUrl"><img class="CardOrg" src="Images/org.png"/></a></li>
							 		
							 	</ul>	
							 </li>
						</ul>
					</div>
					<!-- Person Detail Panel -->
					<div class="detailPanel" id="detailPanel">
						<h1>Selected Name</h1>
						<div></div>		
						<!--font awesome chat -->
						<a class="PersonalDetailLinks" style="white-space: nowrap;">
							<i class="fa fa-comment Black" style="font-size:15px;"></i><span class="PersonDetailLinks Black">Message</span></a>
						
						
						<!--font awesome phone -->
						<a class="PersonalDetailLinks" style="white-space: nowrap;">
							<i class="fa fa-phone Black" style="font-size:15px;"></i><span class="PersonDetailLinks Black">Work:  800-555-1212</span></a>
						
						<!--font awesome email -->
						<a class="PersonalDetailLinks" style="white-space: nowrap;">
							<i class="fa fa-envelope Black" style="font-size:15px;"></i><span class="PersonDetailLinks Black">Email:  me@work.com</span></a>
						
										
						<br>
						<div class="PersonDetailHeader">Memberships:</div>
						<ul class="cardPanelUL" >
							<li class="PersonDetailMemberships">Group 1</li>
							<li class="PersonDetailMemberships">Group 2</li>
							<li class="PersonDetailMemberships">Group 3</li>
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