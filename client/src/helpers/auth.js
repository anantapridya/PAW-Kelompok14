export const isAuth = () => {
    if (window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'));
            } else {
                return false;
            }
        }
        else {
            return false;
        }
    }
}

export const isAdmin = () => {
    if (window !== 'undefined') {
        const role = JSON.parse(localStorage.getItem('user')).roles[0].name;
        if (role === "admin") {
           return true
        }
        else {
            return false
        }
    }
}