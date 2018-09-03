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
    },
    makeRoomId: () => {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        
        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        
        return text;
    }
}

export default Utils;
