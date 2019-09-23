export default (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {});
  Movie.associate = function(models) {
    // associations can be defined here
  };
  return Movie;
};