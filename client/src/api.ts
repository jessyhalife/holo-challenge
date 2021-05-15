import { User } from './types';

const api = {
    login: (username: string, password: string): Promise<{ message: string, token: string, admin: Boolean, username: string }> => {
        return fetch("http://localhost:4200/login", {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "username": username,
                "password": password
            }),
        })
            .then(res => res.json())
            .then(data => data)
            .catch(err => {
                console.log(err)
                throw Error(err)
            })
    },
    getAll: (page: number = 0, token: string): Promise<{ results: User[], total: number, page: number }> => {
        return fetch(`http://localhost:4200/users?page=${page}`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json', "Authorization": "Bearer " + token },
        })
            .then(res => res.json())
            .then(data => data)
            .catch(err => {
                console.log(err)
                throw Error(err)
            })
    },
    create: (user: Omit<User, "_id">, token: string): Promise<void> => {
        console.log("porque viene aca?")
        return fetch(`http://localhost:4200/users`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json', "Authorization": "Bearer " + token },
            body: JSON.stringify({ username: user.username, password: user.password, email: user.email })
        })
            .then(res => {
                return ;
            })
            .catch(err => {
                console.log(err)
                throw Error(err)
            })
    }
}

export default api;