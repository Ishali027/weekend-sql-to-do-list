CREATE TABLE "to_do_list" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (250) NOT NULL,
  "completed" BOOLEAN DEFAULT FALSE
);

INSERT INTO "to_do_list" ("task", "completed")
VALUES
('clean room', 'FALSE');