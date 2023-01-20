module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', '172.18.0.16'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'portfolio'),
      user: env('DATABASE_USERNAME', 'foo'),
      password: env('DATABASE_PASSWORD', 'bar'),
      ssl: env.bool('DATABASE_SSL', false),
    },
  },
});
