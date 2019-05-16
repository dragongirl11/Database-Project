/* Sample Data for the database
   Will be inserted at runtime
*/

insert into Customer (name, address) values ('Zac', 'Christiansburg');
insert into Customer (name, address) values ('Jay', 'Blacksburg');
insert into Customer (name, address) values ('Eric', 'Blacksburg');
insert into Customer (name, address) values ('John', 'New York');
insert into Customer (name, address) values ('Michael Scott', 'Scranton, PA');
insert into Customer (name, address) values ('Dwight Schrute', 'Schrute Farms');
insert into Customer (name, address) values ('Shawn Spencer', 'Santa Barbara');
insert into Customer (name, address) values ('Burton Guster', 'Santa Barbara');
insert into Customer (name, address) values ('Chuck Bartowski', 'Burbank, California');
insert into Customer (name, address) values ('Ron Swanson', 'Pawnee, Indiana');


insert into Customer_phone (phone, Customer_Id) values ('540-123-1234', 1);
insert into Customer_phone (phone, Customer_Id) values ('540-123-4321', 1);
insert into Customer_phone (phone, Customer_Id) values ('540-999-0999', 2);
insert into Customer_phone (phone, Customer_Id) values ('540-320-1123', 3);
insert into Customer_phone (phone, Customer_Id) values ('450-165-5473', 4);
insert into Customer_phone (phone, Customer_Id) values ('777-777-7777', 7);
insert into Customer_phone (phone, Customer_Id) values ('999-999-9999', 6);
insert into Customer_phone (phone, Customer_Id) values ('503-130-1412', 9);
insert into Customer_phone (phone, Customer_Id) values ('521-100-1200', 10);
insert into Customer_phone (phone, Customer_Id) values ('529-433-1333', 8);


insert into Cars (Year, Make, Model, Customer_Id) values (2019, 'Disney', 'Cruella De Vil', 1);
insert into Cars (Year, Make, Model, Customer_Id) values (2018, 'Universal', 'Grumobile', 2);
insert into Cars (Year, Make, Model, Customer_Id) values (2019, 'Universal', 'Grumobile', 2);
insert into Cars (Year, Make, Model, Customer_Id) values (2018, 'Dodge', 'Ice Charger', 3);
insert into Cars (Year, Make, Model, Customer_Id) values (2017, 'Warner Bros', 'Batmobile', 4);
insert into Cars (Year, Make, Model, Customer_Id) values (2017, 'GM', '81 Camaro', 5);
insert into Cars (Year, Make, Model, Customer_Id) values (2017, 'HW Original', 'Crescendo', 6);
insert into Cars (Year, Make, Model, Customer_Id) values (2017, 'Honda', '90 Acura NSX', 7);
insert into Cars (Year, Make, Model, Customer_Id) values (2016, 'HW Original', 'SpongeBob', 8);
insert into Cars (Year, Make, Model, Customer_Id) values (2016, 'HW Original', 'Muscle Tone', 8);
insert into Cars (Year, Make, Model, Customer_Id) values (2016, 'Caballero', 'Skate Brigade', 9);
insert into Cars (Year, Make, Model, Customer_Id) values (2016, 'Dodge', '`69 Dodge Charger', 10);


insert into Mechanics (name, expYears) values ('Andy Bernard', 4);
insert into Mechanics (name, expYears) values ('Dennis Reynolds', 1);
insert into Mechanics (name, expYears) values ('Charlie Kelley', 3);
insert into Mechanics (name, expYears) values ('Jack Griffin', 1);
insert into Mechanics (name, expYears) values ('Jake Peralta', 2);
insert into Mechanics (name, expYears) values ('Rosa Diaz', 5);
insert into Mechanics (name, expYears) values ('Terry Jeffords', 7);
insert into Mechanics (name, expYears) values ('Eren Yeager', 3);
insert into Mechanics (name, expYears) values ('Mikasa Ackerman', 4);
insert into Mechanics (name, expYears) values ('Saitama', 10);


