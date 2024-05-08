-- 1. create DB
sqlite3 PryceDB.db

-- 2. create tables
CREATE TABLE IF NOT EXISTS pryce (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    access_token TEXT NOT NULL,
    selected_user INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS pryce_settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT,
    value TEXT,
    status INTEGER
);


-- 6. exit db
.quit