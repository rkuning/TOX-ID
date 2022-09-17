const { user, patty, movie } = require("../../models");
const { decryptPw } = require("../../helpers/bcyrpt");

class HomeController {
  static async showMovies(req, res) {
    try {
      let movies = await movie.findAll();
      let tempMovies = [];
      for (let i in movies) {
        await fetch("http://localhost:3000/admin/movies/getImdb", {
          method: "POST",
          body: JSON.stringify({ imdbId: movies[i].omdbId }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        })
          .then((response) => response.json())
          .then((json) => {
            const { imdbID, title, year, genre, director, writer, actors, plot, imdbRating, language, poster } = json;
            tempMovies.push({
              id: movies[i].id,
              omdbId: imdbID,
              price: movies[i].price,
              status: movies[i].status,
              title,
              year,
              genre,
              director,
              writer,
              actors,
              plot,
              imdbRating,
              language,
              poster,
            });
          })
          .catch((err) => console.log(err));
      }
      res.status(200).json(tempMovies);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async detailMovie(req, res) {
    try {
      let id = +req.params.id;
      let dataMovie = await movie.findByPk(id);
      let tempMovies = {};
      if (dataMovie) {
        await fetch("http://localhost:3000/admin/movies/getImdb", {
          method: "POST",
          body: JSON.stringify({ imdbId: dataMovie.omdbId }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        })
          .then((response) => response.json())
          .then((json) => {
            const { imdbID, title, year, genre, director, writer, actors, plot, imdbRating, language, poster } = json;
            tempMovies = {
              id: dataMovie.id,
              omdbId: imdbID,
              price: dataMovie.price,
              status: dataMovie.status,
              title,
              year,
              genre,
              director,
              writer,
              actors,
              plot,
              imdbRating,
              language,
              poster,
              msg: `Found!`,
            };
          })
          .catch((err) => console.log(err));
        res.status(200).json(tempMovies);
      } else {
        tempMovies = { msg: `Movie not found!` };
        res.status(404).json(tempMovies);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const valUser = await user.findOne({ where: { email } });
      if (valUser) {
        if (decryptPw(password, valUser.password)) {
          if (valUser.status === "active") {
            res.status(200).json(valUser);
          } else {
            res.status(400).json({ msg: `Account cannot reach!` });
          }
        } else {
          res.status(400).json({ msg: `Invalid password!` });
        }
      } else {
        res.status(404).json({ msg: `User unregistered!` });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async register(req, res) {
    try {
      const { name, email, password } = req.body;
      const valEmail = await user.findOne({ where: { email } });
      if (valEmail) {
        res.status(302).json({ msg: `Email already registered!` });
      } else {
        const dataUser = await user.create({ name, email, password });
        await patty.create({ userId: dataUser.id });
        res.status(201).json({ dataUser, msg: `Create successfully!` });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = HomeController;
