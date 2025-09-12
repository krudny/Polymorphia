CREATE TABLE app_user (
  id           SERIAL PRIMARY KEY,
  username     VARCHAR(50) UNIQUE NOT NULL,
  email        VARCHAR(150) UNIQUE NOT NULL,
  created_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2) Profile użytkowników
CREATE TABLE user_profile (
  user_id      INTEGER PRIMARY KEY REFERENCES app_user(id) ON DELETE CASCADE,
  full_name    VARCHAR(100),
  bio          TEXT,
  avatar_url   VARCHAR(255)
);

-- 3) Posty
CREATE TABLE post (
  id           SERIAL PRIMARY KEY,
  author_id    INTEGER NOT NULL REFERENCES app_user(id) ON DELETE CASCADE,
  title        VARCHAR(200) NOT NULL,
  body         TEXT,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4) Polubienia postów
CREATE TABLE post_like (
  user_id      INTEGER NOT NULL REFERENCES app_user(id) ON DELETE CASCADE,
  post_id      INTEGER NOT NULL REFERENCES post(id)      ON DELETE CASCADE,
  liked_at     TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (user_id, post_id)
);