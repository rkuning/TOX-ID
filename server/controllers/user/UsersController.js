const { decryptPw, encryptPw } = require("../../helpers/bcyrpt");
const { user, patty, movie, seat, voucher, ticket, movie_schedule } = require("../../models");

class UsersController {
  static async usersHome(req, res) {
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

  static async profile(req, res) {
    try {
      const { id } = req.body;
      const userProfile = await user.findOne({ where: { id } });
      userProfile ? res.status(200).json(userProfile) : res.status(200).json({ msg: `User not found!` });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async updProfile(req, res) {
    try {
      const { id, name, cookiePhone, phone, cookiePassword, password } = req.body;
      const userProfile = await user.findOne({ where: { id, phone: cookiePhone } });
      if (userProfile) {
        if (decryptPw(cookiePassword, userProfile.password)) {
          const newProfile = await user.findOne({ where: { phone } });
          if (newProfile && cookiePassword !== phone) {
            res.status(400).json({ msg: `Phone already registered!` });
          } else {
            const updUser = await user.update({ name, phone, password: encryptPw(password) }, { where: { id } });
            updUser[0] === 1
              ? res.status(201).json({ msg: `Update successfully!` })
              : res.status(400).json({ msg: `Update failed!` });
          }
        } else {
          res.status(400).json({ msg: `Invalid password!` });
        }
      } else {
        res.status(404).json({ msg: `User not found!` });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async redeem(req, res) {
    try {
      const { userId, code } = req.body;
      const dataVoucher = await voucher.findOne({ where: { code, is_valid: true } });
      if (dataVoucher) {
        let value = +dataVoucher.value;
        const dataPatty = await patty.findOne({ where: { userId } });
        const balance = +dataPatty.balance;
        let total = value + balance;
        await patty.update({ balance: total }, { where: { userId } });
        await voucher.update({ is_valid: false }, { where: { code } });
        value = value.toLocaleString();
        res.status(200).json({ msg: `Rp ${value} has been added to balance!` });
      } else {
        res.status(404).json({ msg: `voucher invalid!` });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async findSeats(req, res) {
    try {
      const { movieId, studioId, scheduleId, date } = req.body;
      const dataMovieSchedule = await movie_schedule.findAll({ where: { movieId, studioId, scheduleId } });
      if (dataMovieSchedule.length > 0) {
        const bookedTicket = await ticket.findAll({ include: [user] }, { where: { date, movieId, studioId, scheduleId } });
        const dataSeats = await seat.findAll();
        res.json(bookedTicket);
      } else {
        res.status(404).json({ msg: `Movie schedule unknown!` });
      }
      // const bookedSeat = await ticket.findAll(
      //   { attributes: { seatId } },
      //   { where: { date, studioId, scheduleId, movieId } }
      // );
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async ticket(req, res) {
    try {
      const { movieId, studioId, scheduleId, userId, date } = req.body;
      res.json(ticket);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async record(req, res) {
    try {
      const { userId } = req.body;
      const tickets = await ticket.findAll({ where: { userId } });
      ticket.length > 0 ? res.status(200).json(tickets) : res.status(404).json({ msg: `there is no record!` });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static;
}

module.exports = UsersController;
