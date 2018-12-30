import http from './http-service.js';

class AuthService {
    login(email, password) {
        return http.post('auth/login', { email, password }) //{ email, password } - BODY
            .then(({ data }) => {
                this.setLoginData(data);
                return data;
            })
            // .catch((error) => {
            //     console.log(error.response.data.errors)
            //     return error.response.data.errors; //hvatamo greske sa servera
            // });
    }

    setAuthHeaders(token) {
        //ako nema tokena
        if(!token) {
            delete http.defaults.headers.common['Authorization']; //izbrisi headere za tog usera koji nema token
            return;
        }

        //setovali smo token u axios u samim headerima
        http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    //ovde sam raspakovala usera i u store-u mogu da ga koristim kao user
    register({ 
        first_name, 
        last_name, 
        email, password, 
        password_confirmation, 
        conditions }) {
        return http.post('auth/register', { 
            first_name, 
            last_name, 
            email, 
            password, 
            password_confirmation, 
            conditions 
            })
            .then(({ data }) => {
                this.setLoginData(data);
                return data;
            })
            // .catch((error) => {
            //     return error.response.data.errors;
            // });
    }

    //logovanje korisnika automatski po registraciji i ako je ulogovan a ne izloguje se onda da ostane ulogovan
    setLoginData(data) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        // localStorage.setItem('id', data.user.id);
        // console.log(data.user.id)
        this.setAuthHeaders(data.token);
    }
}

//ako je korisnik vec ulogovan, tj ako vec imamo token
const checkForToken = (authService) => {
    const token = localStorage.getItem('token'); //uzimamo token iz localStorage koji je deo browsera
    if(token) {
        authService.setAuthHeaders(token); //ako ima tokena postavi headere useru koji je autorizovan
    }
};

const authService = new AuthService();
checkForToken(authService);
export default authService;
