FROM postgres:alpine as blog_database

COPY scripts/*.sql docker-entrypoint-initdb.d/

ENTRYPOINT ["docker-entrypoint.sh", "postgres"]
