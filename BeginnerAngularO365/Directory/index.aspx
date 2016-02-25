<html xmlns:mso="urn:schemas-microsoft-com:office:office" xmlns:msdt="uuid:C2F41010-65B3-11d1-A29F-00AA00C14882">
	<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<head>
<meta charset="utf-8">
	    <meta http-equiv="X-UA-Compatible" content="IE=edge">
   		<meta name="viewport" content="width=device-width, initial-scale=1">
    	<!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
		<title>Employee Directory</title>
		<LINK REL=StyleSheet HREF="CSS/Directory.css">
		
		<!--font awesome -->
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
		
		<!--SharePoint Online SuiteBar Support -->
		<script type="text/javascript" src="https://r3.res.outlook.com/o365/versionless/wexprereq_86fff609.js"></script>
		<SharePoint:ScriptLink language="javascript" name="suitelinks.js" OnDemand="true" runat="server" Localizable="false" />
		<!--End SharePoint Online SuiteBar Support-->

		<!--Loading office ui fabric -->
		<link rel="stylesheet" href="https://appsforoffice.microsoft.com/fabric/1.0/fabric.min.css">	
		<link rel="stylesheet" href="https://appsforoffice.microsoft.com/fabric/1.0/fabric.components.min.css">

       
		<!-- SharePoint Request Executor -->
		<script type="text/javascript" src="/_layouts/15/SP.RequestExecutor.js"></script>

		<!--Loading spinner for image preview-->
		<link rel="stylesheet" href="CSS/spinner.css">
		
		<!--Angular CDN -->
		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.7/angular.min.js"></script>
		
		
         <!--Angular UI Fabric Directives after angular-->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/ngOfficeUiFabric/0.4.0/ngOfficeUiFabric.min.js"></script>

        <script src="JavaScript/Directory.js"></script>
	
		<!--Apple Icons and full screen directions-->
	  	<link rel="apple-touch-icon" href="Icons/iOS/Icon.png">
		<link rel="apple-touch-icon" sizes="76x76" href="Icons/iOS/Icon-76.png">
		<link rel="apple-touch-icon" sizes="120x120" href="Icons/iOS/Icon@2x.png">
		<link rel="apple-touch-icon" sizes="152x152" href="Icons/iOS/iTunesArtwork.png">
		<link rel="apple-touch-startup-image" href="Icons/iOS/iTunesArtwork.png">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
		
		<!--Andriod mobile app support-->
		<meta name="mobile-web-app-capable" content="yes">		
		<link rel="manifest" href="Icons/Android/manifest.json">
		
		<!--Add to homescreen on IOS-->
		<link rel="stylesheet" type="text/css" href="CSS/addtohomescreen.css">
		<script src="JavaScript/addtohomescreen.js"></script>
