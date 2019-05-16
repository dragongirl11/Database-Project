drop table if exists cars cascade;
drop table if exists customer_phone cascade;
drop table if exists customer cascade;
drop table if exists mechanics cascade;
drop table if exists possiblerepairs cascade;
drop table if exists certificates cascade;
drop table if exists actualrepairs cascade;


CREATE TABLE Customer
(
  Id SERIAL PRIMARY KEY,
  name VARCHAR(60) NOT NULL,
  address VARCHAR(256) NOT NULL
);

CREATE TABLE Customer_phone
(
  Id SERIAL PRIMARY KEY,
  phone VARCHAR(20) NOT NULL,
  Customer_Id INT NOT NULL,
  FOREIGN KEY (Customer_Id) REFERENCES Customer(Id) ON DELETE CASCADE
);

CREATE TABLE Cars
(
  Id SERIAL PRIMARY KEY,
  Year INT NOT NULL,
  Make VARCHAR(60) NOT NULL,
  Model VARCHAR(60) NOT NULL,
  Customer_Id INT NOT NULL,
  FOREIGN KEY (Customer_Id) REFERENCES Customer(Id) ON DELETE CASCADE
);

CREATE TABLE Mechanics
(
  Id SERIAL PRIMARY KEY,
  name VARCHAR(60) NOT NULL,
  expYears INT NOT NULL
);

CREATE TABLE PossibleRepairs
(
  Id SERIAL PRIMARY KEY,
  description VARCHAR(100) NOT NULL,
  costParts INT NOT NULL,
  hours INT NOT NULL
);

CREATE TABLE Certificates
(
  Id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  Mechanic_Id INT NOT NULL,
  Repair_Id INT NOT NULL,
  FOREIGN KEY (Mechanic_Id) REFERENCES Mechanics(Id) ON DELETE CASCADE,
  FOREIGN KEY (Repair_Id) REFERENCES PossibleRepairs(Id) ON DELETE CASCADE
);

CREATE TABLE ActualRepairs
(
  Id SERIAL PRIMARY KEY,
  DOM DATE NOT NULL,
  Car_Id INT NOT NULL,
  Repair_Id INT NOT NULL,
  Mechanic_Id INT NOT NULL,
  FOREIGN KEY (Car_Id) REFERENCES Cars(Id) ON DELETE CASCADE,
  FOREIGN KEY (Repair_Id) REFERENCES PossibleRepairs(Id) ON DELETE CASCADE,
  FOREIGN KEY (Mechanic_Id) REFERENCES Mechanics(Id) ON DELETE CASCADE
);
