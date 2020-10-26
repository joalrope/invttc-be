

const isAuthorized = (role) => {




    switch (role) {

        case 'admin': 
        case 'store-manager': 
        case 'owner': 
        case 'app-dev':
            return true
        default:
            return false
    }
}

module.exports = {
    isAuthorized
}

