const { movie, movie_schedule, schedule, studio } = require("../../models");

class MovieController {
  static async getMovies(req, res) {
    try {
      const dataMovies = await movie.findAll({ attributes: ["id", "omdbId", "price", "status"] });
      res.status(200).json(dataMovies);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async create(req, res) {
    try {
      const { omdbId, price, status } = req.body;
      const valOmdbId = await movie.findOne({ where: { omdbId } });
      if (valOmdbId) {
        res.status(400).json({ msg: `Movie already registered!` });
      } else {
        const dataMovie = await movie.create({ omdbId, price, status });
        let studioId, scheduleId, data, dataSchedule;
        if (status === "ongoing") {
          const pStudio = await studio.findAll();
          const pSchedule = await schedule.findAll();
          let found = true;
          while (found) {
            let rStudio = Math.floor(Math.random() * pStudio.length);
            let rSchedule = Math.floor(Math.random() * pSchedule.length);
            studioId = pStudio[rStudio].id;
            scheduleId = pSchedule[rSchedule].id;
            data = await movie_schedule.findAll({ where: { studioId, scheduleId } });
            if (data.length === 0) {
              dataSchedule = await movie_schedule.create({ movieId: dataMovie.id, studioId, scheduleId });
              break;
            }
          }
        } else {
          await movie_schedule.destroy({ where: { movieId: dataMovie.id } });
        }
        res.status(201).json({ msg: `Data berhasil disimpan!`, studioId, scheduleId, dataSchedule });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async update(req, res) {
    try {
      const id = +req.params.id;
      const { price, status } = req.body;
      let studioId, scheduleId, data, dataSchedule;
      const dataMovie = await movie.findOne({ where: id });
      if (status === "ongoing") {
        if (dataMovie.status !== "ongoing") {
          const pStudio = await studio.findAll();
          const pSchedule = await schedule.findAll();
          let found = true;
          while (found) {
            let rStudio = Math.floor(Math.random() * pStudio.length);
            let rSchedule = Math.floor(Math.random() * pSchedule.length);
            studioId = pStudio[rStudio].id;
            scheduleId = pSchedule[rSchedule].id;
            data = await movie_schedule.findAll({ where: { studioId, scheduleId } });
            if (data.length === 0) {
              dataSchedule = await movie_schedule.create({ movieId: id, studioId, scheduleId });
              break;
            }
          }
        }
      } else {
        await movie_schedule.destroy({ where: { movieId: dataMovie.id } });
      }
      const resUp = await movie.update({ price, status }, { where: { id } });
      resUp[0] === 1
        ? res.status(200).json({ msg: `Update successfully!` })
        : res.status(404).json({ msg: `Data not found!` });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async delete(req, res) {
    try {
      const id = +req.params.id;
      const resDel = await movie.destroy({ where: { id } });
      resDel === 1
        ? res.status(200).json({ msg: `Delete successfully!` })
        : res.status(404).json({ msg: `Data not found!` });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async getOneMovie(req, res) {
    try {
      const id = +req.params.id;
      const dataMovie = await movie.findByPk(id);
      dataMovie ? res.status(200).json(dataMovie) : res.status(404).json({ msg: `Data not found!` });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async getImdb(req, res) {
    try {
      let { imdbId } = req.body;
      await fetch(`http://www.omdbapi.com/?i=${imdbId}&apikey=d4c2bbe5`)
        .then((response) => response.json())
        .then((response) => {
          const { imdbID, Title, Year, Genre, Director, Writer, Actors, Plot, imdbRating, Language, Poster } = response;
          res.status(200).json({
            imdbID,
            title: Title,
            year: Year,
            genre: Genre,
            director: Director,
            writer: Writer,
            actors: Actors,
            plot: Plot,
            language: Language,
            imdbRating,
            poster: Poster,
          });
        });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async getImdbSearch(req, res) {
    try {
      let { search } = req.body;
      await fetch(`http://www.omdbapi.com/?s=${search}&apikey=d4c2bbe5`)
        .then((response) => response.json())
        .then((response) => {
          const movies = response.Search;
          res.status(200).json(movies);
        });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = MovieController;
