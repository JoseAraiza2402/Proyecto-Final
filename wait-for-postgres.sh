#!/bin/bash

# Esperar a que PostgreSQL esté disponible
until pg_isready -h $DB_HOST -p $DB_PORT -U $DB_USER; do
  echo "Esperando a que la base de datos esté lista en $DB_HOST:$DB_PORT..."
  sleep 2
done

echo "Base de datos lista, iniciando la aplicación..."
exec ./main