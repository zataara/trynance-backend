\echo 'Delete and recreate trynance db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE trynance;
CREATE DATABASE trynance;
\connect trynance;

\i trynance-schema.sql
\i trynance-seed.sql

\echo 'Delete and recreate trynance_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE trynance_test;
CREATE DATABASE trynance_test;
\connect trynance_test

\i trynance-schema.sql