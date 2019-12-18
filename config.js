let mysql = {
    'development': {
        'host': '172.27.40.196',
        'database': 'xoso_admin',
        'user': 'root',
        'password': 'iMonitor-ast',
        'port': 3306
    },
    'development2': {
        'host': 'localhost',
        'database': 'xoso_admin',
        'user': 'root',
        'password': 'ftel@123',
        'port': 3306
    },
    'development3': {
        'host': '172.27.229.69',
        'database': 'xoso_admin',
        'user': 'root',
        'password': 'ftel@123',
        'port': 3306
    },
    'production': {
        'host': 'localhost',
        'database': 'xoso_admin',
        'user': 'root',
        'password': 'iMonitor-ast',
        'port': 3306
    },
    'default': {
        'host': '172.27.40.196',
        'database': 'xoso_admin',
        'user': 'root',
        'password': 'iMonitor-ast',
        'port': 3306
    }
};

let jwt = {
    "secretOrKey": "6vfnT_6%r&SQtH)r"
};

module.exports = {mysql, jwt};