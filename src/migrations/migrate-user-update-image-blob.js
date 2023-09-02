module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.changeColumn('users', 'image', {
        type: Sequelize.BLOB('medium'),
        allowNull: true,
      });
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.changeColumn('users', 'image', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    },
  };