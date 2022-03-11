import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Global } from 'src/app/models/global/global';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import jwt_decode from 'jwt-decode';
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient) { }


    //El servicio que te regresa el token es el del login. Todos los servicios iran con la ruta base y se agrega lo demás
    login(data) {
        return this.http.post(Global.URL + 'auth/login', data);
    }


    removeToken() {
        if (typeof Storage != "undefined") {
            sessionStorage.removeItem("token");
        }
    }
    storageToken(token) {
        this.removeToken();
        let storageWell: boolean = true;
        if (typeof (Storage) !== "undefined") {
            if (token != null) {
                sessionStorage.setItem("token", JSON.stringify(token));
            } else {
                storageWell = false;
            }
        } else {
            alert("Update your navigator");
            storageWell = false;
        }
        return storageWell;
    }

    getStorageToken(): Token {
        let token: Token;
        if (typeof Storage != "undefined") {
            token = JSON.parse(sessionStorage.getItem("user_key"));
        } else {
            token = null;
        }
        return token;
    }

    getDecodedAccessToken(token: string): any {
        try {
            return jwt_decode(token);
        } catch (e) {
            return null;
        }
    }

}