insert into PossibleRepairs (description, costParts, hours) values ('Rebuilding a transmission', 1000, 5);
insert into PossibleRepairs (description, costParts, hours) values ('Serpentine belt replacement', 500, 4);
insert into PossibleRepairs (description, costParts, hours) values ('Tire replacement', 200, 2);
insert into PossibleRepairs (description, costParts, hours) values ('Brake Pad replacement', 100, 2);
insert into PossibleRepairs (description, costParts, hours) values ('Airbag replacement', 2000 , 6);
insert into PossibleRepairs (description, costParts, hours) values ('Suspension system replacement', 1500 , 4);
insert into PossibleRepairs (description, costParts, hours) values ('Spark plug replacement', 80 , 2);
insert into PossibleRepairs (description, costParts, hours) values ('Windsheild replacement', 200, 3);
insert into PossibleRepairs (description, costParts, hours) values ('Air Filter replacement', 100, 4);
insert into PossibleRepairs (description, costParts, hours) values ('Battery replacement', 250 , 2);


insert into Certificates (name, Mechanic_Id, Repair_Id) values ('Transmission Repair', 1, 1);
insert into Certificates (name, Mechanic_Id, Repair_Id) values ('Tire Repair', 1, 3);
insert into Certificates (name, Mechanic_Id, Repair_Id) values ('Suspension Repair', 1, 6);
insert into Certificates (name, Mechanic_Id, Repair_Id) values ('Battery Repair', 1, 10);
insert into Certificates (name, Mechanic_Id, Repair_Id) values ('Belt Repair', 2, 2);
insert into Certificates (name, Mechanic_Id, Repair_Id) values ('Brake Repair', 2, 4);
insert into Certificates (name, Mechanic_Id, Repair_Id) values ('Tire Repair', 3, 3);
insert into Certificates (name, Mechanic_Id, Repair_Id) values ('Airbag repair', 4, 5);
insert into Certificates (name, Mechanic_Id, Repair_Id) values ('Brake Repair', 5, 4);
insert into Certificates (name, Mechanic_Id, Repair_Id) values ('Suspension Repair', 6, 6);
insert into Certificates (name, Mechanic_Id, Repair_Id) values ('Air Filter repair', 6, 9);
insert into Certificates (name, Mechanic_Id, Repair_Id) values ('Brake Repair', 7, 4);
insert into Certificates (name, Mechanic_Id, Repair_Id) values ('Spark plug repair', 7, 7);
insert into Certificates (name, Mechanic_Id, Repair_Id) values ('Glass Repair', 8, 8);
insert into Certificates (name, Mechanic_Id, Repair_Id) values ('Suspension Repair', 9, 6);
insert into Certificates (name, Mechanic_Id, Repair_Id) values ('Air Filter repair', 9, 9);
insert into Certificates (name, Mechanic_Id, Repair_Id) values ('Battery Repair', 10, 10);


insert into ActualRepairs (DOM, Car_Id, Repair_Id, Mechanic_Id) values (current_date - interval '1 days', 1, 1, 1);
insert into ActualRepairs (DOM, Car_Id, Repair_Id, Mechanic_Id) values (current_date - interval '1 days', 1, 2, 2);
insert into ActualRepairs (DOM, Car_Id, Repair_Id, Mechanic_Id) values (current_date - interval '1 days', 1, 5, 4);
insert into ActualRepairs (DOM, Car_Id, Repair_Id, Mechanic_Id) values (current_date - interval '8 days', 2, 1, 1);
insert into ActualRepairs (DOM, Car_Id, Repair_Id, Mechanic_Id) values (current_date - interval '8 days', 3, 2, 2);
insert into ActualRepairs (DOM, Car_Id, Repair_Id, Mechanic_Id) values (current_date - interval '8 days', 3, 1, 1);
insert into ActualRepairs (DOM, Car_Id, Repair_Id, Mechanic_Id) values (current_date - interval '14 days', 4, 10, 10);
insert into ActualRepairs (DOM, Car_Id, Repair_Id, Mechanic_Id) values (current_date - interval '20 days', 5, 6, 6);
insert into ActualRepairs (DOM, Car_Id, Repair_Id, Mechanic_Id) values (current_date - interval '21 days', 7, 7, 7);
insert into ActualRepairs (DOM, Car_Id, Repair_Id, Mechanic_Id) values (current_date - interval '30 days', 6, 6, 9);
