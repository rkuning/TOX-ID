## untuks sequelize-cli

npx sequelize-cli model:generate --name user --attributes name:string,email:string,level:string,status:string,password:string

npx sequelize-cli model:generate --name patty --attributes balance:bigint,userId:integer

npx sequelize-cli model:generate --name provider --attributes userId:integer,adress:string,phone:string,city:string,latlong:string

npx sequelize-cli model:generate --name movie --attributes imdbId:string,title:string,year:string,rated:string,released:string,runtime:string,genre:string,director:string,writer:string,actor:string,plot:text,language:string,country:string,award:string,poster:string,rating:string,status:string

npx sequelize-cli model:generate --name movie_in_provider --attributes movieId:integer,price:bigint,providerId:integer

npx sequelize-cli model:generate --name studio --attributes name:string,providerId:integer

npx sequelize-cli model:generate --name schedule --attributes time:string,studioId:integer,providerId:integer

npx sequelize-cli model:generate --name seat --attributes no_seat:string,studioId:integer,providerId:integer

npx sequelize-cli model:generate --name movie_schedule --attributes movieId:integer,providerId:integer,studioId:integer,scheduleId:integer

\*\*\*nanti kalo udah kelar yang atas baru di generate lagi yang 2 ini

npx sequelize-cli model:generate --name voucher --attributes code:string,value:bigint,is_valid:boolean

npx sequelize-cli model:generate --name ticket --attributes userId:integer,date:string,scheduleId:integer,studioId:integer,movieId:integer,seatId:integer
