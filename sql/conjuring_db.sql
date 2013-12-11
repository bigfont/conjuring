use [conjuring_db]
GO

DROP TABLE [dbo].[Books]
DROP TABLE [dbo].[Authors]
DROP TABLE [dbo].[Publishers]
DROP FUNCTION [dbo].[udf_TitleCase]
DROP PROC spInsertBook
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

CREATE TABLE [dbo].[Publishers]
(
	[ID] [int] IDENTITY(0,1) NOT NULL,
	[Name] [varchar](100) NULL,
	[City] [varchar](100) NULL
)

ALTER TABLE [dbo].[Publishers] ADD CONSTRAINT pk_PublisherID PRIMARY KEY (ID)

CREATE TABLE [dbo].[Authors]
(
	[ID] [int] IDENTITY(0,1) NOT NULL,
	[FirstName] [varchar](100) NULL,
	[LastName] [varchar](100) NULL	
)

ALTER TABLE [dbo].[Authors] ADD CONSTRAINT pk_AuthorID PRIMARY KEY (ID)

CREATE TABLE [dbo].[Books](
	[ID] [int] IDENTITY(0,1) NOT NULL,
	[PublishYear] int NULL,
	[Title] [varchar](200) NULL,
	[AuthorID] [int] NULL,
	[PublisherID] [int] NULL
	)

ALTER TABLE [dbo].[Books] ADD CONSTRAINT pk_BookID PRIMARY KEY (ID)
ALTER TABLE [dbo].[Books] ADD CONSTRAINT fk_AuthorBook FOREIGN KEY (AuthorID) REFERENCES Authors(ID)
ALTER TABLE [dbo].[Books] ADD CONSTRAINT fk_PublisherBook FOREIGN KEY (PublisherID) REFERENCES Publishers(ID)

GO

CREATE PROC spInsertBook 
	@PublishYear int
	,@Title [varchar](200)
	,@AuthorFirst [varchar](100)
	,@AuthorLast [varchar](100)
	,@PublisherName [varchar](100)
	,@PublisherCity [varchar](100)
	,@PublisherState [varchar](100)
	 AS
BEGIN

	DECLARE @AuthorID INT, @PublisherID INT

	IF 
		NOT EXISTS(SELECT * FROM Authors WHERE FirstName = @AuthorFirst AND LastName = @AuthorLast) AND
		LEN(@AuthorFirst + @AuthorLast) > 0
	BEGIN
		INSERT INTO Authors (FirstName, LastName) VALUES (@AuthorFirst, @AuthorLast);
	END

	IF 
		NOT EXISTS(SELECT * FROM Publishers WHERE Name = @PublisherName AND City = @PublisherCity) AND
		LEN(@PublisherName) > 0
	BEGIN
		INSERT INTO Publishers (Name, City) VALUES (@PublisherName, @PublisherCity);
	END

	SELECT @AuthorID = ID FROM Authors WHERE FirstName = @AuthorFirst AND LastName = @AuthorLast;
	SELECT @PublisherID = ID FROM Publishers WHERE Name = @PublisherName AND City = @PublisherCity;

	INSERT INTO [dbo].[Books] ([PublishYear], [Title], [AuthorID], [PublisherID]) 
	VALUES (@PublishYear, @Title, @AuthorID, @PublisherID)

END

GO

--NOT FROM EXCEL
EXEC spInsertBook 1965, 'Magic of the World', 'John', 'Mulholland', 'Charles Scribner''s Sons', 'New York', null;
EXEC spInsertBook null, 'Houdini', 'The Amazing Randi', null, null, null, null;
EXEC spInsertBook null, 'Houdini', 'Milbourne', 'Christopher', null, null, null;
EXEC spInsertBook null, 'Fun with Magic', 'Joseph', 'Leeming', null, null, null;
EXEC spInsertBook null, 'The Encyclopedia of Magic and Magicians', 'T. A.', 'Waters', null, null, null;

