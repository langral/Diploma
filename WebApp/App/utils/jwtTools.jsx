import jwtDecode from 'jwt-decode'

const CLAIMS = {
    ROLE: "role",
    NAME: "name"
}

function getClaimFromTarget(target, claim, callback){
    if (target.toLowerCase().search(claim.toLowerCase()) != -1) {
        callback();
    }
}

export function getUserProfileFromJwt(jwt) {
    if (!jwt) return;

    let profile = jwtDecode(jwt),
        roles = null
        name = null;


    for (let key in profile) {
        getClaimFromTarget(key, CLAIMS.ROLE, () => roles = profile[key]);
        getClaimFromTarget(key, CLAIMS.NAME, () => name = profile[key]);
    }

    profile[CLAIMS.ROLE] = roles;
    profile[CLAIMS.NAME] = name;
    profile.authToken = jwt;

    return profile;
}