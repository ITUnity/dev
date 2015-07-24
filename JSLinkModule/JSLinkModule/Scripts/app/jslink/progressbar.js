(function () {
    var overrideCtx = {};
    overrideCtx.Templates = {};

    overrideCtx.Templates.Fields = {
        'PercentComplete': { 'View': '<div style="background: #F3F3F3; display:block; height: 20px; width: 100px;"><div style="background: #0072C6; height: 100%; width: <#=ctx.CurrentItem.PercentComplete.replace(/ /g,"")#>;"></div></div>' }
    };

    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideCtx);
})();