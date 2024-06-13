-- Execute SQL when database is created in Docker

CREATE TABLE test (
    bool_1 BOOLEAN NOT NULL,
    bool_2 BOOLEAN NOT NULL,
    bool_3 BOOLEAN NOT NULL
);

INSERT INTO test VALUES
(FALSE ,FALSE, FALSE),
(FALSE ,FALSE, TRUE),
(FALSE ,TRUE, FALSE),
(FALSE ,TRUE, TRUE),
(TRUE ,FALSE, FALSE),
(TRUE ,FALSE, TRUE),
(TRUE ,TRUE, FALSE),
(TRUE ,TRUE, TRUE);