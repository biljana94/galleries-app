import http from './http-service.js';

class AuthService {
    login(email, password) {
        return http.post('auth/login', { email, password }) //{ email, password } - BODY
            .then(({data}) => data);
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
}

//ako je korisnik vec ulogovan, tj ako vec imamo token
const checkForToken = (authService) => {
    const token = localStorage.getItem('token'); //uzimamo token iz localStorage koji je deo browsera
    if(token) {
        authService.setAuthHeaders(token); //ako ima tokena postavi headere useru koji je autorizovan
    }
};

const authService = new AuthService();
export default authService;

checkForToken(authService);
