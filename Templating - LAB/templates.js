(function(scope) {
    const templateStringsCache = {};
    
    const getTemplateString = async (name) => {
        if (!templateStringsCache[name]) {
            const path = `./templates/${name}-template.hbs`;
            const response = await fetch(path);
            templateStringsCache[name] = response.text();
        }

        return templateStringsCache[name];
        
    };

    const getTemplateFunc = async name => {
        return Handlebars.compile(await getTemplateString(name));
    };

    const registerPartial = async (partialName, templateName) => {
        const templateString = await getTemplateString(templateName);
        Handlebars.registerPartial(partialName, templateString);
    }

    window.templates = { getTemplateFunc, registerPartial };
}(window));
