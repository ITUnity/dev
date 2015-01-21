<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.requestexecutor.js"></script>
    <script type="text/javascript" src="../Scripts/knockout-3.2.0.js"></script>
    <script type="text/javascript" src="../Scripts/jquery-2.1.3.min.js"></script>
    <meta name="WebPartPageExpansion" content="full" />
    <link rel="Stylesheet" type="text/css" href="../Content/App.css" />
    <script type="text/javascript" src="../Scripts/App.js"></script>
</asp:Content>

<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    CDN Manager
</asp:Content>

<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">

    <div id="toolbarDiv">
        <button id="manageButton" class="btn">Manage CDN List</button>
        <button id="injectButton" class="btn">Install Active CDNs</button>
        <button id="removeButton" class="btn">Remove All CDNs</button>
    </div>
    <div id="resultsDiv">
        <table id="cdnTable">
            <caption>CDN Status</caption>
            <thead>
                <tr>
                    <th><span style="margin-right: 15px;">Title</span></th>
                    <th><span style="margin-right: 15px;">Url</span></th>
                    <th><span style="margin-right: 15px;">Validated</span></th>
                    <th><span style="margin-right: 15px;">Active</span></th>
                    <th><span style="margin-right: 15px;">Installed</span></th>
                </tr>
            </thead>
            <tbody id="resultsTable" data-bind="foreach: window.cdnEntries">
                <tr>
                    <td data-bind="text: Title"></td>
                    <td data-bind="text: Url"></td>
                    <td>
                        <!-- ko if:Validated -->
                        <img src="../Images/check.png" alt="Yes"/>
                        <!-- /ko -->
                    </td>
                    <td>
                        <!-- ko if:Active -->
                        <img src="../Images/check.png" alt="Yes"/>
                        <!-- /ko -->
                    </td>
                    <td>
                        <!-- ko if:Installed -->
                        <img src="../Images/check.png" alt="Yes"/>
                        <!-- /ko -->
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

</asp:Content>
