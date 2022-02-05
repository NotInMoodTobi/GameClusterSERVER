SELECT genre.genre_id, genre.name
FROM gamecluster.game_genre_connection
INNER JOIN genre on game_genre_connection.fk_genre_id = genre.genre_id
WHERE game_genre_connection.fk_game_id = 1