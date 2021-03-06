USE [master]
GO
/****** Object:  Database [project_hcdh]    Script Date: 06/01/2018 12:29:17 PM ******/
CREATE DATABASE [project_hcdh]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'project_hcdh', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL11.SQLEXPRESS\MSSQL\DATA\project_hcdh.mdf' , SIZE = 3072KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'project_hcdh_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL11.SQLEXPRESS\MSSQL\DATA\project_hcdh_log.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [project_hcdh] SET COMPATIBILITY_LEVEL = 110
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [project_hcdh].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [project_hcdh] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [project_hcdh] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [project_hcdh] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [project_hcdh] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [project_hcdh] SET ARITHABORT OFF 
GO
ALTER DATABASE [project_hcdh] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [project_hcdh] SET AUTO_CREATE_STATISTICS ON 
GO
ALTER DATABASE [project_hcdh] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [project_hcdh] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [project_hcdh] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [project_hcdh] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [project_hcdh] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [project_hcdh] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [project_hcdh] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [project_hcdh] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [project_hcdh] SET  DISABLE_BROKER 
GO
ALTER DATABASE [project_hcdh] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [project_hcdh] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [project_hcdh] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [project_hcdh] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [project_hcdh] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [project_hcdh] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [project_hcdh] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [project_hcdh] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [project_hcdh] SET  MULTI_USER 
GO
ALTER DATABASE [project_hcdh] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [project_hcdh] SET DB_CHAINING OFF 
GO
ALTER DATABASE [project_hcdh] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [project_hcdh] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
USE [project_hcdh]
GO
/****** Object:  StoredProcedure [dbo].[pro_datxe]    Script Date: 06/01/2018 12:29:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[pro_datxe]
@sdt nchar(11),
@ten nvarchar(50),
@xuatphat nvarchar(100),
@diemden nvarchar(100),
@loaixe nvarchar(50)
AS
BEGIN
	insert into DatXe values (@sdt,@ten,@xuatphat,@diemden,@loaixe)
END

GO
/****** Object:  StoredProcedure [dbo].[pro_login]    Script Date: 06/01/2018 12:29:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[pro_login]
@user nchar(20),@pass nchar(20)


AS

BEGIN
select *
from DangNhap
where username = @user AND password = @pass
	if (@@ROWCOUNT > 0)
	BEGIN
		select 1 KQ		
	END
	ELSE
	BEGIN
		SELECT 0 KQ
	END
END

GO
/****** Object:  StoredProcedure [dbo].[pro_timsdt]    Script Date: 06/01/2018 12:29:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[pro_timsdt]
@sdt nchar(11)
AS
BEGIN
	select * from DatXe where Sdt=@sdt
END

GO
/****** Object:  Table [dbo].[DangNhap]    Script Date: 06/01/2018 12:29:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DangNhap](
	[username] [nchar](20) NOT NULL,
	[password] [nchar](20) NULL,
 CONSTRAINT [PK_DangNhap] PRIMARY KEY CLUSTERED 
(
	[username] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[DatXe]    Script Date: 06/01/2018 12:29:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DatXe](
	[Sdt] [nchar](11) NOT NULL,
	[Ten] [nvarchar](50) NULL,
	[Xuatphat] [nvarchar](100) NULL,
	[Diemden] [nvarchar](100) NULL,
	[Loaixe] [nvarchar](50) NULL,
 CONSTRAINT [PK_DatXe_1] PRIMARY KEY CLUSTERED 
(
	[Sdt] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
USE [master]
GO
ALTER DATABASE [project_hcdh] SET  READ_WRITE 
GO
