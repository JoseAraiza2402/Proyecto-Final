# Usar la imagen oficial de Go 1.24
FROM golang:1.24

# Instalar pg_isready
RUN apt-get update && apt-get install -y postgresql-client

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de módulos
COPY go.mod go.sum ./

# Descargar las dependencias
RUN go mod download

# Copiar el código fuente y el script de espera
COPY . .
COPY wait-for-postgres.sh .

# Compilar la aplicación
RUN go build -o main .

# Exponer el puerto
EXPOSE 8080

# Usar el script como punto de entrada
ENTRYPOINT ["./wait-for-postgres.sh"]