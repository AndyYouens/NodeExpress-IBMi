-- Create employee table & insert a couple of records
-- specify the schema you will use for this example
-- © FormaServe Systems Ltd
--

Create schema hrdata ;

CREATE TABLE HRDATA.EMPLOYEE (
	EMID INTEGER GENERATED ALWAYS AS IDENTITY (
	START WITH 1 INCREMENT BY 1
	NO MINVALUE NO MAXVALUE
	CYCLE NO ORDER
	CACHE 20 )
	,
	EMSUR CHAR(20) CCSID 285 NOT NULL DEFAULT '' ,
	EMFIR CHAR(15) CCSID 285 NOT NULL DEFAULT '' ,
	EMAD1 CHAR(30) CCSID 285 NOT NULL DEFAULT '' ,
	EMAD2 CHAR(20) CCSID 285 NOT NULL DEFAULT '' ,
	EMAD3 CHAR(20) CCSID 285 NOT NULL DEFAULT '' ,
	EMAD4 CHAR(20) CCSID 285 NOT NULL DEFAULT '' ,
	EMTEL CHAR(12) CCSID 285 NOT NULL DEFAULT '' ,
	EMSPC CHAR(1) CCSID 285 NOT NULL DEFAULT 'P' ,
	EMDOB DATE DEFAULT NULL ,
	EMSTR DATE DEFAULT NULL ,
	EMEND DATE DEFAULT NULL ,
	EMNAT CHAR(9) CCSID 285 NOT NULL DEFAULT '' ,
	EMGRD CHAR(8) CCSID 285 NOT NULL DEFAULT '' ,
	EMGCK CHAR(1) CCSID 285 NOT NULL DEFAULT '' ,
	EMSTA CHAR(1) CCSID 285 NOT NULL DEFAULT '' ,
	EMDEP CHAR(3) CCSID 285 NOT NULL DEFAULT '' ,
	EMSEX CHAR(1) CCSID 285 DEFAULT 'M' ,
	EMCTY CHAR(2) CCSID 285 DEFAULT 'UK' ,
	EMSAL DECIMAL(9, 2) NOT NULL DEFAULT 25000 IMPLICITLY HIDDEN ,
	EMBON INTEGER NOT NULL DEFAULT 500 )

	RCDFMT EMPLOYEE   ;

LABEL ON COLUMN HRDATA.EMPLOYEE
( EMID IS 'Employee            ID' ,
	EMSUR IS 'Surname              ' ,
	EMFIR IS 'First               Name' ,
	EMAD1 IS 'Address              ' ,
	EMAD2 IS 'Address              ' ,
	EMAD3 IS 'Address              ' ,
	EMAD4 IS 'Address              ' ,
	EMTEL IS 'Telephone           Number' ,
	EMSPC IS 'Status              P=Perm              S=SubCon' ,
	EMDOB IS 'Date                Of                  Birth' ,
	EMSTR IS 'Starting            Date' ,
	EMEND IS 'Leaving             Date' ,
	EMNAT IS 'National            Insurance           Number' ,
	EMGRD IS 'Grid                Reference' ,
	EMGCK IS 'Grid                Check' ,
	EMSTA IS 'Status               ' ,
	EMDEP IS 'Department           ' ,
	EMSEX IS 'Sex                  ' ,
	EMCTY IS 'Country             Code' ,
	EMSAL IS 'Salary               ' ,
	EMBON IS 'Employee            Bonus' ) ;

LABEL ON COLUMN HRDATA.EMPLOYEE
( EMID TEXT IS 'Employee ID' ,
	EMSUR TEXT IS 'Surname' ,
	EMFIR TEXT IS 'First Name' ,
	EMAD1 TEXT IS 'Address' ,
	EMAD2 TEXT IS 'Address' ,
	EMAD3 TEXT IS 'Address' ,
	EMAD4 TEXT IS 'Address' ,
	EMTEL TEXT IS 'Telephone Number' ,
	EMSPC TEXT IS 'Status P=Perm S=SubCon' ,
	EMDOB TEXT IS 'Date Of Birth' ,
	EMSTR TEXT IS 'Starting Date' ,
	EMEND TEXT IS 'Leaving Date' ,
	EMNAT TEXT IS 'National Insurance Number' ,
	EMGRD TEXT IS 'Grid Reference' ,
	EMGCK TEXT IS 'Grid Check' ,
	EMSTA TEXT IS 'Status' ,
	EMDEP TEXT IS 'Department' ,
	EMSEX TEXT IS 'Sex' ,
	EMCTY TEXT IS 'Country Code' ,
	EMSAL TEXT IS 'Salary' ,
	EMBON TEXT IS 'Employee Bonus' ) ;

GRANT ALTER , DELETE , INDEX , INSERT , REFERENCES , SELECT , UPDATE
ON HRDATA.EMPLOYEE TO PUBLIC WITH GRANT OPTION ;

-- Stuff some test data in
insert into hrdata.employee (emfir, emsur, emdep)
    values('Andy', 'Youens' ,'IT'),
          ('Jane', 'Youens', 'ACC'),
          ('Nick','Youens', 'IT'),
          ('Sue','Jackman','PHO');
