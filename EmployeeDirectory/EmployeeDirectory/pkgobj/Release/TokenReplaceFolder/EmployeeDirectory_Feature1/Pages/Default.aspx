<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">

    <link rel="Stylesheet" type="text/css" href="../Content/App.css" />
    <script type="text/javascript" src="../Scripts/jquery-1.6.2.min.js"></script>
    <script type="text/javascript" src="../Scripts/knockout-2.1.0.js"></script>
    <script type="text/javascript" src="../Scripts/ViewModels/ToolbarViewModel.js"></script>
    <script type="text/javascript" src="../Scripts/ViewModels/ContactViewModel.js"></script>
    <script type="text/javascript" src="../Scripts/App.js"></script>

</asp:Content>

<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
    <div id="alphaTabs"><a class="btn-nav" href="Default.aspx" ><img alt="Table View"  src="/_layouts/images/LIST.GIF" />Table View</a><a  class="btn-nav" href="Default2.aspx" ><img height="16px" alt="Slide View"  src="/_layouts/images/tabgen.GIF" />Slide View</a>
        <table class="tab-table">
            <tbody>
                <tr id="toolbarRow" data-bind="foreach: get_tabs()">
                    <td class="tab-tableCellUnselected"><a class="tab" href="#"><span data-bind="text: get_title()"></span></a></td>
                </tr>
                <tr>
                    <td id="resultsCell" colspan="26">
                        <div id="resultsDiv" style="overflow: auto">
                            <img id="resultsLoading" src="/_layouts/images/loading.gif" />
                            <table id="resultsTable">
                                <thead>
                                    <tr>
                                        <th>Photo</th>
                                        <th>Last Name</th>
                                        <th>First Name</th>
                                        <th>Title</th>
                                        <th>E-mail</th>
                                        <th>Phone</th>
                                    </tr>
                                </thead>
                                <tbody id="resultsTable" data-bind="foreach: get_contacts()">
                                    <tr>
                                        <td nowrap="nowrap"><img height="72px" data-bind="attr: {src: get_picture()}" /></td>
                                        <td nowrap="nowrap" data-bind="text: get_lname()"></td>
                                        <td nowrap="nowrap" data-bind="text: get_fname()"></td>
                                        <td nowrap="nowrap" data-bind="text: get_title()"></td>
                                        <td nowrap="nowrap" data-bind="text: get_email()"></td>
                                        <td nowrap="nowrap" data-bind="text: get_phone()"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div>
    </div>

</asp:Content>