--FROM EXCEL
EXEC spInsertBook 1991, 'The Magic of Micheal Ammar', 'Michael', 'Ammar', 'L&L Publishing ', 'Tahoma', 'CA'
EXEC spInsertBook 1990, 'Impossibilia', 'John', 'Bannon', 'L&L Publishing ', 'Tahoma', 'CA'
EXEC spInsertBook 1985, 'The Blackstone Book of Magic and Illusion', 'Harry', 'Blackstone', 'New Market Press', 'New York', 'NY'
EXEC spInsertBook 1988, 'Modern Coin Magic', 'J. B. ', 'Bobo', 'Magic Inc', 'Chicago', 'IL'
EXEC spInsertBook 1982, 'Modern Coin Magic', 'J. B. ', 'Bobo', 'Dover Publications', 'New York', 'NY'
EXEC spInsertBook 1975, 'The Royal Road to Card Magic', 'Frederick', 'Braue', 'Faber & Faber', 'London', 'England'
EXEC spInsertBook 1974, 'Expert Card Technique', 'Frederick', 'Braue', 'Dover Publications', 'New York', 'NY'
EXEC spInsertBook 1978, 'Encyclopedia of Cigarette Tricks', 'Keith', 'Clark', 'Tannen Magic', 'Broadway', 'NY'
EXEC spInsertBook 1978, 'Introduction to Coin Magic', 'Shigeo', 'Futagawa', 'Borden Publishing Company', 'Alhambra', 'CA'
EXEC spInsertBook 1978, 'The Real Secrets of the Three-Ball Routines', 'Frank', 'Garcia', '', '', ''
EXEC spInsertBook 1975, 'Magic with Cards', 'Frank', 'Garcia', 'Reiss Games', 'New York', 'NY'
EXEC spInsertBook 1981, 'The Complete Illustrated Book of Close-Up Magic', 'Walter', 'Gibson', 'Robert Hale', 'London', 'England'
EXEC spInsertBook 1985, 'Magic by Gosh', 'Albert', 'Goshman', '', '', ''
EXEC spInsertBook 1991, 'A Close-Up Kinda Guy', 'Paul', 'Harris', 'Tannen Magic', 'Brooklyn', 'NY'
EXEC spInsertBook 1903, 'Hermann''s Book of Magic: Black Art Exposed', '', 'Hermann', 'Frederick J. Drake and Company', 'Chicago', 'IL'
EXEC spInsertBook 1974, 'More Card Manipulations', 'Jean', 'Hugard', 'Dover Publications', 'New York', 'NY'
EXEC spInsertBook 1997, 'The Six-Hour Memorized Deck', 'Martin', 'Joyal', 'Hermetic Press', 'Seattle', 'WA'
EXEC spInsertBook 1987, 'David Roth''s Expert Coin Magic', 'Richard', 'Kaufman', 'D. Robbins & Co', 'Brooklyn', 'NY'
EXEC spInsertBook 1985, 'Coin Magic', 'Richard', 'Kaufman', 'Kaufman & Greenberg', '', ''
EXEC spInsertBook 1989, 'Williamson''s Wonders', 'Richard', 'Kaufman', 'Kaufman & Greenberg', '', ''
EXEC spInsertBook 1989, 'The Secrets of Brother John Hamman', 'Richard', 'Kaufman', 'Kaufman & Greenberg', '', ''
EXEC spInsertBook 1977, 'The Magic Book', 'Harry', 'Lorayne', 'G. P. Putnam''s Sons', 'New York', 'NY'
EXEC spInsertBook 1976, 'Close Up Card Magic', 'Harry', 'Lorayne', 'D. Robbins & Co', 'Brooklyn', 'NY'
EXEC spInsertBook 1979, 'Quantum Leap', 'Harry', 'Lorayne', 'Harry Lorayne', 'New York', 'NY'
EXEC spInsertBook 1987, 'Star Quality: The Magic of David Regal', 'Harry', 'Lorayne', 'Harry Lorayne', 'New York', 'NY'
EXEC spInsertBook 1988, 'The Vernon Chronicles: More Lost Inner Secrets', 'Stephen', 'Minch', 'L&L Publishing ', 'Tahoma', 'CA'
EXEC spInsertBook 1987, 'The Vernon Chronicles: The Lost Inner Secrets', 'Stephen', 'Minch', 'L&L Publishing ', 'Tahoma', 'CA'
EXEC spInsertBook 1987, 'Daryl''s Ambitious Card Omnibus (Signed)', 'Stephen', 'Minch', '', '', ''
EXEC spInsertBook 1966, 'Slydini Encores', 'Leon', 'Nathanson', 'Slydini Studio of Magic', 'New York', 'NY'
EXEC spInsertBook 1956, 'The Great Magic Library Volume 2', 'John', 'Northern Hilliard', 'A. S. Barnes and Company', 'New York', 'NY'
EXEC spInsertBook 1991, 'The Annotated Erdnase', 'Darwin', 'Ortiz', 'Magical Publications', 'Pasedana', 'CA'
EXEC spInsertBook 1990, 'Close  Up Illusions', 'Gary', 'Ouellet', 'The Camirand Academy of Magic', 'Sillery', 'QC'
EXEC spInsertBook 1991, 'Roger Klause in Concert', 'Lance', 'Pierce', 'L&L Publishing ', 'Tahoma', 'CA'
EXEC spInsertBook 1990, 'Top Secret Stuff', 'Michael', 'Powers', '', '', ''
EXEC spInsertBook 1979, 'Bill Severn''s Guide to Magic as a Hobby', 'Bill', 'Severn', 'David McKay Company', 'New York', 'NY'
EXEC spInsertBook 1978, 'The Second Now You See It, Now You Don''t', 'Bill', 'Tarr', 'Vintage Books', 'New York', 'NY'
EXEC spInsertBook 1984, 'Revelations', 'Dai', 'Vernon', 'Magical Publications', 'Pasedana', 'CA'
EXEC spInsertBook 2003, 'Aunt Mary''s Terrible Secret', 'David', 'Williamson', 'The Conjuring Arts Research Center', 'New York', 'NY'
EXEC spInsertBook 1988, 'Mark Wilson''s Complete Course in Magic', 'Mark', 'Wilson', 'Courage Books', 'Philidelphia', 'PA'
EXEC spInsertBook 1975, 'Stars of Magic', '', '', 'D. Robbins & Co', 'Brooklyn', 'NY'
EXEC spInsertBook 2006, 'The Royal Road to Card Magic', 'Paul', 'Wilson', 'L&L Publishing ', 'Tahoma', 'CA'
EXEC spInsertBook 1980, '202 Methods of Forcing', 'Theo', 'Annemann', '', '', ''
EXEC spInsertBook 0, 'The Paul Belanger Cigarette Thru Quarter', 'Gary', 'Ouellet', 'Camirand Academy of Magic', 'Sillery', 'QC'
EXEC spInsertBook 1950, 'The Magic Wand and Magical Review', '', '', 'The Magic Wand Publishing Co', 'Enfield', 'UK'
EXEC spInsertBook 0, 'Tricks of the Television Stars', 'Harry', 'Stanley', 'H. Clarke & Co', 'London', 'England'
EXEC spInsertBook 0, 'At Home with McComb', 'Billy', 'McComb', '', '', ''
EXEC spInsertBook 1985, 'For Close-Up Magicians'' Eyes Only', 'Ben', 'Harris', 'Micky Hades International', '', ''






UPDATE [dbo].[Books] SET 
	[Title] = [dbo].[udf_TitleCase]([Title])

UPDATE [dbo].[Authors] SET 
	[FirstName] = [dbo].[udf_TitleCase]([FirstName]),
	[LastName] = [dbo].[udf_TitleCase]([LastName])

GO

--SELECT * FROM [dbo].[Books]
SELECT * FROM [dbo].[Authors] ORDER BY LastName
SELECT * FROM [dbo].[Publishers] ORDER BY Name

