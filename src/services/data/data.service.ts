import {Injectable} from '@angular/core';
import axios from 'axios';
import {LoadingService} from '../loading/loading.service';
import {AlertService} from '../alert/alert.service';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    data: any = [];

    state = {
        posts: [],
        highlites: [],
        categories: [],
        baseUrl: 'https://www.solosalerno.it/wp-json/wp/v2/posts',
        catUrl: 'https://www.solosalerno.it/wp-json/wp/v2/categories',
        perPage: '?per_page=10',
        embed: '&_embed',
        wpFetchHeaders: {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Expose-Headers': 'x-wp-total'
            }
        }
    };

    async getNumPosts() {
        const {headers} = await axios(`${this.state.baseUrl}${this.state.perPage}`);
        return headers['x-wp-totalpages'];
        /*
        await axios.get(`${this.state.baseUrl}${this.state.perPage}`).then((res) => {
            const headers = res.headers['x-wp-totalpages'];
            //console.log(headers);
            return headers;
        }); */

        //const {headers} = await axios(`${this.state.baseUrl}${this.state.perPage}`, this.state.wpFetchHeaders);
        //return headers['x-wp-totalpages'];
    }

    async fetchPosts(numPages) {
        const posts = [];
        console.log(numPages);

        for (let page = 1; page <= numPages; page += 1) {
            const post = axios.get(`${this.state.baseUrl}${this.state.perPage}&page=${page}${this.state.embed}`);
            posts.push(post);
        }


        await axios.all(posts).then(axios.spread((...res) => {

            const postData = res.map(rest => {
                // tslint:disable-next-line:prefer-for-of
                for (let i = 0; i < rest.data.length; i++) {
                    this.state.posts.push(rest.data[i]);
                }
            });
        })).catch(e => console.log('error fetching posts: ', e));

        return true;
    }

    async getCategories() {
        await axios.get(`${this.state.catUrl}`).then((res) => {
            this.state.categories = res.data;
        });
    }


    constructor(private loadingService: LoadingService, private alertService: AlertService) {

    }

    getHighlites() {
        if (this.state.highlites.length !== 0) {
            return Promise.resolve(this.state);
        } else {
            return new Promise((resolve) => {
                this.loadingService.presentLoading('loadInstagram').then(() => {
                    axios.get('https://www.solosalerno.it/wp-json/wp/v2/posts?_embed').then((res) => {
                        this.state.highlites = res.data;
                        resolve(this.state);
                        this.loadingService.dismissLoading('loadInstagram');
                    }).catch((error) => {
                        this.loadingService.dismissLoading('loadPosts');
                        this.alertService.presentAlert(
                            'Errore',
                            '',
                            'Si è verificato un errore durante il recupero dei dati',
                            ['OK']
                        );
                        console.log(error);
                    });
                });
            });
        }
    }

    getHighlitesForce() {
        return new Promise((resolve) => {
            this.loadingService.presentLoading('loadInstagram').then(() => {
                axios.get('https://www.solosalerno.it/wp-json/wp/v2/posts?_embed').then((res) => {
                    this.state.highlites = res.data;
                    resolve(this.state);
                    this.loadingService.dismissLoading('loadInstagram');
                }).catch((error) => {
                    this.loadingService.dismissLoading('loadPosts');
                    this.alertService.presentAlert(
                        'Errore',
                        '',
                        'Si è verificato un errore durante il recupero dei dati',
                        ['OK']
                    );
                    console.log(error);
                });
            });
        });
    }


    getData(loading) {

        if (this.state.posts.length !== 0 && this.state.categories.length !== 0) {
            return Promise.resolve(this.state);
        } else {

            if (loading === true) {

                return new Promise((resolve) => {
                    this.loadingService.presentLoading('loadPosts').then(() => {
                        this.getNumPosts()
                            .then(numPosts => this.fetchPosts(numPosts))
                            .then(() => this.getCategories())
                            .then((data) => {
                                console.log('data ', this.state);
                                resolve(this.state);
                                this.loadingService.dismissLoading('loadPosts');
                            }).catch((error) => {
                                this.loadingService.dismissLoading('loadPosts');
                                this.alertService.presentAlert(
                                    'Errore',
                                    '',
                                    'Si è verificato un errore durante il recupero dei dati',
                                    ['OK']
                                );
                                console.log(error);
                            }
                        )
                        ;
                    });
                });
            } else {
                return new Promise((resolve) => {
                    this.getNumPosts()
                        .then(numPosts => this.fetchPosts(numPosts))
                        .then(() => this.getCategories())
                        .then((data) => {
                            console.log('data ', this.state);
                            resolve(this.state);
                        }).catch((error) => {
                            this.alertService.presentAlert(
                                'Errore',
                                '',
                                'Si è verificato un errore durante il recupero dei dati',
                                ['OK']
                            );
                            console.log(error);
                        }
                    )
                    ;

                });
            }
        }




        // @ts-ignore
        this.state.posts = this.getNumPosts()
            .then(numPosts => this.fetchPosts(numPosts))
            .then((data) => {
                console.log('data ', this.state);
            });

        /*
              const url = 'https://www.solosalerno.it/wp-json/wp/v2/posts?per_page=10';
                let totalPage = 0;
                await axios.get(url).then((response) => {
                    totalPage = response.headers['x-wp-totalpages']; // ex.: 200
                    for (let i = 1; i <= totalPage; i++) {
                        axios.get(url + '&page=' + i).then((res) => {
                            this.data = [...res.data];
                            console.log(this.data);
                        });

                    }
                });
              console.log(this.data);
              */
    }


    getDataForce() {
        return new Promise((resolve) => {
            this.getNumPosts()
                .then(numPosts => this.fetchPosts(numPosts))
                .then(() => this.getCategories())
                .then((data) => {
                    console.log('data ', this.state);
                    resolve(this.state);
                }).catch((error) => {
                    this.alertService.presentAlert(
                        'Errore',
                        '',
                        'Si è verificato un errore durante il recupero dei dati',
                        ['OK']
                    );
                    console.log(error);
                }
            )
            ;

        });
    }
}




