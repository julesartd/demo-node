const axios = require('axios');
const readlineSync = require('readline-sync');

// Demander le login et le mot de passe
const login = readlineSync.question('Login ? ');
const password = readlineSync.question('Mot de passe ? ', {
    hideEchoBack: true, // Cache le mot de passe à l'affichage
});

// Envoyer les informations au serveur
axios.post('http://localhost:3000/login', { login, password })
    .then(response => {
        console.log('Connexion réussie ! Voici les données :');
        console.log('Adresses :', response.data.data.addresses);
        console.log('Produits :', response.data.data.products);
    })
    .catch(error => {
        if (error.response) {
            console.log('Erreur :', error.response.data.error);
        } else {
            console.log('Erreur de connexion au serveur.');
        }
    });
