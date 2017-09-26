#!/usr/bin/env bash
if [ -z $DB_NAME ]
then
  DB_NAME=training-skeleton
fi

if [ -z $PG_HOST ]
then
  PG_HOST=localhost
fi

if [ -z $PG_PORT ]
then
  PG_PORT=5432
fi

if [ -z $PG_USER ]
then
  PG_USER=$USER
fi

createdb $DB_NAME || true
# use the PGPASSWORD env var if you have password set
echo PG_HOST $PG_HOST DB_NAME $DB_NAME PG_USER $PG_USER PG_PORT $PG_PORT
psql -h $PG_HOST -d $DB_NAME -U $PG_USER -p $PG_PORT < script/setup-db.sql
