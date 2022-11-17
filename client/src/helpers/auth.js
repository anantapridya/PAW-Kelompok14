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
        const token = localStorage.getItem('token');
        if (token) {
            const role = JSON.parse(localStorage.getItem('user')).roles[0].name;
            if (role === "admin") {
            return true
            } else {
                return false
            }
        } else {
            return false
        }
    }
}

export const getUser = () => {
    // contoh cara pakai: const { token, id } = getUser()
    return {
        __token: JSON.parse(localStorage.getItem("token")),
        __id: JSON.parse(localStorage.getItem("user")).id
    }
}