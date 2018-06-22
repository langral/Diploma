import jwtDecode from 'jwt-decode'

const CLAIMS = {
    ROLE: "role",
    NAME: "name",
    REALNAME: "nameidentifier"
}

function getClaimFromTarget(target, claim, callback){
    if (target.toLowerCase().search(claim.toLowerCase()) != -1) {
        callback();
    }
}

export function getUserProfileFromJwt(jwt) {
    if (!jwt) return;
    
    let profile = jwtDecode(jwt),
        roles = null,
        name = null,
        realName = null;


   
    for (let key in profile) {
        getClaimFromTarget(key, CLAIMS.ROLE, () => roles = profile[key]);
        getClaimFromTarget(key, CLAIMS.NAME, () => name = profile[key]);
        getClaimFromTarget(key, CLAIMS.REALNAME, () => realName = profile[key]);
    }

    profile[CLAIMS.ROLE] = roles;
    profile[CLAIMS.NAME] = name;
    profile.teacherName = profile["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    profile.authToken = jwt;
    
    return profile;
}