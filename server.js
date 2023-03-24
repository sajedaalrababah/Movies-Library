'use strict';
const express = require("express");
const cors = require("cors");
const axios=require('axios');
const movieData= require('./data.json')
const app = express();

require('dotenv').config();
app.use(cors());
const api_key=process.env.api_key
const PORT =process.env.PORT;

app.get("/", handleFirstRoute);
app.get("/favorite", handleFavoritePage);
app.get("/trending", handleTrending);
app.get("/search", handleSearch);
app.get("/discover", handleDiscover);
app.get("/changes", handleChanges);
app.get('/example',errorHandler2)
app.use("*", handleNtFoundError)


function handleFirstRoute(req, res) {
    let result = [];
    let newMovie = new MovieDa(movieData.title, movieData.poster_path, movieData.overview);
    result.push(newMovie);
    res.json(result);
}


function handleFavoritePage(req, res) {
   res.send("Welcome to Favorite Page");
}

function handleNtFoundError(req, res){
    res.status(404).send("not found")
}

function errorHandler2(req,res){
    axios.get('https://example.com')
    .then((result)=> {
    res.json(result);
    })
    .catch((error)=> {
        res.status(500).send("Sorry, something went wrong")
    });
}
function handleTrending(req, res) {
    const url = `https://api.themoviedb.org/3/trending/all/week?api_key=${api_key}`;
    axios.get(url)
        .then(info => {
            console.log(info.data.results);
            let results = info.data.results.map(result => {
                return new MovieDa(result.id, result.title, result.release_date, result.poster_path, result.overview);
            })
            res.json(results);
        })
        .catch(error => {
            console.log(error);
            res.send("inside error");
        })
}

function handleSearch(req, res) {
    let movieName = req.query.movieName;
    const url = `https://api.themoviedb.org/3/search/company?api_key=${api_key}&page=1&query=${movieName}&api_key=${api_key}`
    axios.get(url)
        .then(info => {
            res.json(info.data.results);
        })
        .catch(error => {
            console.log(error);
            res.send("inside error");
        })
}

function handleDiscover(req, res) {
    let movieName = req.query.movieName;
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&query=${movieName}`

    axios.get(url)
        .then(info => {
            res.json(info.data.results);
        })
        .catch(error => {
            console.log(error);
            res.send("inside error");
        })
}



function handleChanges(req, res) {
    let movieName = req.query.movieName;
    const url = `https://api.themoviedb.org/3/movie/changes?api_key=${api_key}&page=1query=${movieName}&api_key=${api_key}`

    axios.get(url)
        .then(info => {
            res.json(info.data.results);
        })
        .catch(error => {
            console.log(error);
            res.send("inside error");
        })
}




function MovieDa(id, title, release_date, poster_path, overview) {
    this.id = id;
    this.title = title;
    this.release_date = release_date;
    this.poster_path = poster_path;
    this.overview = overview;

}


// function Movies(title, poster_path, overview) {
//     this.title = title;
//     this.poster_path = poster_path;
//     this.overview = overview;


// }








app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })





















