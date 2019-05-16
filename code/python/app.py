# Our main app that defines the routes, connects to postgres, and does queries
# This layout is a bit naive as all logic is controlled here
# Even though the MVC model wasn't required in the spec, we'd like to follow it in the next project

import logging
import psycopg2
import psycopg2.extras

# Python makes it super easy to respond to http requests through Flask
from flask import Flask, jsonify, request
app = Flask(__name__)

# Connect to postgres and open a cursor to execute commands
# Ideally, we would use an ORM such as SQLAlchemy to run commands but this does the job
conn_string = "host='postgres' dbname='postgres' user='postgres'"
conn = psycopg2.connect(conn_string)
cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)


@app.route('/')
@app.route('/<path:path>')
def index(path='index.html'):
    """
    This is the main page-loading route. It handles loading everything under the ./static dir
    """
    return app.send_static_file('{}'.format(path))


# -----------------------------------------------------------------
# Customer routes
# -----------------------------------------------------------------

@app.route('/customers', methods=['GET'])
def get_customers():
    """
    Retrieves a list of all customers from the db.
    """
    cur.execute("SELECT * FROM Customer")
    results = cur.fetchall()

    return jsonify(results)


@app.route('/customers', methods=['PUT'])
def create_customer():
    """
    Inserts a new customer into the db based on provided PUT data.
    """
    cur.execute("INSERT INTO Customer (name, address) VALUES (%(name)s, %(address)s) RETURNING *", request.get_json())
    result = cur.fetchone()

    return jsonify(result)


@app.route('/customers', methods=['POST'])
def update_customer():
    """
    Updates a customer record in the db based on provided POST data.
    """
    cur.execute("UPDATE Customer SET name = %(name)s, address = %(address)s WHERE Id = %(id)s ", request.get_json())

    return jsonify(result="OK")


@app.route('/customers', methods=['DELETE'])
def delete_customer():
    """
    Deletes a customer record from the db.
    """
    cur.execute("DELETE FROM Customer WHERE Id = %(id)s ", request.get_json())

    return jsonify(result="OK")


# -----------------------------------------------------------------
# Phone number routes
# -----------------------------------------------------------------

@app.route('/<int:user_id>/phones', methods=['GET'])
def get_phones(user_id):
    """
    Retrieves all stored phone numbers for the provided customer.
    """
    cur.execute("SELECT * FROM Customer_phone WHERE Customer_id = %s", (user_id,))
    results = cur.fetchall()

    return jsonify(results)


@app.route('/<int:user_id>/phones', methods=['PUT'])
def add_phone(user_id):
    """
    Inserts a new phone number into the db for the provided customer.
    """
    json_data = request.get_json()
    json_data['customer_id'] = user_id
    cur.execute("INSERT INTO Customer_phone (phone, Customer_Id) VALUES (%(phone)s, %(customer_id)s) RETURNING *", json_data)
    results = cur.fetchone()

    return jsonify(results)


@app.route('/phones', methods=['POST'])
def update_phone():
    """
    Updates a phone record in the db based on provided POST data.
    """
    cur.execute("UPDATE Customer_phone SET phone = %(phone)s WHERE Id = %(id)s", request.get_json())

    return jsonify(result="OK")


@app.route('/phones', methods=['DELETE'])
def delete_phone():
    """
    Deletes a phone number from the db.
    """
    cur.execute("DELETE FROM Customer_phone WHERE Id = %(id)s ", request.get_json())

    return jsonify(result="OK")


# -----------------------------------------------------------------
# Car routes
# -----------------------------------------------------------------

@app.route('/cars/all', methods=['GET'])
def get_allcars():
    """
    Retrieves all cars for the given customer.
    """
    cur.execute("SELECT * FROM Cars")
    results = cur.fetchall()

    return jsonify(results)

@app.route('/<int:user_id>/cars', methods=['GET'])
def get_cars(user_id):
    """
    Retrieves all cars for the given customer.
    """
    cur.execute("SELECT * FROM Cars WHERE customer_id = %s", (user_id,))
    results = cur.fetchall()

    return jsonify(results)


@app.route('/<int:user_id>/cars', methods=['PUT'])
def add_car(user_id):
    """
    Adds a car belonging to the given customer
    """
    json_data = request.get_json()
    json_data['customer_id'] = user_id
    cur.execute("INSERT INTO Cars (Year, Make, Model, Customer_Id) VALUES (%(year)s, %(make)s, %(model)s, %(customer_id)s) RETURNING *", json_data)
    result = cur.fetchone()

    return jsonify(result)


@app.route('/cars', methods=['POST'])
def update_car():
    """
    Updates car information
    """
    app.logger.info(request.get_json())
    cur.execute("UPDATE Cars SET Year = %(year)s, Make = %(make)s, Model = %(model)s WHERE id = %(id)s", request.get_json())

    return jsonify(result="OK")


@app.route('/cars', methods=['DELETE'])
def delete_car():
    """
    Deletes a car from the db
    """
    cur.execute("DELETE FROM Cars WHERE Id = %(id)s ", request.get_json())

    return jsonify(result="OK")

# -----------------------------------------------------------------
# Mechanic routes
# -----------------------------------------------------------------

