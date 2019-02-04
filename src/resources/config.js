var DEVConfig = {
    env: 'DEV',
    region: 'none',
    api: 'www.DEVAPI.com',
    distPath: 'DEV'
};

var UATConfig = {
    env: 'UAT',
    region: 'none',
    api: 'www.UATAPI.com',
    distPath: 'UAT'
};

var PRODConfig = {
    env: 'PROD',
    region: 'none',
    api: 'www.PRODAPI.com',
    distPath: 'PROD'
};

//----------------EU
var DEVEUConfig = {
    env: 'DEV',
    region: 'EU',
    api: 'www.DEVEUAPI.com',
    distPath: 'DEV_EU',
    envSpecAsset: 'euAsset'
};

var UATEUConfig = {
    env: 'UAT',
    region: 'EU',
    api: 'www.UATEUAPI.com',
    distPath: 'UAT_EU',
    envSpecAsset: 'euAsset'
};

var PRODEUConfig = {
    env: 'PROD',
    region: 'EU',
    api: 'www.PRODEUAPI.com',
    distPath: 'PROD_EU',
    envSpecAsset: 'euAsset'
};

//----------------APAC
var DEVAPACConfig = {
    env: 'DEV',
    region: 'APAC',
    api: 'www.DEVAPACAPI.com',
    distPath: 'DEV_APAC',
};

var UATAPACConfig = {
    env: 'UAT',
    region: 'APAC',
    api: 'www.UATAPACAPI.com',
    distPath: 'UAT_APAC',
};

var PRODAPACConfig = {
    env: 'PROD',
    region: 'APAC',
    api: 'www.PRODAPACAPI.com',
    distPath: 'PROD_APAC'
};
//------------------------------------------

var APAC_excludedComp = ['euspec-index'];

var getEnviormentConfigurations = function(enviorment, region) {
    enviorment = enviorment.toUpperCase();
    region = region ? region.toUpperCase() : '';
    var con = config[enviorment + region + 'Config'];

    return {
        env: JSON.stringify(con.env),
        region: JSON.stringify(con.region),
        api: JSON.stringify(con.api),
        distPath: con.distPath,
        envSpecAsset: con.envSpecAsset
    };
};

var filterModuleForRegion = (modules, region) => {
    if(region && region.toLowerCase() === 'apac')
        var excMod = APAC_excludedComp;
    else
        return modules;

    var modulesFiltered = modules.filter((module)=> {
        module = module.replace('.js', '');
        return !excMod.includes(module);
    });

    return modulesFiltered;
};

var config = {
    DEVConfig, UATConfig, PRODConfig,
    DEVEUConfig, UATEUConfig, PRODEUConfig,
    DEVAPACConfig, UATAPACConfig, PRODAPACConfig,
    getEnviormentConfigurations,
    filterModuleForRegion
};

module.exports = config;
