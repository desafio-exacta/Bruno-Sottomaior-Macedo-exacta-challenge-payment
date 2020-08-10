DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS payment;

CREATE TABLE payment (
    id INT AUTO_INCREMENT  PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(500) NOT NULL,
    value NUMERIC(18, 2) NOT NULL,
    date_time DATE NOT NULL,
    tags VARCHAR(500) NULL
);

insert into payment(name, description, value, date_time, tags)values('Bruno', 'Despesa Agua', 200.00, Date(), '#despesas');

CREATE TABLE user (
  id INT AUTO_INCREMENT  PRIMARY KEY,
  first_name VARCHAR(250) NOT NULL,
  last_name VARCHAR(250) NOT NULL,
  phone_number VARCHAR(250) DEFAULT NULL,
  version int default 0,
  createdDate timestamp default null,
  createdBy varchar(250) default null,
  updatedDate timestamp default null,
  updatedBy timestamp default null,
  isDeleted int default 0,
  username varchar(250) default null
);

INSERT INTO user (first_name, last_name, phone_number) VALUES
  ('Bruno', 'Macedo', '+997560426');