const getPackageManager = () => {
    const userAgent = process.env.npm_config_user_agent || '';

    if(userAgent) {
        if(userAgent.startsWith('pnpm')) {
            return "pnpm"
        };

        if(userAgent.startsWith('bun')) {
            return 'bun'
        };

        if(userAgent.startsWith('yarn')) {
            return 'yarn'
        }
    };

    return "npm"
};

module.exports = {
    getPackageManager
}