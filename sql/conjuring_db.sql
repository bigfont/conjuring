USE [conjuring_db]
GO

DROP TABLE [dbo].[Books]
DROP TABLE [dbo].[Authors]
DROP FUNCTION [dbo].[udf_TitleCase]
GO

CREATE FUNCTION udf_TitleCase (@InputString VARCHAR(4000) )
	RETURNS VARCHAR(4000)
	
	--TODO Add a whitelist for characters to UPPERCASE	

	AS
	BEGIN
		DECLARE @Index INT
		DECLARE @Char CHAR(1)
		DECLARE @OutputString VARCHAR(255)
		SET @OutputString = LOWER(@InputString)
		SET @Index = 2
		SET @OutputString =
		STUFF(@OutputString, 1, 1,UPPER(SUBSTRING(@InputString,1,1)))

		WHILE @Index <= LEN(@InputString)
		BEGIN
			SET @Char = SUBSTRING(@InputString, @Index, 1)
			IF @Char IN (' ', ';', ':', '!', '?', ',', '.', '_', '-', '/', '&','''','(')

			IF @Index + 1 <= LEN(@InputString)
			BEGIN
				IF @Char != ''''
				OR
				UPPER(SUBSTRING(@InputString, @Index + 1, 1)) != 'S'
				SET @OutputString =
				STUFF(@OutputString, @Index + 1, 1,UPPER(SUBSTRING(@InputString, @Index + 1, 1)))
			END
			
			SET @Index = @Index + 1
		END

	RETURN ISNULL(@OutputString,'')
	END 

GO

CREATE TABLE [dbo].[Authors]
(
	[ID] [int] IDENTITY(0,1) NOT NULL,
	[FirstName] [varchar](100) NULL,
	[LastName] [varchar](100) NULL	
)

ALTER TABLE [dbo].[Authors] ADD CONSTRAINT pk_AuthorID PRIMARY KEY (ID)

CREATE TABLE [dbo].[Books](
	[ID] [int] IDENTITY(0,1) NOT NULL,
	[ISBN] [varchar](20) NULL,
	[Title] [varchar](200) NULL,
	[Subtitle] [varchar](200) NULL,
	[AuthorID] [int] NULL
	)

ALTER TABLE [dbo].[Books] ADD CONSTRAINT pk_BookID PRIMARY KEY (ID)
ALTER TABLE [dbo].[Books] ADD CONSTRAINT fk_AuthorBook FOREIGN KEY (AuthorID) REFERENCES Authors(ID)

GO

INSERT INTO [dbo].[Authors] (FirstName, LastName) VALUES ('Bill', 'Tarr')
INSERT INTO [dbo].[Authors] (FirstName, LastName) VALUES ('Harry', 'Lorayne')

GO

INSERT INTO [dbo].[Books] ([ISBN], [Title], [Subtitle], [AuthorID]) VALUES (null, 'The second now you see it, now you don''t!', 'more lessons in sleight of hand', 0)
INSERT INTO [dbo].[Books] ([ISBN], [Title], [Subtitle], [AuthorID]) VALUES (null, 'Stars of Magic', '', null)
INSERT INTO [dbo].[Books] ([ISBN], [Title], [Subtitle], [AuthorID]) VALUES (null, 'The magic book', 'The complete beginners guide to anytime, anywhere, sleight-of-hand magic', 1)
INSERT INTO [dbo].[Books] ([ISBN], [Title], [Subtitle], [AuthorID]) VALUES (null, 'Close-up card magic', '', 1)

GO 

UPDATE [dbo].[Books] SET 
	[Title] = [dbo].[udf_TitleCase]([Title]),
	[Subtitle] = [dbo].[udf_TitleCase]([Subtitle])

UPDATE [dbo].[Authors] SET 
	[FirstName] = [dbo].[udf_TitleCase]([FirstName]),
	[LastName] = [dbo].[udf_TitleCase]([LastName])


SELECT * FROM [dbo].[Books]
SELECT * FROM [dbo].[Authors]

GO