module.exports = {
    multiObject :function(components){
        return components.map((components) => components.toObject());
    },
    object: function(component){
        return component ? component.toObject() : component;
    }
}