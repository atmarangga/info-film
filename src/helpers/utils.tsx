export function checkRequest(requestArray: Array<string>, requestAction: string){
    if(requestArray.indexOf(requestAction) > -1){
        return true;
    }
    return false;
}