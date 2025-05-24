package config

import (
    "fmt"
    "gorm.io/driver/postgres"
    "gorm.io/gorm"
    "os"
    "sistema-control-escolar/models"
)

var DB *gorm.DB

func ConnectDatabase() {
    // Imprimir las variables de entorno para depuración
    fmt.Println("Conectando a la base de datos con los siguientes parámetros:")
    fmt.Println("Host:", os.Getenv("DB_HOST"))
    fmt.Println("User:", os.Getenv("DB_USER"))
    fmt.Println("DB Name:", os.Getenv("DB_NAME"))
    fmt.Println("Port:", os.Getenv("DB_PORT"))
    
    dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable",
        os.Getenv("DB_HOST"), os.Getenv("DB_USER"), os.Getenv("DB_PASSWORD"), os.Getenv("DB_NAME"), os.Getenv("DB_PORT"))
    
    var err error
    DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
    if err != nil {
        panic("No se pudo conectar a la base de datos: " + err.Error())
    }
    
    fmt.Println("Conexión a la base de datos establecida correctamente")

    // Migrar los modelos en el orden correcto
    fmt.Println("Iniciando migración de modelos...")
    
    // Migrar cada modelo por separado para mejor control
    if err := DB.AutoMigrate(&models.Subject{}); err != nil {
        fmt.Println("Error al migrar modelo Subject:", err)
        panic(err)
    }
    fmt.Println("Modelo Subject migrado correctamente")
    
    if err := DB.AutoMigrate(&models.Student{}); err != nil {
        fmt.Println("Error al migrar modelo Student:", err)
        panic(err)
    }
    fmt.Println("Modelo Student migrado correctamente")
    
    if err := DB.AutoMigrate(&models.Grade{}); err != nil {
        fmt.Println("Error al migrar modelo Grade:", err)
        panic(err)
    }
    fmt.Println("Modelo Grade migrado correctamente")
    
    fmt.Println("Migración completada con éxito")
}
