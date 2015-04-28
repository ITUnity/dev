<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    Home
</asp:Content>

<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
    <a href="../_layouts/15/start.aspx#/Pages/MDSPage.aspx">MDS Page</a><br />
    <a href="../_layouts/15/start.aspx#/Pages/NonCompliantPage.aspx">Non-Compliant Page</a><br />
    <a href="../_layouts/15/start.aspx#/Lists/Announcements">Announcements</a>
    <p id="message"></p>
    <script>
        SP.SOD.executeOrDelayUntilScriptLoaded(function () {
            SP.SOD.registerSod("app.js", "../scripts/app.js");
            SP.SOD.executeFunc("app.js", null, function () { });
        }, "sp.js");
    </script>
</asp:Content>
