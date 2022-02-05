const knex = require('knex');

const dbConnection = knex({
    client: 'mysql2',
    connection: {
        host: '49.12.236.108',
        port: 3306,
        user: 'dbuser',
        password: '$GameCluster2022',
        database: 'gamecluster'
    }
});


module.exports = dbConnection;