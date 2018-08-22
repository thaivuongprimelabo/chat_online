const Utils = {

    replactErrorMessage: (params, string) => {
        var output = string;
        var length = params.length;
        if(length) {
            for(var i = 0; i < length; i++) {
                output = output.replace('{' + i + '}', params[i]);
            }
        }
        return output;
    }
}

export default Utils;
