USE [master]
GO
/****** Object:  Database [SoluSoftDB]    Script Date: 09/12/2025 05:08:15 p. m. ******/
CREATE DATABASE [SoluSoftDB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'SoluSoftDB', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\SoluSoftDB.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'SoluSoftDB_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\SoluSoftDB_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [SoluSoftDB] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [SoluSoftDB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [SoluSoftDB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [SoluSoftDB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [SoluSoftDB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [SoluSoftDB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [SoluSoftDB] SET ARITHABORT OFF 
GO
ALTER DATABASE [SoluSoftDB] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [SoluSoftDB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [SoluSoftDB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [SoluSoftDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [SoluSoftDB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [SoluSoftDB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [SoluSoftDB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [SoluSoftDB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [SoluSoftDB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [SoluSoftDB] SET  ENABLE_BROKER 
GO
ALTER DATABASE [SoluSoftDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [SoluSoftDB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [SoluSoftDB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [SoluSoftDB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [SoluSoftDB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [SoluSoftDB] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [SoluSoftDB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [SoluSoftDB] SET RECOVERY FULL 
GO
ALTER DATABASE [SoluSoftDB] SET  MULTI_USER 
GO
ALTER DATABASE [SoluSoftDB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [SoluSoftDB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [SoluSoftDB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [SoluSoftDB] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [SoluSoftDB] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [SoluSoftDB] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'SoluSoftDB', N'ON'
GO
ALTER DATABASE [SoluSoftDB] SET QUERY_STORE = OFF
GO
USE [SoluSoftDB]
GO
/****** Object:  Table [dbo].[Categoria_Producto]    Script Date: 09/12/2025 05:08:24 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Categoria_Producto](
	[ID_Categoria] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](50) NOT NULL,
	[Descripcion] [text] NULL,
PRIMARY KEY CLUSTERED 
(
	[ID_Categoria] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Cliente]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cliente](
	[ID_Cliente] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](100) NOT NULL,
	[Apellidos] [varchar](100) NOT NULL,
	[Telefono] [varchar](20) NULL,
	[Correo] [varchar](100) NULL,
	[Direccion] [varchar](max) NULL,
	[Estado] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ID_Cliente] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Detalle_Venta]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Detalle_Venta](
	[ID_Detalle] [int] IDENTITY(1,1) NOT NULL,
	[ID_Venta] [int] NULL,
	[ID_Producto] [int] NULL,
	[Cantidad] [int] NOT NULL,
	[Precio_Unitario] [decimal](10, 2) NOT NULL,
	[Subtotal] [decimal](10, 2) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ID_Detalle] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Empleado]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Empleado](
	[ID_Empleado] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](100) NOT NULL,
	[Apellidos] [varchar](100) NOT NULL,
	[Telefono] [varchar](20) NOT NULL,
	[Direccion] [text] NULL,
	[Cargo] [varchar](50) NOT NULL,
	[Identificacion] [varchar](20) NOT NULL,
	[Correo] [varchar](100) NULL,
	[Estado] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ID_Empleado] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Inventario]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Inventario](
	[ID_Inventario] [int] IDENTITY(1,1) NOT NULL,
	[ID_Producto] [int] NOT NULL,
	[Cantidad] [int] NOT NULL,
	[Fecha_Ingreso] [date] NULL,
	[Fecha_Caducidad] [date] NULL,
PRIMARY KEY CLUSTERED 
(
	[ID_Inventario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Metodo_Pago]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Metodo_Pago](
	[ID_Metodo] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion] [varchar](50) NOT NULL,
	[Codigo] [varchar](20) NULL,
	[Tipo] [varchar](20) NULL,
	[Estado] [bit] NOT NULL,
	[RequiereReferencia] [bit] NOT NULL,
	[FechaCreacion] [datetime] NOT NULL,
	[FechaActualizacion] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[ID_Metodo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UK_MetodoPago_Codigo] UNIQUE NONCLUSTERED 
(
	[Codigo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Producto]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Producto](
	[ID_Producto] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](100) NOT NULL,
	[Descripcion] [text] NULL,
	[Precio] [decimal](10, 2) NOT NULL,
	[Stock] [int] NULL,
	[ID_Categoria] [int] NULL,
	[ID_Proveedor] [int] NULL,
	[StockMinimo] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ID_Producto] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Proveedor]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Proveedor](
	[ID_Proveedor] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](100) NOT NULL,
	[Telefono] [varchar](20) NULL,
	[Correo] [varchar](100) NULL,
	[Direccion] [text] NULL,
PRIMARY KEY CLUSTERED 
(
	[ID_Proveedor] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuario]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuario](
	[ID_Empleado] [int] NOT NULL,
	[Nombre_Usuario] [varchar](50) NOT NULL,
	[Contraseña] [varchar](255) NULL,
	[Rol] [varchar](30) NULL,
	[Estado] [bit] NULL,
	[DebeCambiarClave] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ID_Empleado] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[Nombre_Usuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Venta]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Venta](
	[ID_Venta] [int] IDENTITY(1,1) NOT NULL,
	[Fecha] [datetime] NOT NULL,
	[Total] [decimal](10, 2) NOT NULL,
	[ID_Cliente] [int] NULL,
	[ID_Empleado] [int] NOT NULL,
	[ID_Metodo] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ID_Venta] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ_Empleado_Identificacion]    Script Date: 09/12/2025 05:08:25 p. m. ******/
CREATE UNIQUE NONCLUSTERED INDEX [UQ_Empleado_Identificacion] ON [dbo].[Empleado]
(
	[Identificacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Cliente] ADD  CONSTRAINT [DF_Cliente_Estado]  DEFAULT ((1)) FOR [Estado]
GO
ALTER TABLE [dbo].[Empleado] ADD  DEFAULT ((0)) FOR [Estado]
GO
ALTER TABLE [dbo].[Metodo_Pago] ADD  DEFAULT ((1)) FOR [Estado]
GO
ALTER TABLE [dbo].[Metodo_Pago] ADD  DEFAULT ((0)) FOR [RequiereReferencia]
GO
ALTER TABLE [dbo].[Metodo_Pago] ADD  DEFAULT (getdate()) FOR [FechaCreacion]
GO
ALTER TABLE [dbo].[Producto] ADD  DEFAULT ((0)) FOR [Stock]
GO
ALTER TABLE [dbo].[Producto] ADD  CONSTRAINT [DF_Producto_StockMin]  DEFAULT ((5)) FOR [StockMinimo]
GO
ALTER TABLE [dbo].[Usuario] ADD  CONSTRAINT [DF_Usuario_DebeCambiarClave]  DEFAULT ((0)) FOR [DebeCambiarClave]
GO
ALTER TABLE [dbo].[Detalle_Venta]  WITH CHECK ADD FOREIGN KEY([ID_Producto])
REFERENCES [dbo].[Producto] ([ID_Producto])
GO
ALTER TABLE [dbo].[Detalle_Venta]  WITH CHECK ADD FOREIGN KEY([ID_Venta])
REFERENCES [dbo].[Venta] ([ID_Venta])
GO
ALTER TABLE [dbo].[Inventario]  WITH CHECK ADD FOREIGN KEY([ID_Producto])
REFERENCES [dbo].[Producto] ([ID_Producto])
GO
ALTER TABLE [dbo].[Producto]  WITH CHECK ADD FOREIGN KEY([ID_Categoria])
REFERENCES [dbo].[Categoria_Producto] ([ID_Categoria])
GO
ALTER TABLE [dbo].[Producto]  WITH CHECK ADD FOREIGN KEY([ID_Proveedor])
REFERENCES [dbo].[Proveedor] ([ID_Proveedor])
GO
ALTER TABLE [dbo].[Usuario]  WITH CHECK ADD FOREIGN KEY([ID_Empleado])
REFERENCES [dbo].[Empleado] ([ID_Empleado])
GO
ALTER TABLE [dbo].[Venta]  WITH CHECK ADD FOREIGN KEY([ID_Cliente])
REFERENCES [dbo].[Cliente] ([ID_Cliente])
GO
ALTER TABLE [dbo].[Venta]  WITH CHECK ADD FOREIGN KEY([ID_Empleado])
REFERENCES [dbo].[Empleado] ([ID_Empleado])
GO
ALTER TABLE [dbo].[Venta]  WITH CHECK ADD FOREIGN KEY([ID_Metodo])
REFERENCES [dbo].[Metodo_Pago] ([ID_Metodo])
GO
/****** Object:  StoredProcedure [dbo].[usp_ActivarEmpleado]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[usp_ActivarEmpleado]
    @ID_Empleado INT
AS
BEGIN
    -- Activa el empleado
    UPDATE Empleado SET Estado = 1 WHERE ID_Empleado = @ID_Empleado;

    -- Activa el usuario vinculado
    UPDATE Usuario SET Estado = 1 WHERE ID_Empleado = @ID_Empleado;
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_ActualizarCategoria]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_ActualizarCategoria]
    @ID_Categoria INT,
    @Nombre       VARCHAR(50),
    @Descripcion  TEXT
AS
BEGIN
    UPDATE Categoria_Producto
    SET Nombre = @Nombre,
        Descripcion = @Descripcion
    WHERE ID_Categoria = @ID_Categoria;
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_ActualizarCliente]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE [dbo].[usp_ActualizarCliente]
    @ID_Cliente INT,
    @Nombre     VARCHAR(100),
    @Apellidos  VARCHAR(100),
    @Telefono   VARCHAR(20),
    @Correo     VARCHAR(100),
    @Direccion  VARCHAR(MAX),
    @Estado     BIT
AS
BEGIN
    UPDATE Cliente
    SET Nombre    = @Nombre,
        Apellidos = @Apellidos,
        Telefono  = @Telefono,
        Correo    = @Correo,
        Direccion = @Direccion,
        Estado    = @Estado
    WHERE ID_Cliente = @ID_Cliente;
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_ActualizarCredenciales]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_ActualizarCredenciales]
    @ID_Empleado     INT,
    @Nombre_Usuario  VARCHAR(50),
    @Contraseña      VARCHAR(100)
AS
BEGIN
    UPDATE Usuario
    SET Nombre_Usuario = @Nombre_Usuario,
        Contraseña     = @Contraseña
    WHERE ID_Empleado = @ID_Empleado;
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_ActualizarDetalleVenta]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_ActualizarDetalleVenta]
    @ID_Detalle      INT,
    @ID_Venta        INT,
    @ID_Producto     INT,
    @Cantidad        INT,
    @Precio_Unitario DECIMAL(10,2),
    @Subtotal        DECIMAL(10,2)
AS
BEGIN
    UPDATE Detalle_Venta
    SET ID_Venta        = @ID_Venta,
        ID_Producto     = @ID_Producto,
        Cantidad        = @Cantidad,
        Precio_Unitario = @Precio_Unitario,
        Subtotal        = @Subtotal
    WHERE ID_Detalle = @ID_Detalle;
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_ActualizarEmpleado]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_ActualizarEmpleado]
    @ID_Empleado    INT,
    @Nombre         VARCHAR(100),
    @Apellidos      VARCHAR(100),
    @Telefono       VARCHAR(20),
    @Direccion      TEXT,
    @Cargo          VARCHAR(50),
    @Identificacion VARCHAR(20),
    @Correo         VARCHAR(100)
AS
BEGIN
    UPDATE Empleado
    SET Nombre = @Nombre,
        Apellidos = @Apellidos,
        Telefono = @Telefono,
        Direccion = @Direccion,
        Cargo = @Cargo,
        Identificacion = @Identificacion,
        Correo = @Correo
    WHERE ID_Empleado = @ID_Empleado;
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_ActualizarEmpleadoUsuario]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Crear el nuevo procedimiento SIMPLE Y DIRECTO
CREATE PROCEDURE [dbo].[usp_ActualizarEmpleadoUsuario]
    @ID_Empleado INT,
    @Nombre VARCHAR(100),
    @Apellidos VARCHAR(100),
    @Identificacion VARCHAR(20),
    @Telefono VARCHAR(20),
    @Direccion TEXT,
    @Correo VARCHAR(100),
    @Cargo VARCHAR(50),
    @Nombre_Usuario VARCHAR(50),
    @Rol VARCHAR(30)
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        BEGIN TRANSACTION
        
        -- ✅ Actualizar SOLO la tabla Empleado
        UPDATE Empleado
        SET 
            Nombre = @Nombre,
            Apellidos = @Apellidos,
            Identificacion = @Identificacion,
            Telefono = @Telefono,
            Direccion = @Direccion,
            Correo = @Correo,
            Cargo = @Cargo
        WHERE ID_Empleado = @ID_Empleado;
        
        -- ✅ Actualizar SOLO la tabla Usuario
        UPDATE Usuario
        SET 
            Nombre_Usuario = @Nombre_Usuario,
            Rol = @Rol
        WHERE ID_Empleado = @ID_Empleado;
        
        COMMIT TRANSACTION
        
        -- ✅ Retornar ÉXITO
        SELECT 1 AS Success, 'Actualización exitosa' AS Message;
        
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION
        
        -- ✅ Retornar ERROR
        SELECT 0 AS Success, ERROR_MESSAGE() AS Message;
    END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[usp_ActualizarInventario]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_ActualizarInventario]
    @ID_Inventario   INT,
    @ID_Producto     INT,
    @Cantidad        INT,
    @Fecha_Ingreso   DATE,
    @Fecha_Caducidad DATE
AS
BEGIN
    UPDATE Inventario
    SET ID_Producto     = @ID_Producto,
        Cantidad        = @Cantidad,
        Fecha_Ingreso   = @Fecha_Ingreso,
        Fecha_Caducidad = @Fecha_Caducidad
    WHERE ID_Inventario = @ID_Inventario;
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_ActualizarMetodoPago]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE   PROCEDURE [dbo].[usp_ActualizarMetodoPago]
    @ID_Metodo          INT,
    @Codigo             VARCHAR(20),
    @Descripcion        VARCHAR(100),
    @Tipo               VARCHAR(20),
    @RequiereReferencia BIT,
    @Estado             BIT
AS
BEGIN
    UPDATE Metodo_Pago
    SET Codigo             = @Codigo,
        Descripcion        = @Descripcion,
        Tipo               = @Tipo,
        RequiereReferencia = @RequiereReferencia,
        Estado             = @Estado,
        FechaActualizacion = GETDATE()
    WHERE ID_Metodo = @ID_Metodo;
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_ActualizarProducto]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[usp_ActualizarProducto]
    @ID_Producto  INT,
    @Nombre       VARCHAR(100),
    @Descripcion  TEXT,
    @Precio       DECIMAL(10,2),
    @Stock        INT,
    @ID_Categoria INT,
    @ID_Proveedor INT
AS
BEGIN
    UPDATE Producto
    SET Nombre = @Nombre,
        Descripcion = @Descripcion,
        Precio = @Precio,
        Stock = @Stock,
        ID_Categoria = @ID_Categoria,
        ID_Proveedor = @ID_Proveedor
    WHERE ID_Producto = @ID_Producto;
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_ActualizarProveedor]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_ActualizarProveedor]
    @ID_Proveedor INT,
    @Nombre       VARCHAR(100),
    @Telefono     VARCHAR(20),
    @Correo       VARCHAR(100),
    @Direccion    TEXT
AS
BEGIN
    UPDATE Proveedor
    SET Nombre = @Nombre,
        Telefono = @Telefono,
        Correo = @Correo,
        Direccion = @Direccion
    WHERE ID_Proveedor = @ID_Proveedor;
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_ActualizarRolUsuario]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_ActualizarRolUsuario]
    @ID_Empleado INT,
    @Rol         VARCHAR(30)
AS
BEGIN
    UPDATE Usuario
    SET Rol = @Rol
    WHERE ID_Empleado = @ID_Empleado;
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_ActualizarUsuario]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_ActualizarUsuario]
    @ID_Empleado     INT,
    @Nombre_Usuario  VARCHAR(50),
    @Contraseña      VARCHAR(100),
    @Rol             VARCHAR(30),
    @Estado          BIT
AS
BEGIN
    UPDATE Usuario
    SET Nombre_Usuario = @Nombre_Usuario,
        Contraseña     = @Contraseña,
        Rol            = @Rol,
        Estado         = @Estado
    WHERE ID_Empleado = @ID_Empleado;
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_ActualizarVenta]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_ActualizarVenta]
    @ID_Venta    INT,
    @Fecha       DATE,
    @Total       DECIMAL(10,2),
    @ID_Cliente  INT,
    @ID_Empleado INT,
    @ID_Metodo   INT
AS
BEGIN
    UPDATE Venta
    SET Fecha = @Fecha,
        Total = @Total,
        ID_Cliente = @ID_Cliente,
        ID_Empleado = @ID_Empleado,
        ID_Metodo = @ID_Metodo
    WHERE ID_Venta = @ID_Venta;
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_CambiarEstadoCliente]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Desactivar / activar (en vez de borrar)
CREATE   PROCEDURE [dbo].[usp_CambiarEstadoCliente]
    @ID_Cliente INT,
    @Estado     BIT
AS
BEGIN
    UPDATE Cliente
    SET Estado = @Estado
    WHERE ID_Cliente = @ID_Cliente;
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_CambiarEstadoEmpleadoYUsuario]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_CambiarEstadoEmpleadoYUsuario]
    @ID_Empleado INT,
    @Estado BIT
AS
BEGIN
    -- Actualiza empleado
    UPDATE Empleado SET Estado = @Estado WHERE ID_Empleado = @ID_Empleado;
    
    -- Actualiza usuario vinculado
    UPDATE Usuario SET Estado = @Estado WHERE ID_Empleado = @ID_Empleado;
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_CambiarEstadoMetodoPago]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE [dbo].[usp_CambiarEstadoMetodoPago]
    @ID_Metodo INT,
    @Estado    BIT     -- 1 = Activo, 0 = Inactivo
AS
BEGIN
    UPDATE Metodo_Pago
    SET Estado = @Estado,
        FechaActualizacion = GETDATE()
    WHERE ID_Metodo = @ID_Metodo;
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_ConsultarCategoria]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[usp_ConsultarCategoria]
    @ID_Categoria INT
AS
BEGIN
    SELECT * FROM Categoria_Producto
    WHERE ID_Categoria = @ID_Categoria;
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_ConsultarCliente]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE [dbo].[usp_ConsultarCliente]
    @ID_Cliente INT
AS
BEGIN
    SELECT *
    FROM Cliente
    WHERE ID_Cliente = @ID_Cliente;
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_ConsultarDetalleVenta]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_ConsultarDetalleVenta]
    @ID_Detalle INT
AS
BEGIN
    SELECT D.*, P.Nombre AS Producto
    FROM Detalle_Venta D
    INNER JOIN Producto P ON D.ID_Producto = P.ID_Producto
    WHERE ID_Detalle = @ID_Detalle;
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_ConsultarEmpleado]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_ConsultarEmpleado]
    @ID_Empleado INT
AS
BEGIN
    SELECT ID_Empleado, Nombre, Apellidos, Telefono, Direccion, Cargo, Identificacion, Correo, Estado
    FROM Empleado
    WHERE ID_Empleado = @ID_Empleado;
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_ConsultarInventario]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[usp_ConsultarInventario]
    @ID_Inventario INT
AS
BEGIN
    SELECT I.*, P.Nombre AS NombreProducto
    FROM Inventario I
    INNER JOIN Producto P ON I.ID_Producto = P.ID_Producto
    WHERE I.ID_Inventario = @ID_Inventario;
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_ConsultarMetodoPago]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE   PROCEDURE [dbo].[usp_ConsultarMetodoPago]
    @ID_Metodo INT
AS
BEGIN
    SELECT ID_Metodo, Codigo, Descripcion, Tipo, Estado, RequiereReferencia,
           FechaCreacion, FechaActualizacion
    FROM Metodo_Pago
    WHERE ID_Metodo = @ID_Metodo;
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_ConsultarProducto]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_ConsultarProducto]
    @ID_Producto INT
AS
BEGIN
    SELECT * FROM Producto WHERE ID_Producto = @ID_Producto;
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_ConsultarProveedor]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_ConsultarProveedor]
    @ID_Proveedor INT
AS
BEGIN
    SELECT * FROM Proveedor
    WHERE ID_Proveedor = @ID_Proveedor;
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_ConsultarUsuario]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_ConsultarUsuario]
    @ID_Empleado INT
AS
BEGIN
    SELECT * FROM Usuario
    WHERE ID_Empleado = @ID_Empleado;
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_ConsultarVenta]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_ConsultarVenta]
    @ID_Venta INT
AS
BEGIN
    SELECT V.*, 
           C.Nombre AS Cliente, 
           E.Nombre + ' ' + E.Apellidos AS Empleado, 
           M.Descripcion AS MetodoPago
    FROM Venta V
    LEFT JOIN Cliente C ON V.ID_Cliente = C.ID_Cliente
    LEFT JOIN Empleado E ON V.ID_Empleado = E.ID_Empleado
    LEFT JOIN Metodo_Pago M ON V.ID_Metodo = M.ID_Metodo
    WHERE V.ID_Venta = @ID_Venta;
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_DesactivarEmpleado]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_DesactivarEmpleado]
    @ID_Empleado INT
AS
BEGIN
    UPDATE Empleado
    SET Estado = 0
    WHERE ID_Empleado = @ID_Empleado;

    UPDATE Usuario
    SET Estado = 0
    WHERE ID_Empleado = @ID_Empleado;
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_DescontarStockProducto]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_DescontarStockProducto]
    @ID_Producto INT,
    @Cantidad    INT
AS
BEGIN
    UPDATE Producto
    SET Stock = Stock - @Cantidad
    WHERE ID_Producto = @ID_Producto;
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_EliminarCategoria]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_EliminarCategoria]
    @ID_Categoria INT
AS
BEGIN
    DELETE FROM Categoria_Producto
    WHERE ID_Categoria = @ID_Categoria;
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_EliminarCliente]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE [dbo].[usp_EliminarCliente]
    @ID_Cliente INT
AS
BEGIN
    DELETE FROM Cliente WHERE ID_Cliente = @ID_Cliente;
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_EliminarDetalleVenta]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_EliminarDetalleVenta]
    @ID_Detalle INT
AS
BEGIN
    DELETE FROM Detalle_Venta
    WHERE ID_Detalle = @ID_Detalle;
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_EliminarEmpleado]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_EliminarEmpleado]
    @ID_Empleado INT
AS
BEGIN
    DELETE FROM Empleado
    WHERE ID_Empleado = @ID_Empleado;
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_EliminarEmpleadoYUsuario]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[usp_EliminarEmpleadoYUsuario]
    @ID_Empleado INT
AS
BEGIN
    -- Primero elimina el usuario (por si depende del empleado)
    DELETE FROM Usuario WHERE ID_Empleado = @ID_Empleado;
    -- Luego elimina el empleado
    DELETE FROM Empleado WHERE ID_Empleado = @ID_Empleado;
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_EliminarInventario]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_EliminarInventario]
    @ID_Inventario INT
AS
BEGIN
    DELETE FROM Inventario
    WHERE ID_Inventario = @ID_Inventario;
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_EliminarMetodoPago]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO





CREATE   PROCEDURE [dbo].[usp_EliminarMetodoPago]
    @ID_Metodo INT
AS
BEGIN
    DELETE FROM Metodo_Pago
    WHERE ID_Metodo = @ID_Metodo;
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_EliminarProducto]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_EliminarProducto]
    @ID_Producto INT
AS
BEGIN
    DELETE FROM Producto WHERE ID_Producto = @ID_Producto;
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_EliminarProveedor]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[usp_EliminarProveedor]
    @ID_Proveedor INT
AS
BEGIN
    DELETE FROM Proveedor
    WHERE ID_Proveedor = @ID_Proveedor;
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_EliminarUsuario]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_EliminarUsuario]
    @ID_Empleado INT
AS
BEGIN
    DELETE FROM Usuario WHERE ID_Empleado = @ID_Empleado;
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_EliminarVenta]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_EliminarVenta]
    @ID_Venta INT
AS
BEGIN
    DELETE FROM Venta WHERE ID_Venta = @ID_Venta;
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_ListarCategorias]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_ListarCategorias]
AS
BEGIN
    SELECT * FROM Categoria_Producto;
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_ListarClientes]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE [dbo].[usp_ListarClientes]
AS
BEGIN
    SELECT *
    FROM Cliente;
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_ListarDetallesPorVenta]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[usp_ListarDetallesPorVenta]
    @ID_Venta INT
AS
BEGIN
    SELECT D.ID_Detalle, P.Nombre AS Producto, D.Cantidad, D.Precio_Unitario, D.Subtotal
    FROM Detalle_Venta D
    INNER JOIN Producto P ON D.ID_Producto = P.ID_Producto
    WHERE D.ID_Venta = @ID_Venta;
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_ListarEmpleados]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[usp_ListarEmpleados]
AS
BEGIN
    SELECT ID_Empleado, Nombre, Apellidos, Telefono, Direccion, Cargo, Identificacion, Correo, Estado
    FROM Empleado;
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_ListarInventario]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[usp_ListarInventario]
AS
BEGIN
    SELECT I.*, P.Nombre AS NombreProducto
    FROM Inventario I
    INNER JOIN Producto P ON I.ID_Producto = P.ID_Producto;
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_ListarMetodosPago]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE [dbo].[usp_ListarMetodosPago]
AS
BEGIN
    SELECT ID_Metodo, Codigo, Descripcion, Tipo, Estado, RequiereReferencia,
           FechaCreacion, FechaActualizacion
    FROM Metodo_Pago
    ORDER BY Estado DESC, Descripcion;
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_ListarProductos]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_ListarProductos]
AS
BEGIN
    SELECT * FROM Producto;
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_ListarProveedores]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_ListarProveedores]
AS
BEGIN
    SELECT * FROM Proveedor;
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_ListarUsuarios]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_ListarUsuarios]
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT 
        E.ID_Empleado,
        E.Nombre,
        E.Apellidos,
        E.Identificacion,
        E.Telefono,
        E.Direccion,
        E.Correo,
        E.Cargo,
        E.Estado AS EstadoEmpleado,
        U.Nombre_Usuario,
        U.Contraseña,
        U.Rol,
        U.Estado AS EstadoUsuario
    FROM Usuario U
    INNER JOIN Empleado E ON U.ID_Empleado = E.ID_Empleado
    ORDER BY E.ID_Empleado DESC;
END
GO
/****** Object:  StoredProcedure [dbo].[usp_ListarVentas]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

	CREATE PROCEDURE [dbo].[usp_ListarVentas]  
AS  
BEGIN  
    SELECT 
        V.ID_Venta, 
        V.Fecha, 
        V.Total,
        
        -- ¡ESTOS SON LOS QUE FALTABAN! --
        V.ID_Cliente,
        V.ID_Empleado,
        V.ID_Metodo,
        -----------------------------------

        C.Nombre + ' ' + C.Apellidos AS Cliente,  
        E.Nombre + ' ' + E.Apellidos AS Empleado,  
        M.Descripcion AS MetodoPago  
    FROM Venta V  
    LEFT JOIN Cliente C ON V.ID_Cliente = C.ID_Cliente  
    LEFT JOIN Empleado E ON V.ID_Empleado = E.ID_Empleado  
    LEFT JOIN Metodo_Pago M ON V.ID_Metodo = M.ID_Metodo
    ORDER BY V.Fecha DESC; -- Agregué orden descendente para ver las últimas primero
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_ObtenerEmpleadoUsuarioPorID]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_ObtenerEmpleadoUsuarioPorID]
    @ID_Empleado INT
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT 
        E.ID_Empleado,
        E.Nombre,
        E.Apellidos,
        E.Identificacion,
        E.Telefono,
        E.Direccion,
        E.Correo,
        E.Cargo,
        E.Estado AS EstadoEmpleado,
        U.Nombre_Usuario,
        U.Contraseña,
        U.Rol,
        U.Estado AS EstadoUsuario
    FROM Usuario U
    INNER JOIN Empleado E ON U.ID_Empleado = E.ID_Empleado
    WHERE E.ID_Empleado = @ID_Empleado;
END
GO
/****** Object:  StoredProcedure [dbo].[usp_ProductosPorReponer]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_ProductosPorReponer]
AS
BEGIN
    SELECT ID_Producto, Nombre, Stock, StockMinimo
    FROM Producto
    WHERE Stock <= StockMinimo;
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_RegistrarCategoria]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_RegistrarCategoria]
    @Nombre      VARCHAR(50),
    @Descripcion TEXT
AS
BEGIN
    INSERT INTO Categoria_Producto (Nombre, Descripcion)
    VALUES (@Nombre, @Descripcion);
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_RegistrarCliente]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE [dbo].[usp_RegistrarCliente]
    @Nombre     VARCHAR(100),
    @Apellidos  VARCHAR(100),
    @Telefono   VARCHAR(20),
    @Correo     VARCHAR(100),
    @Direccion  VARCHAR(MAX)
AS
BEGIN
    INSERT INTO Cliente (Nombre, Apellidos, Telefono, Correo, Direccion, Estado)
    VALUES (@Nombre, @Apellidos, @Telefono, @Correo, @Direccion, 1);
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_RegistrarDetalleVenta]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_RegistrarDetalleVenta]
    @ID_Venta        INT,
    @ID_Producto     INT,
    @Cantidad        INT,
    @Precio_Unitario DECIMAL(10,2),
    @Subtotal        DECIMAL(10,2)
AS
BEGIN
    INSERT INTO Detalle_Venta (ID_Venta, ID_Producto, Cantidad, Precio_Unitario, Subtotal)
    VALUES (@ID_Venta, @ID_Producto, @Cantidad, @Precio_Unitario, @Subtotal);
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_RegistrarEmpleado]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[usp_RegistrarEmpleado]
    @Nombre VARCHAR(100),
    @Apellidos VARCHAR(100),
    @Telefono VARCHAR(20),
    @Direccion TEXT,
    @Cargo VARCHAR(50),
    @Identificacion VARCHAR(20),
    @Correo VARCHAR(100)
AS
BEGIN
    -- Estado = 0 por defecto (inactivo hasta que admin active)
    INSERT INTO Empleado (Nombre, Apellidos, Telefono, Direccion, Cargo, Identificacion, Correo, Estado)
    VALUES (@Nombre, @Apellidos, @Telefono, @Direccion, @Cargo, @Identificacion, @Correo, 0);
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_RegistrarEmpleadoUsuario]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Crear el procedimiento correcto
CREATE PROCEDURE [dbo].[usp_RegistrarEmpleadoUsuario]
    @Nombre VARCHAR(100),
    @Apellidos VARCHAR(100),
    @Telefono VARCHAR(20),
    @Direccion TEXT,
    @Cargo VARCHAR(50),
    @Identificacion VARCHAR(20),
    @Correo VARCHAR(100),
    @Nombre_Usuario VARCHAR(50),
    @Contraseña VARCHAR(255),
    @Rol VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        BEGIN TRANSACTION
        
        -- Verificar duplicados
        IF EXISTS (SELECT 1 FROM Usuario WHERE Nombre_Usuario = @Nombre_Usuario)
        BEGIN
            RAISERROR('El nombre de usuario ya existe', 16, 1);
            RETURN;
        END
        
        IF EXISTS (SELECT 1 FROM Empleado WHERE Identificacion = @Identificacion)
        BEGIN
            RAISERROR('La identificación ya existe', 16, 1);
            RETURN;
        END
        
        -- 1. Insertar Empleado (Estado = 0, inactivo por defecto)
        DECLARE @ID_Empleado INT;
        
        INSERT INTO Empleado (Nombre, Apellidos, Telefono, Direccion, Cargo, Identificacion, Correo, Estado)
        VALUES (@Nombre, @Apellidos, @Telefono, @Direccion, @Cargo, @Identificacion, @Correo, 0);
        
        SET @ID_Empleado = SCOPE_IDENTITY();
        
        -- 2. Insertar Usuario (Estado = 0, inactivo por defecto)
        INSERT INTO Usuario (ID_Empleado, Nombre_Usuario, Contraseña, Rol, Estado)
        VALUES (@ID_Empleado, @Nombre_Usuario, @Contraseña, @Rol, 0);
        
        COMMIT TRANSACTION
        
        SELECT 1 AS Success, 'Usuario registrado exitosamente' AS Message;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION
        
        SELECT 0 AS Success, ERROR_MESSAGE() AS Message;
    END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[usp_RegistrarInventario]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[usp_RegistrarInventario]
    @ID_Producto     INT,
    @Cantidad        INT,
    @Fecha_Ingreso   DATE,
    @Fecha_Caducidad DATE
AS
BEGIN
    -- 1. Registrar la entrada de inventario (histórico)
    INSERT INTO Inventario (ID_Producto, Cantidad, Fecha_Ingreso, Fecha_Caducidad)
    VALUES (@ID_Producto, @Cantidad, @Fecha_Ingreso, @Fecha_Caducidad);

    -- 2. Sumar al stock del producto
    UPDATE Producto
    SET Stock = Stock + @Cantidad
    WHERE ID_Producto = @ID_Producto;
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_RegistrarMetodoPago]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE [dbo].[usp_RegistrarMetodoPago]
    @Codigo             VARCHAR(20),
    @Descripcion        VARCHAR(100),
    @Tipo               VARCHAR(20),
    @RequiereReferencia BIT = 0,
    @Estado             BIT = 1
AS
BEGIN
    INSERT INTO Metodo_Pago (Codigo, Descripcion, Tipo, Estado, RequiereReferencia)
    VALUES (@Codigo, @Descripcion, @Tipo, @Estado, @RequiereReferencia);
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_RegistrarProducto]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


 CREATE PROCEDURE [dbo].[usp_RegistrarProducto]
    @Nombre       VARCHAR(100),
    @Descripcion  TEXT,
    @Precio       DECIMAL(10,2),
    @Stock        INT,
    @ID_Categoria INT,
    @ID_Proveedor INT
AS
BEGIN
    INSERT INTO Producto (Nombre, Descripcion, Precio, Stock, ID_Categoria, ID_Proveedor)
    VALUES (@Nombre, @Descripcion, @Precio, @Stock, @ID_Categoria, @ID_Proveedor);
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_RegistrarProveedor]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_RegistrarProveedor]
    @Nombre    VARCHAR(100),
    @Telefono  VARCHAR(20),
    @Correo    VARCHAR(100),
    @Direccion TEXT
AS
BEGIN
    INSERT INTO Proveedor (Nombre, Telefono, Correo, Direccion)
    VALUES (@Nombre, @Telefono, @Correo, @Direccion);
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_RegistrarUsuario]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_RegistrarUsuario]
    @ID_Empleado     INT,
    @Nombre_Usuario  VARCHAR(50),
    @Contraseña      VARCHAR(100),
    @Rol             VARCHAR(30),
    @Estado          BIT
AS
BEGIN
    INSERT INTO Usuario (ID_Empleado, Nombre_Usuario, Contraseña, Rol, Estado)
    VALUES (@ID_Empleado, @Nombre_Usuario, @Contraseña, @Rol, @Estado);
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_RegistrarVenta]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_RegistrarVenta]
    @ID_Cliente INT,
    @ID_Empleado INT,
    @ID_Metodo INT,
    @Fecha DATETIME,  
    @Total DECIMAL(10,2)
AS
BEGIN
    INSERT INTO Venta (ID_Cliente, ID_Empleado, ID_Metodo, Fecha, Total)
    VALUES (@ID_Cliente, @ID_Empleado, @ID_Metodo, @Fecha, @Total);
    
    SELECT SCOPE_IDENTITY(); -- Retorna el ID de la venta creada
END
GO
/****** Object:  StoredProcedure [dbo].[usp_ResetearContraseña]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[usp_ResetearContraseña]
    @ID_Empleado INT,
    @ContraseñaHash NVARCHAR(200)
AS
BEGIN
    UPDATE Usuario
    SET Contraseña      = @ContraseñaHash,
        DebeCambiarClave = 1
    WHERE ID_Empleado = @ID_Empleado;
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_ValidarLogin]    Script Date: 09/12/2025 05:08:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

		CREATE PROCEDURE [dbo].[usp_ValidarLogin]
    @Nombre_Usuario VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        U.ID_Empleado,
        U.Nombre_Usuario,
        U.Contraseña,        -- hash guardado
        U.Rol,
        U.Estado,
        U.DebeCambiarClave,  -- si lo tienes
        E.Nombre,
        E.Apellidos,
        E.Identificacion,
        E.Correo
    FROM Usuario U
    INNER JOIN Empleado E ON U.ID_Empleado = E.ID_Empleado
    WHERE U.Nombre_Usuario = @Nombre_Usuario;
END
GO
USE [master]
GO
ALTER DATABASE [SoluSoftDB] SET  READ_WRITE 
GO