</head>
	<body>
		<script>
		addToHomescreen();
		</script>
		<!--suite bar start -->
		<form id="form1" runat="server">
			<SharePoint:DelegateControl id="ID_SuiteLinksDelegate" ControlId="SuiteLinksDelegate" runat="server" />
			<div id="suiteBarTop" class="ms-fullWidth ms-TopBarBackground-bgColor" style="height:50px; position:absolute;left=0px;background-color:black;"></div>
			<script type="text/javascript">
				RenderSuiteLinksFromShellData('suiteBarTop', 2);
			</script>
			
		</form>
		<!--suite bar end -->
		
		<!--Start App-->
		<div class="mainBody" ng-app="myApp" ng-controller="myCtrl" ng-init="init()"">
		<div class="appBody">
			<!--Begin the big search box-->
            
            <input type="text" id="BigSearch" class="bigSearchBox ms-font-xl" placeholder="Search the employee directory" ng-focus="inputFocus()" ng-blur="inputBlur()"  ng-change="getResults(searchValue,false)" ng-model-options="{debounce: 500}"  ng-model="searchValue">
			
			<!--Start the refiner panel on the left -->
				<div class="refinerPanel" id="refinerPanel">
				
				<!--Begin refiner panel-->
				<div ng-show="filterSelection!='Team'">
					
					<div ng-show="selectedRefiners.length > 0">
						Selected Refiners:
						<ul class="PadLeft10">
							<li class="CardText">
                                <uif-button uif-type="primary" ng-click="getResults(searchValue, false);">Clear Refiners</uif-button>
								<!--<div ng-click="getResults(searchValue, false);" class="ms-font-s-plus noselect ms-fontWeight-semibold">Clear Refiners</div>-->
							</li>
							<li class="CardText" ng-repeat="x in selectedRefiners">
								<div class="ms-font-s-plus noselect">{{x.Type}}: {{x.Value}}</div>
							</li>
						</ul>
					</div>
					<div class="refinerCategory">DEPARTMENT REFINERS</div>				

					<ul class="PadLeft10">						
						<li class="CardText" ng-repeat="x in searchRefiners">
							<div ng-click="refinerClick('Department',x.RefinementName)" class="ms-font-s-plus noselect">{{x.RefinementName}}</div>
						</li>
					</ul>
				</div>					
			</div>
			<!--start the main content panel on the right-->
			<div class="contentPanel" id="contentPanel">
			
				<!--Header Area -->
				<div class="profileHeaderContainer" id="profileHeaderContainer">
					<div class="Header-actions" id="Header-actions">
						<a id="RefinerLetter" class="RefinerLetter ms-font-xl .ms-fontWeight-semibold" ng-class="{selected: filterSelection=='All'}" ng-click="changeFilter('All');">
							All
						</a>
						<a id="RefinerLetter" class="RefinerLetter ms-font-xl .ms-fontWeight-semibold" ng-class="{selected: filterSelection=='Team'}" ng-click="changeFilter('Team');">
							Working With
						</a>
						<a id="RefinerLetter" class="RefinerLetter ms-font-xl .ms-fontWeight-semibold" ng-class="{selected: filterSelection==letter}" ng-click="changeFilter(letter);" ng-repeat="letter in letters">
							{{letter}}
						</a>
					</div>
					<div class="PadLeft10 PadTop10 ms-fontWeight-semibold ms-font-xl id="profileHeaderSubTitle">Looking for {{searchValue ? searchValue : "Everyone"}}</div>	
					<div class="PadLeft10 PadTop10 ms-fontWeight-semibold ms-font-xl">{{filterDescription}}</div>
					<div class="profileHeaderSubTitleEdit ms-font-xl" id="profileHeaderSubTitleEdit"></div>					
					
				</div>
				<!--Start the main content body -->
				<div id="contentBody" class="contentBody" >
					<div class="cardPanel" id="cardPanel" ng-style="{'right' : cardPanelRight()}" ng-cloak>
						<ul class="cardPanelUL" id="cardPanelUL">
							<li ng-repeat="x in searchResults" class="cardBox" id="cardBox" ng-click="itemSelected(x)">
							 	<ul class="cardPanelUL" >
							 		<li class="CardText">{{x.Department}}</li>
							 		<!--<li class="CardTitle">{{x.PreferredName}}</li>-->
							 		<li class="CardText"></li>
									<li class="CardTitle">{{x.LastName}}, {{x.FirstName}}</li>
									<li class="CardText"><img class="CardPhoto" src="/_layouts/15/userphoto.aspx?size=L&accountname={{x.WorkEmail}}"/></li>
							 		<!--<li class="CardText"><img class="CardPhoto" src="https://outlook.office365.com/owa/service.svc/s/GetPersonaPhoto?email={{x.WorkEmail}}&size=HR96x96&sc=1"/></li>-->
							 		<li>									 
									<!--start links-->
									
									<!--Chat-->
									<a ng-show="x.SipAddress.length >= 0" class="InlineActions" id="InlineActions" href="sip:{{x.SipAddress}}">
										<i class="ms-Icon ms-Icon--chat Black" aria-hidden="true"></i></a>
									</a>

									
									<!--Call-->
									<a ng-show="x.WorkPhone.length >= 0" class="InlineActions" id="InlineActions" href="tel:{{x.WorkPhone}}">
										<i class="ms-Icon ms-Icon--phone Black" aria-hidden="true"></i></a>
									</a>
																	
									<!--Email-->
									<a ng-show="x.WorkEmail.length >= 0" class="InlineActions" id="InlineActions" href="mailto:{{x.WorkEmail}}">
										<i class="ms-Icon ms-Icon--mail Black" aria-hidden="true"></i></a>
									</a>
									
									
									<!--UserProfile-->
									<a class="InlineActions" id="InlineActions" href="{{x.Path}}" target="_profile">
										<i class="ms-Icon ms-Icon--org Black" aria-hidden="true"></i>
									</a>
									
									<!--Delve-->
									<a class="InlineActions" id="InlineActions" href="{{x.DelveURL}}" target="_profile">
										<i class="ms-Icon ms-Icon--newsfeed Black" aria-hidden="true"></i></a>
									
									<!--end links-->
									</li> 
									 
									 
									 
									 
							 		
							 	</ul>	
							 </li>
						</ul>
					</div>
					<!-- Person Detail Panel -->
					<div class="detailPanel" id="detailPanel" ng:class="{true:'ms-u-slideLeftIn40', false:'ms-u-slideRightOut40 hidden'}[selectedPerson!=null]"  style="display:none;">
						<!--Close icon in upper right-->
						<i class="ms-Icon ms-Icon--placeholder" aria-hidden="true" style="position: absolute; top: 10px; right: 2px; z-index: 100;"  ng-click="closeDetailPanel();"></i>
						
						<!--Selected Person HeaderBox-->
						<div class="DetailHeaderBox">
						<div class="ms-font-xl DetailName">{{selectedPerson.PreferredName}}</div>
						<img class="CardPhotoDetail" src="/_layouts/15/userphoto.aspx?size=L&accountname={{selectedPerson.WorkEmail}}"/>
							<!--chat -->
							<div ng-show="selectedPerson.SipAddress.length >= 0">
								<a class="PersonalDetailChat"ng-mouseover="showActionHover('Skype Chat')" ng-mouseleave="showActionHover('')" href="sip:{{selectedPerson.SipAddress}}">
									<i class="fa fa-comment Black" style="font-size:15px;"></i><span class="PersonDetailLinks Black"></span>
								</a>
							</div>													
							<!--phone -->
							<div ng-show="selectedPerson.WorkPhone.length >= 0">
								<a class="PersonalDetailPhone" ng-mouseover="showActionHover(selectedPerson.WorkPhone)" ng-mouseleave="showActionHover('')" href="tel:{{selectedPerson.WorkPhone}}">
									<i class="fa fa-phone Black" style="font-size:15px;"></i><span class="PersonDetailLinks Black"></span>
								</a>
							</div>							
							<!--email -->
							<div ng-show="selectedPerson.WorkEmail.length >= 0">
								<a class="PersonalDetailMail" ng-mouseover="showActionHover(selectedPerson.WorkEmail)" ng-mouseleave="showActionHover('')"  href="mailto:{{selectedPerson.WorkEmail}}">
									<i class="fa fa-envelope Black" style="font-size:15px;"></i><span class="PersonDetailLinks Black"></span>
								</a>
							</div>							
							<!--org -->							
							<a class="PersonalDetailOrg" ng-mouseover="showActionHover('User Profile')" ng-mouseleave="showActionHover('')" href="{{selectedPerson.Path}}" target="_profile">
								<i class="ms-Icon ms-Icon--org Black" aria-hidden="true"></i>
							</a>							
                            <!--Delve -->
							<a class="PersonalDetailDelve" ng-mouseover="showActionHover('Delve Content')" ng-mouseleave="showActionHover('')" href="{{selectedPerson.DelveURL}}" target="_profile">
							<i class="ms-Icon ms-Icon--newsfeed Black" aria-hidden="true"></i></a>
							
                            <div class="PersonalDetailHover  ms-font-m-plus .ms-fontWeight-semibold" >{{HoverMessage}}</div>
						</div>
						<!--End Header Box-->
						<br>
						<div class="PersonDetailHeader ms-font-m-plus .ms-fontWeight-semibold">Recent Files:</div>
							<ul class="cardPanelDetailUL">
								<li ng-repeat="f in graphResults" ng-show="f.ServerRedirectedURL.length >= 0" class="PersonDetailMemberships"><a href="{{f.ServerRedirectedURL}}"  ng-model-options="{debounce: 300}" ng-mouseover="itemHover(f)" ng-mouseleave="itemHoverOff(f)" target="_new">{{f.Title}}</a></li>
							</ul>
						</div>
						
						<div class="previewPanel ms-font-m-plus .ms-fontWeight-semibold" id="previewPanel">Document Preview Panel
							<div class="spinner-loader SpinnerLoader" id="Spinner" width="280" height="225">
								
							</div>
							<img id="PreviewImage"  ng-show="currentDoc.ServerRedirectedPreviewUrl.length >= 0" src="{{currentDoc.ServerRedirectedPreviewUrl}}"  imageonload="hideSpinner()" style="z-index=1000;" width="280" height="225">
						</div>					
					</div>
								
				</div>
			</div>	
			</div>	
		</div>
		
		<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
   		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
   		
		<!--<script type="text/javascript">
			var h = document.getElementById("contentBody").offsetHeight-250;
			document.getElementById("cardPanel").style.height = h + "px";
		</script>-->

	
		<!-- Latest compiled and minified JavaScript -->
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
	</body>
</html>