@app.route('/mechanics', methods=['GET'])
def get_mechanics():
    """
    Retrieves a list of all mechanics from the db.
    """
    cur.execute("SELECT * FROM Mechanics")
    results = cur.fetchall()

    return jsonify(results)


@app.route('/mechanics', methods=['PUT'])
def create_mechanic():
    """
    Inserts a new mechanic into the db based on provided PUT data.
    """
    cur.execute("INSERT INTO Mechanics (name, expYears) VALUES (%(name)s, %(expYears)s) RETURNING *", request.get_json())
    result = cur.fetchone()

    return jsonify(result)


@app.route('/mechanics', methods=['POST'])
def update_mechanic():
    """
    Updates a mechanic record in the db based on provided POST data.
    """
    cur.execute("UPDATE Mechanics SET name = %(name)s, expYears = %(expYears)s WHERE Id = %(id)s ", request.get_json())

    return jsonify(result="OK")


@app.route('/mechanics', methods=['DELETE'])
def delete_mechanic():
    """
    Deletes a mechanic record from the db.
    """
    cur.execute("DELETE FROM Mechanics WHERE Id = %(id)s ", request.get_json())

    return jsonify(result="OK")


# -----------------------------------------------------------------
# Certificate routes
# -----------------------------------------------------------------

@app.route('/<int:user_id>/certificates', methods=['GET'])
def get_certificates(user_id):
    """
    Retrieves all stored certificate for the provided mechanic.
    """
    cur.execute("SELECT * FROM Certificates WHERE Mechanic_Id = %s" , (user_id,))
    results = cur.fetchall()

    return jsonify(results)


@app.route('/<int:user_id>/certificates', methods=['PUT'])
def add_certificate(user_id):
    """
    Inserts a new certificate  into the db for the provided customer.
    """
    json_data = request.get_json()
    json_data['mechanic_id'] = user_id
    cur.execute("INSERT INTO Certificates (name, Mechanic_Id, Repair_Id) VALUES (%(name)s, %(mechanic_id)s, %(repair_id)s) RETURNING *", json_data)
    results = cur.fetchone()

    return jsonify(results)


# @app.route('/certificates', methods=['POST'])
# def update_certificate():
#     """
#     Updates a certificate record in the db based on provided POST data.
#     """
#     cur.execute("UPDATE Certificates SET certificate = %(certificate)s WHERE Id = %(id)s", request.get_json())
#
#     return jsonify(result="OK")
#

@app.route('/certificates', methods=['DELETE'])
def delete_certificate():
    """
    Deletes a certificate from the db.
    """
    cur.execute("DELETE FROM Certificates WHERE Id = %(id)s ", request.get_json())

    return jsonify(result="OK")


@app.route('/certificate/options', methods=['GET'])
def get_certificate_options(user_id):
    """
    Retrieves all stored certificate
    """
    cur.execute("SELECT name FROM Certificates GROUP BY name")
    results = cur.fetchall()

    return jsonify(results)


# -----------------------------------------------------------------
# Estimate routes
# -----------------------------------------------------------------

@app.route('/estimate', methods=['GET'])
def get_estimate():
    """
    Gets an estimate on selected repairs.
    """
    cur.execute("SELECT r.*, m.id AS mechanic_id, m.name, m.expYears, (SELECT COUNT(*) FROM Certificates C2 WHERE m.id =  c2.mechanic_id) AS certnum FROM PossibleRepairs r, Mechanics m, Certificates c WHERE c.repair_id = r.id AND m.id = c.mechanic_id ORDER BY r.description ASC ")
    results = cur.fetchall()

    return jsonify(results)


@app.route('/mechanics/<int:repair_id>', methods=['GET'])
def get_mechanics_for_repair(repair_id):
    """
    Gets an estimate on selected repairs.
    """
    cur.execute("Select m.* from Mechanics m, Certificates c Where c.repair_id = %s AND m.id = c.mechanic_id", (repair_id,))
    results = cur.fetchall()

    return jsonify(results)

# -----------------------------------------------------------------
# Repairs routes
# -----------------------------------------------------------------
# , ((((((SELECT COUNT(*) FROM Certificates c WHERE m.id =  c.mechanic_id) + m.expyears) * 0.5) + 10) * r.hours) * 1.5) AS costlabor
@app.route('/repairs', methods=['GET'])
def get_repairs():
    """
    Gets an list of actual repairs
    """
    cur.execute("SELECT a.*, c.year, c.make, c.model, r.description, r.costparts, m.name FROM ActualRepairs a, Cars c, Mechanics m, PossibleRepairs r WHERE a.car_id = c.id AND a.mechanic_id = m.id AND a.repair_id = r.id")
    results = cur.fetchall()

    return jsonify(results)

# @app.route('/repairs', methods=['POST'])
# def add_repairs():
#     """
#     Gets an list of actual repairs
#     """
#     cur.execute("SELECT a.*, c.year, c.make, c.model, r.description, m.name FROM ActualRepairs a, Cars c, Mechanics m, PossibleRepairs r WHERE a.car_id = c.id AND a.mechanic_id = m.id AND a.repair_id = r.id GROUP BY a.DOM, a.car_id")
#     results = cur.fetchall()
#
#     return jsonify(results)
