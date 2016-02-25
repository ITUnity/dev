<html xmlns:mso="urn:schemas-microsoft-com:office:office" xmlns:msdt="uuid:C2F41010-65B3-11d1-A29F-00AA00C14882">

<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->

	<title>Employee Directory</title>
	<LINK REL=StyleSheet HREF="CSS/Directory.css">

	<!--SharePoint Online SuiteBar Support -->
	
		<!--WEX PreReq - Required for SuiteBar-->
		<script type="text/javascript" src="https://r3.res.outlook.com/o365/versionless/wexprereq_86fff609.js"></script>
		
		<!--SharePoint Init - Required for SuiteBar-->
		<SharePoint:ScriptLink language="javascript" name="suitelinks.js" OnDemand="true" runat="server" Localizable="false" />

	<!--End SharePoint Online SuiteBar Support-->

	<!-- SharePoint Js Libs -->
	<script type="text/javascript" src="/_layouts/15/SP.RequestExecutor.js"></script>


</head>

<body>

	<!--suite bar start -->		
		<form id="form1" runat="server">
			<SharePoint:DelegateControl id="ID_SuiteLinksDelegate" ControlId="SuiteLinksDelegate" runat="server" />
		</form>
	
		<div id="suiteBarTop" class="ms-fullWidth ms-TopBarBackground-bgColor" style="height:50px; position:absolute;left=0px;background-color:black;"></div>

		<script type="text/javascript">
			RenderSuiteLinksFromShellData('suiteBarTop', 2);
		</script>
	<!--suite bar end -->

	<div class="mainBody">
		<div class="appBody">
			<!--Start the refiner panel on the left -->
			<div class="refinerPanel" id="refinerPanel">
				<h1>RefinerPanel Section</h1>
			</div>
			<!--start the main content panel on the right-->
			<div class="contentPanel" id="contentPanel">
				<!--Header Area -->
				<div class="profileHeaderContainer" id="profileHeaderContainer">
					<h1>ProfileHeaderContainer Section</h1>
				</div>
				<!--Start the main content body -->
				<div class="contentBody" id="contentBody">
					<h1>ContentBody Section</h1>
					<div class="cardPanel" id="cardPanel">
						<h1>CardPanel Section</h1>
						<ul class="cardPanelUL" id="cardPanelUL">
							<li class="cardBox" id="cardBox">
								CardBox
							</li>
						</ul>
					</div>
					<!-- Person Detail Panel -->
					<div class="detailPanel" id="detailPanel">
						<h1>DetailPanel Section</h1>
					</div>
				</div>
			</div>
		</div>
	</div>

	
</body>

</html>